import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const archive = JSON.parse(await readFile(path.join(root, 'assets/cases/index.json'), 'utf8'));
assert.equal(archive.projects.length, 52);
assert.equal(archive.projects.reduce((sum, project) => sum + project.images.length, 0), 397);
const maskedSlug = 'xinghewan-huixin-garden-xx';
const redirects = await readFile(path.join(root, '_redirects'), 'utf8');
const retiredSlug = redirects.match(/^\/projects\/([^/]+)\/ \/projects\//m)?.[1];
assert.ok(retiredSlug);
assert.ok(archive.projects.some((project) => project.slug === maskedSlug));
assert.ok(!archive.projects.some((project) => project.slug === retiredSlug));
const xinghewanCase = archive.projects.find((project) => project.slug === maskedSlug);
assert.ok(xinghewanCase);
assert.equal(xinghewanCase.sourceFolder, maskedSlug, 'Public archive metadata must use the masked project slug');
assert.equal(archive.projects.filter((project) => project.ownerVerification?.projectFacts === 'passed' && project.ownerVerification?.imageByImage === 'passed').length, 51);
const factSandbox = { window: {} };
vm.runInNewContext(await readFile(path.join(root, 'data/project-facts.js'), 'utf8'), factSandbox);
const projectFacts = factSandbox.window.HSD_PROJECT_FACTS;
const factFields = ['role', 'service', 'scope', 'location', 'area', 'year', 'status'];
assert.equal(Object.values(projectFacts).filter((facts) => facts.service).length, 51);
assert.equal(Object.values(projectFacts).filter((facts) => facts.role).length, 52);
const genericRoleSlugs = ['black-cow-villa', 'congdu-international-manor-villa', 'guangzhou-luhu-mingxuan-villa-01', 'hong-kong-villa', 'pazhou-no1-detached-villa', 'pazhou-no1-villa-02', 'shenzhen-qiaocheng-no1-villa-01', 'zhonglv-jiulonghu-villa', 'zhonglv-rose-lake-detached-villa'];
for (const slug of genericRoleSlugs) {
  assert.equal(projectFacts[slug]?.role?.cn, '设计师', slug);
  assert.equal(projectFacts[slug]?.role?.en, 'Designer', slug);
}
for (const [slug, facts] of Object.entries(projectFacts)) {
  assert.ok(archive.projects.some((project) => project.slug === slug), `Unknown facts case: ${slug}`);
  assert.ok(facts.evidence, `Missing fact evidence: ${slug}`);
  for (const field of factFields) {
    if (facts[field]) {
      assert.ok(facts[field].cn && facts[field].en, `Incomplete bilingual fact: ${slug}.${field}`);
    }
  }
}

for (const project of archive.projects) {
  if (project.slug !== 'shunde-liang-villa') {
    assert.equal(projectFacts[project.slug]?.service?.cn, '全过程设计服务', project.slug);
    assert.equal(projectFacts[project.slug]?.service?.en, 'Full-process design service', project.slug);
  }
  assert.ok(project.sourceImageNote.includes(project.slug === 'shunde-liang-villa' ? '方案效果图' : '图像类型已由 HSD 逐张核验'));
  for (const image of project.images) await access(path.join(root, image));
  for (const [prefix, language] of [['projects', 'zh'], ['en/projects', 'en']]) {
    const html = await readFile(path.join(root, prefix, project.slug, 'index.html'), 'utf8');
    const canonical = `https://hsdhans.design/${prefix}/${project.slug}/`;
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`), canonical);
    assert.ok(html.includes('HSD 翰·设计') || html.includes('HSD / HANS DESIGN'), canonical);
    assert.ok(html.includes('application/ld+json'), canonical);
    assert.ok(html.includes('class="case-reading"'), canonical);
    assert.equal((html.match(/class="case-gallery-item"/g) || []).length, project.images.length, canonical);
    assert.equal((html.match(/data-zoom-image=/g) || []).length, project.images.length, canonical);
    assert.ok(html.includes('/modules/editorial.js?v=case-gallery-20261007'), canonical);
    for (const image of project.images) assert.ok(html.includes(image), `${canonical}: ${image}`);
    const facts = projectFacts[project.slug];
    const hasFacts = facts && factFields.some((field) => facts[field]);
    if (project.slug === 'shunde-liang-villa') {
      assert.ok(html.includes(language === 'zh' ? '已完工交付使用' : 'Completed and handed over for use'), canonical);
      assert.ok(html.includes(language === 'zh' ? '方案效果图' : 'design rendering'), canonical);
      assert.ok(html.includes('case-project-facts'), canonical);
    }
    if (hasFacts) {
      assert.ok(html.includes('case-project-facts'), canonical);
      for (const field of factFields) {
        if (!facts[field]) continue;
        assert.ok(html.includes(facts[field][language === 'zh' ? 'cn' : 'en']), `${canonical}: ${field}`);
      }
      if (project.slug !== 'shunde-liang-villa') {
        const summary = html.match(/<meta name="description" content="([^"]*)">/)?.[1] || '';
        const summaryFields = ['scope', 'service', 'location', 'area', 'year', 'status'].filter((field) => facts[field]).slice(0, 3);
        for (const field of summaryFields) {
          assert.ok(summary.includes(facts[field][language === 'zh' ? 'cn' : 'en']), `${canonical}: ${field} summary`);
        }
      }
      assert.ok(facts.evidence);
    } else {
      assert.ok(!html.includes('case-project-facts'), `Unverified project facts: ${canonical}`);
    }
    if (project.slug !== 'shunde-liang-villa') {
      assert.ok(html.includes(language === 'zh' ? '图像类型已由 HSD 逐张核验' : 'image types have been verified image by image by HSD'), canonical);
    }
  }
}
for (const entry of ['index.html', 'projects.html']) {
  const html = await readFile(path.join(root, entry), 'utf8');
  assert.ok(html.includes('data/project-facts.js?v=case-standard-20261007-r6'), entry);
  assert.ok(html.includes('app.js?v=case-standard-20261007-r6'), entry);
}
assert.ok(redirects.includes('/projects/' + retiredSlug + '/ /projects/' + maskedSlug + '/ 301'));
assert.ok(redirects.includes('/en/projects/' + retiredSlug + '/ /en/projects/' + maskedSlug + '/ 301'));
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
assert.ok(!sitemap.includes(retiredSlug));
assert.ok(sitemap.includes('/projects/xinghewan-huixin-garden-xx/'));
console.log('PASS: 52 bilingual cases, 397 gallery references, 51 owner-verified cases, masked route, source boundaries and Shunde facts.');
