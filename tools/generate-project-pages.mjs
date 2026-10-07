import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const canonicalRoot = 'https://hsdhans.design';
const categories = {
  residential: { cn: '住宅', en: 'Residential' },
  hospitality: { cn: '酒店及会所', en: 'Hospitality' },
  workplace: { cn: '办公', en: 'Workplace' },
  landscape: { cn: '景观', en: 'Landscape' },
  commercial: { cn: '商业', en: 'Commercial' },
  institutional: { cn: '机构', en: 'Institutional' },
  other: { cn: '其他', en: 'Other' }
};

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(siteRoot, relativePath), 'utf8'));
}

async function readWindowData(relativePath, key) {
  const sandbox = { window: {} };
  vm.runInNewContext(await readFile(path.join(siteRoot, relativePath), 'utf8'), sandbox, { filename: relativePath });
  return sandbox.window[key];
}

function extractObject(source, name) {
  const declaration = source.indexOf(`const ${name} =`);
  if (declaration < 0) throw new Error(`Cannot find ${name} in app.js`);
  const start = source.indexOf('{', declaration);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === quote) quote = '';
      continue;
    }
    if (character === '"' || character === "'" || character === '`') quote = character;
    else if (character === '{') depth += 1;
    else if (character === '}' && --depth === 0) {
      return vm.runInNewContext(`(${source.slice(start, index + 1)})`);
    }
  }
  throw new Error(`Unterminated object literal for ${name}`);
}

function storyMarkup(story) {
  if (!story) return '';
  return `<section class="case-reading" aria-labelledby="case-reading-title">
    <p class="eyebrow" data-en="VISUAL READING" data-cn="空间阅读">空间阅读</p>
    <h2 id="case-reading-title" data-en="${escapeHtml(story.premise.en)}" data-cn="${escapeHtml(story.premise.cn)}">${escapeHtml(story.premise.cn)}</h2>
    <p class="case-reading-disclosure" data-en="An editorial reading of the available images; it does not state project responsibilities or construction history." data-cn="以下为基于现有画面的设计解读，不代表项目分工或施工履历。">以下为基于现有画面的设计解读，不代表项目分工或施工履历。</p>
    <div class="case-reading-grid">${story.sections.map((section, index) => `<article>
      <p class="eyebrow">0${index + 1} / <span data-en="${escapeHtml(section.title.en)}" data-cn="${escapeHtml(section.title.cn)}">${escapeHtml(section.title.cn)}</span></p>
      <p data-en="${escapeHtml(section.text.en)}" data-cn="${escapeHtml(section.text.cn)}">${escapeHtml(section.text.cn)}</p>
    </article>`).join('')}</div>
  </section>`;
}

function storyMarkupEn(story) {
  if (!story) return '';
  return `<section class="case-reading" aria-labelledby="case-reading-title">
    <p class="eyebrow">VISUAL READING</p>
    <h2 id="case-reading-title">${escapeHtml(story.premise.en)}</h2>
    <p class="case-reading-disclosure">An editorial reading of the available images; it does not state project responsibilities or construction history.</p>
    <div class="case-reading-grid">${story.sections.map((section, index) => `<article>
      <p class="eyebrow">0${index + 1} / ${escapeHtml(section.title.en)}</p>
      <p>${escapeHtml(section.text.en)}</p>
    </article>`).join('')}</div>
  </section>`;
}

function caseVisualReadingMarkup(reading) {
  if (!reading) return '';
  return `<section class="case-reading" aria-labelledby="case-reading-title">
    <p class="eyebrow" data-en="IMAGE-LED READING" data-cn="基于画面的阅读">基于画面的阅读</p>
    <h2 id="case-reading-title" data-en="${escapeHtml(reading.premise.en)}" data-cn="${escapeHtml(reading.premise.cn)}">${escapeHtml(reading.premise.cn)}</h2>
    <p class="case-reading-disclosure" data-en="This reading separates what is directly visible from interpretive design clues. Year, area and completion status are not inferred from the images." data-cn="以下内容区分画面可直接辨认的信息与设计层面的解读；年份、面积与建成状态不根据图片推定。">以下内容区分画面可直接辨认的信息与设计层面的解读；年份、面积与建成状态不根据图片推定。</p>
    <div class="case-reading-grid">${reading.sections.map((section, index) => `<article data-reading-kind="${escapeHtml(section.kind)}">
      <p class="eyebrow">0${index + 1} / <span data-en="${escapeHtml(section.title.en)}" data-cn="${escapeHtml(section.title.cn)}">${escapeHtml(section.title.cn)}</span></p>
      <p data-en="${escapeHtml(section.text.en)}" data-cn="${escapeHtml(section.text.cn)}">${escapeHtml(section.text.cn)}</p>
    </article>`).join('')}</div>
  </section>`;
}

const factFields = [
  ['role', '设计角色', 'Role'],
  ['service', '服务方式', 'Service approach'],
  ['scope', '设计范围', 'Design scope'],
  ['location', '地点', 'Location'],
  ['area', '面积 / 规模', 'Area / scale'],
  ['year', '年份', 'Year'],
  ['status', '建成状态', 'Completion status']
];

function factsSummary(facts, language) {
  return ['scope', 'service', 'location', 'area', 'year', 'status']
    .filter((key) => facts?.[key])
    .slice(0, 3)
    .map((key) => facts[key][language])
    .join(language === 'cn' ? '；' : '; ');
}

function factsMarkup(facts) {
  if (!facts) return '';
  const rows = factFields.filter(([key]) => facts[key]).map(([key, labelCn, labelEn]) => `<div>
        <dt data-en="${escapeHtml(labelEn)}" data-cn="${escapeHtml(labelCn)}">${escapeHtml(labelCn)}</dt>
        <dd data-en="${escapeHtml(facts[key].en)}" data-cn="${escapeHtml(facts[key].cn)}">${escapeHtml(facts[key].cn)}</dd>
      </div>`).join('');
  return rows ? `<dl class="project-facts case-project-facts" aria-label="已确认的项目事实">${rows}</dl>` : '';
}

function factsMarkupEn(facts) {
  if (!facts) return '';
  const rows = factFields.filter(([key]) => facts[key]).map(([key, , labelEn]) => `<div>
        <dt>${escapeHtml(labelEn)}</dt>
        <dd>${escapeHtml(facts[key].en)}</dd>
      </div>`).join('');
  return rows ? `<dl class="project-facts case-project-facts" aria-label="Confirmed project facts">${rows}</dl>` : '';
}

function pageMarkup(project, index, allProjects, stories, visualReadings, projectFacts) {
  const isShunde = project.slug === 'shunde-liang-villa';
  const previous = allProjects[index - 1];
  const next = allProjects[index + 1];
  const titleCn = project.title.cn;
  const titleEn = project.title.en;
  const category = categories[project.category] || categories.other;
  const canonical = `${canonicalRoot}/projects/${project.slug}/`;
  const visualReading = visualReadings[project.slug];
  const facts = projectFacts[project.slug];
  const hasFacts = factFields.some(([key]) => facts?.[key]);
  const factsSummaryCn = factsSummary(facts, 'cn');
  const scopeNoteCn = hasFacts
    ? '本页展示已授权公开的案例源图片；下列项目事实依据已确认信息呈现，未列字段不作延伸。'
    : '本页展示已授权公开的案例源图片；项目职责、年份、地点、面积及建成状态不作未经核实的推断。';
  const scopeNoteEn = hasFacts
    ? 'This page presents authorized project source images. The project facts below reflect confirmed information; unlisted fields are not inferred.'
    : 'This page presents authorized project source images. Project responsibilities, dates, location, area and completion status are not inferred without verification.';
  const description = isShunde
    ? `${titleCn}｜HSD 翰·设计负责的项目，已完工交付使用。页面展示方案效果图，阅读庭院与室内空间关系；效果图不是建成现场照片。`
    : factsSummaryCn
    ? `${titleCn}｜${factsSummaryCn}。HSD 翰·设计案例档案。`
    : visualReading
    ? `${titleCn}｜${visualReading.summary.cn} 基于案例源图片的视觉观察与设计线索。`
    : `${titleCn}｜${category.cn}案例档案图片，共 ${project.images.length} 张。查看 HSD 翰·设计案例图像档案${stories[project.slug] ? '与空间阅读' : ''}。`;
  const imageUrls = project.images.map((image) => `${canonicalRoot}/${image.replace(/^\//, '')}`);
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${titleCn}｜${isShunde ? '方案效果图' : '案例档案图片'}｜HSD 翰·设计`,
      url: canonical,
      description,
      inLanguage: 'zh-CN',
      isPartOf: { '@id': `${canonicalRoot}/#website` },
      about: { '@id': `${canonicalRoot}/#organization` },
      primaryImageOfPage: { '@type': 'ImageObject', contentUrl: imageUrls[0] }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: `${titleCn}｜${isShunde ? '方案效果图' : '案例档案图片'}`,
      url: canonical,
      description,
      image: imageUrls.map((url, imageIndex) => ({
        '@type': 'ImageObject',
        contentUrl: url,
         caption: isShunde ? `${titleCn} 方案效果图 ${String(imageIndex + 1).padStart(2, '0')}｜HSD 翰·设计` : `${titleCn} 案例档案图片 ${String(imageIndex + 1).padStart(2, '0')}｜HSD 翰·设计`
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${canonicalRoot}/` },
        { '@type': 'ListItem', position: 2, name: '项目', item: `${canonicalRoot}/projects` },
        { '@type': 'ListItem', position: 3, name: titleCn, item: canonical }
      ]
    }
  ];
  const jsonLd = JSON.stringify(schema).replace(/</g, '\\u003c');
  const gallery = project.images.map((image, imageIndex) => {
    const number = String(imageIndex + 1).padStart(2, '0');
     const altCn = isShunde ? `${titleCn}｜方案效果图 ${number}｜HSD 翰·设计` : `${titleCn}｜案例档案图片 ${number}｜HSD 翰·设计`;
     const altEn = isShunde ? `${titleEn} | design rendering ${number} | HSD / HANS DESIGN` : `${titleEn} | case archive image ${number} | HSD / HANS DESIGN`;
    return `<figure class="case-gallery-item">
      <a href="/${escapeHtml(image)}" data-zoom-image="/${escapeHtml(image)}" data-zoom-label="${escapeHtml(altCn)}" aria-label="${escapeHtml(altCn)}">
        <img src="/${escapeHtml(image)}" alt="${escapeHtml(altCn)}" data-alt-cn="${escapeHtml(altCn)}" data-alt-en="${escapeHtml(altEn)}" width="1600" height="1200" loading="${imageIndex < 2 ? 'eager' : 'lazy'}" decoding="async">
      </a>
       <figcaption><span data-en="${isShunde ? `Design rendering ${number}` : `Case archive image ${number}`}" data-cn="${isShunde ? `方案效果图 ${number}` : `案例档案图片 ${number}`}">${isShunde ? `方案效果图 ${number}` : `案例档案图片 ${number}`}</span></figcaption>
    </figure>`;
  }).join('\n');
  const previousLink = previous
    ? `<a href="/projects/${previous.slug}/"><span class="eyebrow" data-en="PREVIOUS CASE" data-cn="上一个案例">上一个案例</span><strong>${escapeHtml(previous.title.cn)}</strong></a>`
    : '<span class="case-neighbor-empty" data-en="You are at the first case." data-cn="已是第一个案例。">已是第一个案例。</span>';
  const nextLink = next
    ? `<a href="/projects/${next.slug}/"><span class="eyebrow" data-en="NEXT CASE" data-cn="下一个案例">下一个案例</span><strong>${escapeHtml(next.title.cn)}</strong></a>`
    : '<span class="case-neighbor-empty" data-en="You are at the last case." data-cn="已是最后一个案例。">已是最后一个案例。</span>';
   const sourceNoteCn = isShunde ? '本组为方案效果图，不是交付后的现场照片。' : project.sourceImageNote;
   const sourceNoteEn = isShunde ? 'These images are design renderings, not photographs of the completed residence.' : project.sourceImageNoteEn;

  return `<!doctype html>
<!-- HSD GENERATED CASE PAGE: ${project.slug} -->
<html lang="zh-CN" data-lang="cn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.svg" type="image/svg+xml">
  <title>${escapeHtml(titleCn)}｜${isShunde ? '方案效果图' : '案例档案图片'}｜HSD 翰·设计</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="zh-CN" href="${canonical}">
  <link rel="alternate" hreflang="en" href="${canonicalRoot}/en/projects/${project.slug}/">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:title" content="${escapeHtml(titleCn)}｜${isShunde ? '方案效果图' : '案例档案图片'}｜HSD 翰·设计">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${imageUrls[0]}">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${jsonLd}</script>
  <link rel="stylesheet" href="/styles.css?v=client-ready-20260911">
  <link rel="stylesheet" href="/editorial.css?v=client-ready-20260911">
  <link rel="stylesheet" href="/client.css?v=interaction-20260912">
  <link rel="stylesheet" href="/project-detail.css?v=project-facts-20260922">
  <script src="/data/projects.js?v=case-standard-20261007-r6" defer></script>
  <script src="/data/stories.js?v=client-ready-20260911" defer></script>
  <script src="/app.js?v=case-standard-20261007-r6" defer></script>
  <script src="/modules/editorial.js?v=case-gallery-20261007" defer></script>
</head>
<body data-page="case" data-title-cn="${escapeHtml(`${titleCn}｜${isShunde ? '方案效果图' : '案例档案图片'}｜HSD 翰·设计`)}" data-title-en="${escapeHtml(`${titleEn} | ${isShunde ? 'Design Renderings' : 'Case Archive Images'} | HSD`)}">
  <a class="skip-link" href="#main" data-en="Skip to content" data-cn="跳到正文">跳到正文</a>
  <header class="site-header header-on-paper" data-site-header>
    <a class="brand" href="/" aria-label="HSD / HANS DESIGN / 翰 · 设计首页"><picture class="brand-desktop" aria-hidden="true"><img class="brand-logo-main brand-logo-black" src="/assets/brand/hsd-main-horizontal-black.svg" alt=""><img class="brand-logo-main brand-logo-reverse" src="/assets/brand/hsd-main-horizontal-reverse.svg" alt=""></picture><picture class="brand-mobile" aria-hidden="true"><img class="brand-logo-icon brand-logo-black" src="/assets/brand/hsd-icon-black.svg" alt=""><img class="brand-logo-icon brand-logo-reverse" src="/assets/brand/hsd-icon-reverse.svg" alt=""></picture></a>
    <nav class="desktop-nav" aria-label="主导航"><a href="/projects" data-en="Projects" data-cn="项目">项目</a><a href="/studio" data-en="Studio" data-cn="工作室">工作室</a><a href="/services" data-en="Services" data-cn="服务">服务</a><a href="/guides" data-en="Design Notes" data-cn="设计判断">设计判断</a><a href="/contact" data-en="Contact" data-cn="联系">联系</a></nav>
    <div class="header-actions"><a class="lang-toggle" href="/en/projects/${project.slug}/" hreflang="en" lang="en" aria-label="View the English version">EN</a><button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span class="sr-only" data-en="Menu" data-cn="菜单">菜单</span></button></div>
  </header>
  <div class="mobile-menu" id="mobile-menu" data-mobile-menu aria-hidden="true" inert><div class="menu-plane menu-plane-ink"></div><div class="menu-plane menu-plane-paper"></div><nav aria-label="移动导航"><a href="/" data-en="Home" data-cn="首页">首页</a><a href="/projects" data-en="Projects" data-cn="项目">项目</a><a href="/studio" data-en="Studio" data-cn="工作室">工作室</a><a href="/services" data-en="Services" data-cn="服务">服务</a><a href="/guides" data-en="Design Notes" data-cn="设计判断">设计判断</a><a href="/contact" data-en="Contact" data-cn="联系">联系</a></nav><p>HSD / GUANGZHOU / 2026</p></div>
  <main class="case-detail" id="main">
    <nav class="case-breadcrumb" aria-label="面包屑导航"><a href="/" data-en="Home" data-cn="首页">首页</a><span aria-hidden="true">/</span><a href="/projects" data-en="Projects" data-cn="项目">项目</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(titleCn)}</span></nav>
    <header class="case-detail-heading">
      <p class="eyebrow"><span data-en="CASE ARCHIVE" data-cn="案例档案">案例档案</span><span aria-hidden="true"> / </span>${String(index + 1).padStart(2, '0')} — ${String(allProjects.length).padStart(2, '0')}</p>
      <h1 class="case-title">${escapeHtml(titleCn)}</h1>
      <p class="case-title-en" lang="en">${escapeHtml(titleEn)}</p>
      <div class="case-meta"><span data-en="${escapeHtml(category.en)}" data-cn="${escapeHtml(category.cn)}">${escapeHtml(category.cn)}</span><span>${project.images.length} <span data-en="images" data-cn="张图片">张图片</span></span></div>
      ${factsMarkup(facts)}
      <p class="case-source-note"><span class="eyebrow" data-en="IMAGE SOURCE" data-cn="图片来源">图片来源</span><span data-en="${escapeHtml(sourceNoteEn)}" data-cn="${escapeHtml(sourceNoteCn)}">${escapeHtml(sourceNoteCn)}</span></p>
      <p class="case-scope-note" data-en="${escapeHtml(scopeNoteEn)}" data-cn="${escapeHtml(scopeNoteCn)}">${escapeHtml(scopeNoteCn)}</p>
      <div class="case-share"><button type="button" data-copy="${canonical}"><span data-en="Copy case link" data-cn="复制案例链接">复制案例链接</span></button><a href="/contact?project=${encodeURIComponent(project.slug)}#wechat" data-en="WeChat: HSD_Design618 ↗" data-cn="微信咨询：HSD_Design618 ↗">微信咨询：HSD_Design618 ↗</a></div>
    </header>
    ${stories[project.slug] ? storyMarkup(stories[project.slug]) : caseVisualReadingMarkup(visualReading)}
    <section class="case-gallery-section" aria-labelledby="case-gallery-title">
      <div class="case-gallery-heading"><p class="eyebrow" data-en="CASE IMAGE ARCHIVE" data-cn="案例图片档案">案例图片档案</p><h2 id="case-gallery-title"><span data-en="The image set" data-cn="图片档案">图片档案</span><span class="case-gallery-count">${String(project.images.length).padStart(2, '0')}</span></h2></div>
      <div class="case-gallery">${gallery}</div>
    </section>
    <nav class="case-neighbor-nav" aria-label="案例导航">${previousLink}${nextLink}</nav>
    <p class="case-back-link"><a href="/projects" data-en="← Back to all projects" data-cn="← 返回全部案例">← 返回全部案例</a></p>
  </main>
  <footer class="site-footer"><a class="footer-wordmark" href="/" aria-label="HSD / HANS DESIGN 首页"><strong>HSD</strong><span>HANS DESIGN</span></a><p data-en="Independent residential design practice · Guangzhou" data-cn="独立私宅设计实践 · 广州">独立私宅设计实践 · 广州</p><div><a href="/privacy" data-en="Privacy" data-cn="隐私">隐私</a><span>© 2026 HSD</span></div></footer>
</body>
</html>
`;
}

function caseVisualReadingMarkupEn(reading) {
  if (!reading) return '';
  return `<section class="case-reading" aria-labelledby="case-reading-title">
    <p class="eyebrow">IMAGE-LED READING</p>
    <h2 id="case-reading-title">${escapeHtml(reading.premise.en)}</h2>
    <p class="case-reading-disclosure">This reading separates what is directly visible from interpretive design clues. Year, area and completion status are not inferred from the images.</p>
    <div class="case-reading-grid">${reading.sections.map((section, index) => `<article data-reading-kind="${escapeHtml(section.kind)}">
      <p class="eyebrow">0${index + 1} / ${escapeHtml(section.title.en)}</p>
      <p>${escapeHtml(section.text.en)}</p>
    </article>`).join('')}</div>
  </section>`;
}

function pageMarkupEn(project, index, allProjects, stories, visualReadings, projectFacts) {
  const isShunde = project.slug === 'shunde-liang-villa';
  const previous = allProjects[index - 1];
  const next = allProjects[index + 1];
  const titleCn = project.title.cn;
  const titleEn = project.title.en;
  const category = categories[project.category] || categories.other;
  const canonical = `${canonicalRoot}/en/projects/${project.slug}/`;
  const visualReading = visualReadings[project.slug];
  const facts = projectFacts[project.slug];
  const hasFacts = factFields.some(([key]) => facts?.[key]);
  const factsSummaryEn = factsSummary(facts, 'en');
  const scopeNoteEn = hasFacts
    ? 'This page presents authorized project source images. The project facts below reflect confirmed information; unlisted fields are not inferred.'
    : 'This page presents authorized project source images. Project responsibilities, dates, location, area and completion status are not inferred without verification.';
   const description = isShunde
     ? `${titleEn} — An HSD / HANS DESIGN project completed and handed over for use. Images shown are design renderings, not photographs of the completed residence.`
     : factsSummaryEn
     ? `${titleEn} — ${factsSummaryEn}. HSD / HANS DESIGN project archive.`
     : visualReading
     ? `${titleEn} — ${visualReading.summary.en} Image-led observations and design readings.`
    : `${titleEn} — ${category.en.toLowerCase()} project source imagery from HSD / HANS DESIGN, presented with clear factual boundaries.`;
  const imageUrls = project.images.map((image) => `${canonicalRoot}/${image.replace(/^\//, '')}`);
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${titleEn} | ${isShunde ? 'Design Renderings' : 'Case Archive Images'} | HSD`,
      url: canonical,
      description,
      inLanguage: 'en',
      isPartOf: { '@id': `${canonicalRoot}/#website` },
      about: { '@id': `${canonicalRoot}/#organization` },
      primaryImageOfPage: { '@type': 'ImageObject', contentUrl: imageUrls[0] }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: `${titleEn} | ${isShunde ? 'Design Renderings' : 'Case Archive Images'}`,
      url: canonical,
      description,
      image: imageUrls.map((url, imageIndex) => ({
        '@type': 'ImageObject',
        contentUrl: url,
         caption: isShunde ? `${titleEn} design rendering ${String(imageIndex + 1).padStart(2, '0')} | HSD / HANS DESIGN` : `${titleEn} case archive image ${String(imageIndex + 1).padStart(2, '0')} | HSD / HANS DESIGN`
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${canonicalRoot}/en/` },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${canonicalRoot}/en/projects` },
        { '@type': 'ListItem', position: 3, name: titleEn, item: canonical }
      ]
    }
  ];
  const jsonLd = JSON.stringify(schema).replace(/</g, '\\u003c');
  const gallery = project.images.map((image, imageIndex) => {
    const number = String(imageIndex + 1).padStart(2, '0');
     const alt = isShunde ? `${titleEn} | design rendering ${number} | HSD / HANS DESIGN` : `${titleEn} | case archive image ${number} | HSD / HANS DESIGN`;
    const imagePath = `/${image.replace(/^\//, '')}`;
    return `<figure class="case-gallery-item">
      <a href="${escapeHtml(imagePath)}" data-zoom-image="${escapeHtml(imagePath)}" data-zoom-label="${escapeHtml(alt)}" aria-label="${escapeHtml(alt)}">
        <img src="${escapeHtml(imagePath)}" alt="${escapeHtml(alt)}" width="1600" height="1200" loading="${imageIndex < 2 ? 'eager' : 'lazy'}" decoding="async">
      </a>
       <figcaption>${isShunde ? `Design rendering ${number}` : `Case archive image ${number}`}</figcaption>
    </figure>`;
  }).join('\n');
  const previousLink = previous
    ? `<a href="/en/projects/${previous.slug}/"><span class="eyebrow">PREVIOUS CASE</span><strong>${escapeHtml(previous.title.en)}</strong></a>`
    : '<span class="case-neighbor-empty">You are at the first case.</span>';
  const nextLink = next
    ? `<a href="/en/projects/${next.slug}/"><span class="eyebrow">NEXT CASE</span><strong>${escapeHtml(next.title.en)}</strong></a>`
    : '<span class="case-neighbor-empty">You are at the last case.</span>';
   const sourceNoteEn = isShunde ? 'These images are design renderings, not photographs of the completed residence.' : project.sourceImageNoteEn;

  return `<!doctype html>
<!-- HSD GENERATED EN CASE PAGE: ${project.slug} -->
<html lang="en" data-lang="en" data-static-locale="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.svg" type="image/svg+xml">
  <title>${escapeHtml(titleEn)} | ${isShunde ? 'Design Renderings' : 'Case Archive Images'} | HSD / HANS DESIGN</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="zh-CN" href="${canonicalRoot}/projects/${project.slug}/">
  <link rel="alternate" hreflang="en" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="en_US">
  <meta property="og:title" content="${escapeHtml(titleEn)} | ${isShunde ? 'Design Renderings' : 'Case Archive Images'} | HSD">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${imageUrls[0]}">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${jsonLd}</script>
  <link rel="stylesheet" href="/styles.css?v=client-ready-20260911">
  <link rel="stylesheet" href="/editorial.css?v=client-ready-20260911">
  <link rel="stylesheet" href="/client.css?v=interaction-20260912">
  <link rel="stylesheet" href="/project-detail.css?v=project-facts-20260922">
  <script src="/data/projects.js?v=case-standard-20261007-r6" defer></script>
  <script src="/data/stories.js?v=client-ready-20260911" defer></script>
  <script src="/app.js?v=case-standard-20261007-r6" defer></script>
  <script src="/modules/editorial.js?v=case-gallery-20261007" defer></script>
</head>
<body data-page="case" data-title-cn="${escapeHtml(`${titleCn}｜${isShunde ? '方案效果图' : '案例档案图片'}｜HSD 翰·设计`)}" data-title-en="${escapeHtml(`${titleEn} | ${isShunde ? 'Design Renderings' : 'Case Archive Images'} | HSD`)}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header header-on-paper" data-site-header>
    <a class="brand" href="/en/" aria-label="HSD / HANS DESIGN home"><picture class="brand-desktop" aria-hidden="true"><img class="brand-logo-main brand-logo-black" src="/assets/brand/hsd-main-horizontal-black.svg" alt=""><img class="brand-logo-main brand-logo-reverse" src="/assets/brand/hsd-main-horizontal-reverse.svg" alt=""></picture><picture class="brand-mobile" aria-hidden="true"><img class="brand-logo-icon brand-logo-black" src="/assets/brand/hsd-icon-black.svg" alt=""><img class="brand-logo-icon brand-logo-reverse" src="/assets/brand/hsd-icon-reverse.svg" alt=""></picture></a>
    <nav class="desktop-nav" aria-label="Main navigation"><a href="/en/projects">Projects</a><a href="/en/studio">Studio</a><a href="/en/services">Services</a><a href="/en/guides">Design notes</a><a href="/en/contact">Contact</a></nav>
    <div class="header-actions"><a class="lang-toggle" href="/projects/${project.slug}/" hreflang="zh-CN" lang="zh-CN" aria-label="查看中文版本">中文</a><button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span class="sr-only">Menu</span></button></div>
  </header>
  <div class="mobile-menu" id="mobile-menu" data-mobile-menu aria-hidden="true" inert><div class="menu-plane menu-plane-ink"></div><div class="menu-plane menu-plane-paper"></div><nav aria-label="Mobile navigation"><a href="/en/">Home</a><a href="/en/projects">Projects</a><a href="/en/studio">Studio</a><a href="/en/services">Services</a><a href="/en/guides">Design notes</a><a href="/en/contact">Contact</a></nav><p>HSD / GUANGZHOU / 2026</p></div>
  <main class="case-detail" id="main">
    <nav class="case-breadcrumb" aria-label="Breadcrumb"><a href="/en/">Home</a><span aria-hidden="true">/</span><a href="/en/projects">Projects</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(titleEn)}</span></nav>
    <header class="case-detail-heading">
      <p class="eyebrow">CASE ARCHIVE / ${String(index + 1).padStart(2, '0')} — ${String(allProjects.length).padStart(2, '0')}</p>
      <h1 class="case-title">${escapeHtml(titleEn)}</h1>
      <div class="case-meta"><span>${escapeHtml(category.en)}</span><span>${project.images.length} images</span></div>
      ${factsMarkupEn(facts)}
      <p class="case-source-note"><span class="eyebrow">IMAGE SOURCE</span><span>${escapeHtml(sourceNoteEn)}</span></p>
      <p class="case-scope-note">${escapeHtml(scopeNoteEn)}</p>
      <div class="case-share"><button type="button" data-copy="${canonical}"><span data-en="Copy case link" data-cn="复制案例链接">Copy case link</span></button><a href="/en/contact?project=${encodeURIComponent(project.slug)}#wechat">WeChat: HSD_Design618 ↗</a></div>
    </header>
    ${stories[project.slug] ? storyMarkupEn(stories[project.slug]) : caseVisualReadingMarkupEn(visualReading)}
    <section class="case-gallery-section" aria-labelledby="case-gallery-title">
      <div class="case-gallery-heading"><p class="eyebrow">CASE IMAGE ARCHIVE</p><h2 id="case-gallery-title"><span>The image set</span><span class="case-gallery-count">${String(project.images.length).padStart(2, '0')}</span></h2></div>
      <div class="case-gallery">${gallery}</div>
    </section>
    <nav class="case-neighbor-nav" aria-label="Case navigation">${previousLink}${nextLink}</nav>
    <p class="case-back-link"><a href="/en/projects">← Back to selected projects</a></p>
  </main>
  <footer class="site-footer"><a class="footer-wordmark" href="/en/" aria-label="HSD / HANS DESIGN home"><strong>HSD</strong><span>HANS DESIGN</span></a><p>Independent residential design practice · Guangzhou</p><div><a href="/privacy?lang=en">Privacy</a><span>© 2026 HSD</span></div></footer>
</body>
</html>
`;
}

async function main() {
  const [archive, selectedProjects, stories, visualReadings, projectFacts, appSource, sitemap] = await Promise.all([
    readJson('assets/cases/index.json'),
    readWindowData('data/projects.js', 'HSD_PROJECTS'),
    readWindowData('data/stories.js', 'HSD_STORIES'),
    readWindowData('data/case-visual-readings.js', 'HSD_CASE_VISUAL_READINGS'),
    readWindowData('data/project-facts.js', 'HSD_PROJECT_FACTS'),
    readFile(path.join(siteRoot, 'app.js'), 'utf8'),
    readFile(path.join(siteRoot, 'sitemap.xml'), 'utf8')
  ]);
  const titleCnMap = extractObject(appSource, 'archiveTitleCn');
  const titleEnMap = extractObject(appSource, 'archiveTitleEn');
  const selectedById = new Map(selectedProjects.map((project) => [project.id, project.title]));
  const projects = archive.projects.map((row) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug)) throw new Error(`Invalid project slug: ${row.slug}`);
    const selectedTitle = selectedById.get(row.slug);
    const title = {
      cn: selectedTitle?.cn || titleCnMap[row.slug] || row.title,
      en: selectedTitle?.en || titleEnMap[row.slug] || row.title
    };
    if (!title.cn || !title.en || !Array.isArray(row.images) || row.images.length === 0) {
      throw new Error(`Missing title or images for ${row.slug}`);
    }
    return { ...row, title, images: row.images, category: row.category || 'other' };
  });
  if (projects.length !== 52) throw new Error(`Expected 52 archive cases; found ${projects.length}`);
  const missingReadings = projects.filter((project) => !stories[project.slug] && !visualReadings[project.slug]);
  const overlappingReadings = projects.filter((project) => stories[project.slug] && visualReadings[project.slug]);
  const unexpectedReadings = Object.keys(visualReadings).filter((slug) => !projects.some((project) => project.slug === slug));
  if (missingReadings.length || overlappingReadings.length || unexpectedReadings.length || Object.keys(visualReadings).length !== 43) {
    throw new Error(`Reading coverage mismatch: ${Object.keys(visualReadings).length} new; ${missingReadings.length} missing; ${overlappingReadings.length} overlapping; ${unexpectedReadings.length} unknown.`);
  }
  const projectSlugs = new Set(projects.map((project) => project.slug));
  for (const [slug, facts] of Object.entries(projectFacts)) {
    if (!projectSlugs.has(slug) || !facts.evidence) throw new Error(`Project facts lack a case match or source: ${slug}`);
    for (const [key, ,] of factFields) {
      if (facts[key] && (!facts[key].cn || !facts[key].en)) throw new Error(`Incomplete bilingual fact ${slug}.${key}`);
    }
  }
  if (projectFacts['shunde-liang-villa']?.status?.cn !== '已完工交付使用') {
    throw new Error('The directly confirmed Shunde completion status is missing.');
  }

  const [projectsPage, englishProjectsPage] = await Promise.all([
    readFile(path.join(siteRoot, 'projects.html'), 'utf8'),
    readFile(path.join(siteRoot, 'en', 'projects.html'), 'utf8')
  ]);
  const startMarker = '<!-- HSD CASE INDEX START -->';
  const endMarker = '<!-- HSD CASE INDEX END -->';
  const hasMarkers = projectsPage.includes(startMarker) && projectsPage.includes(endMarker);
  if (!hasMarkers && !projectsPage.includes('<div class="archive-grid" data-archive-grid></div>')) {
    throw new Error('Cannot find the expected archive grid insertion point in projects.html');
  }
  const routeRoot = path.join(siteRoot, 'projects');
  const englishRouteRoot = path.join(siteRoot, 'en', 'projects');
  for (const project of projects) {
    for (const image of project.images) await access(path.join(siteRoot, image));
    const routeDirectory = path.join(routeRoot, project.slug);
    try {
      await access(routeDirectory);
      const existing = await readFile(path.join(routeDirectory, 'index.html'), 'utf8');
      if (!existing.includes(`<!-- HSD GENERATED CASE PAGE: ${project.slug} -->`)) {
        throw new Error(`Refusing to overwrite an unrecognized route: ${routeDirectory}`);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    const englishRouteDirectory = path.join(englishRouteRoot, project.slug);
    try {
      await access(englishRouteDirectory);
      const existing = await readFile(path.join(englishRouteDirectory, 'index.html'), 'utf8');
      if (!existing.includes(`<!-- HSD GENERATED EN CASE PAGE: ${project.slug} -->`)) {
        throw new Error(`Refusing to overwrite an unrecognized English route: ${englishRouteDirectory}`);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  if (!sitemap.includes('</urlset>')) throw new Error('sitemap.xml has no closing urlset tag');

  await mkdir(routeRoot, { recursive: true });
  for (const [index, project] of projects.entries()) {
    const directory = path.join(routeRoot, project.slug);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), pageMarkup(project, index, projects, stories, visualReadings, projectFacts), 'utf8');
    const englishDirectory = path.join(englishRouteRoot, project.slug);
    await mkdir(englishDirectory, { recursive: true });
    await writeFile(path.join(englishDirectory, 'index.html'), pageMarkupEn(project, index, projects, stories, visualReadings, projectFacts), 'utf8');
  }

  const staticCards = projects.map((project) => {
    const category = categories[project.category] || categories.other;
    return `<a class="archive-card" href="/projects/${project.slug}/" data-archive-id="${project.slug}" aria-label="${escapeHtml(project.title.cn)}"><figure><div class="archive-image"><img src="/${escapeHtml(project.cover)}" alt="${escapeHtml(project.title.cn)}" width="1200" height="900" loading="lazy" decoding="async"></div><figcaption><h3>${escapeHtml(project.title.cn)}</h3><p class="archive-meta"><span data-en="${escapeHtml(category.en)}" data-cn="${escapeHtml(category.cn)}">${escapeHtml(category.cn)}</span><span class="archive-source-status" data-en=" · HSD CASE ARCHIVE" data-cn=" · HSD 案例档案"> · HSD 案例档案</span></p></figcaption></figure></a>`;
  }).join('\n');
  const indexMarkup = `${startMarker}<div class="archive-grid" data-archive-grid data-state="ready" aria-busy="false">${staticCards}</div>${endMarker}`;
  let updatedProjectsPage;
  if (hasMarkers) {
    updatedProjectsPage = projectsPage.replace(new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`), indexMarkup);
  } else {
    updatedProjectsPage = projectsPage.replace('<div class="archive-grid" data-archive-grid></div>', indexMarkup);
  }
  updatedProjectsPage = updatedProjectsPage.replace('aria-busy="true"><div class="archive-heading"', 'aria-busy="false"><div class="archive-heading"');
  updatedProjectsPage = updatedProjectsPage.replace('<p class="archive-status" data-archive-status aria-live="polite"></p>', '<p class="archive-status" data-archive-status aria-live="polite">共 52 个案例，均可进入独立详情页。</p>');
  await writeFile(path.join(siteRoot, 'projects.html'), updatedProjectsPage, 'utf8');

  const englishCaseLinks = [...englishProjectsPage.matchAll(/href="\/projects\/([a-z0-9-]+)\/\?lang=en"/g)];
  const localizedEnglishCaseLinks = [...englishProjectsPage.matchAll(/href="\/en\/projects\/([a-z0-9-]+)\/"/g)];
  if (englishCaseLinks.length + localizedEnglishCaseLinks.length === 0) {
    throw new Error('Cannot find the expected English case links in en/projects.html');
  }
  let updatedEnglishProjectsPage = englishProjectsPage.replace(/href="\/projects\/([a-z0-9-]+)\/\?lang=en"/g, 'href="/en/projects/$1/"');
  const oldEnglishNotice = 'The linked case archives remain on their original canonical URLs and are primarily in Chinese. Their language control translates some interface and image labels; separate English case URLs are not yet available.';
  const newEnglishNotice = 'Each featured case opens an English-language detail page. The complete 52-case archive remains available from the Chinese project index.';
  if (!updatedEnglishProjectsPage.includes(newEnglishNotice) && !updatedEnglishProjectsPage.includes(oldEnglishNotice)) {
    throw new Error('Cannot find the expected English archive notice in en/projects.html');
  }
  updatedEnglishProjectsPage = updatedEnglishProjectsPage.replace(oldEnglishNotice, newEnglishNotice);
  await writeFile(path.join(siteRoot, 'en', 'projects.html'), updatedEnglishProjectsPage, 'utf8');

  const desiredProjectUrls = projects.flatMap((project) => [
    `${canonicalRoot}/projects/${project.slug}/`,
    `${canonicalRoot}/en/projects/${project.slug}/`
  ]);
  const currentProjectSlugs = new Set(projects.map((project) => project.slug));
  const sitemapWithoutRetiredProjectUrls = sitemap.replace(/<url>[\s\S]*?<\/url>/g, (entry) => {
    const url = entry.match(/<loc>(.*?)<\/loc>/)?.[1];
    const match = url?.match(/^https:\/\/hsdhans\.design\/(?:en\/)?projects\/([a-z0-9-]+)\/$/);
    return match && !currentProjectSlugs.has(match[1]) ? '' : entry;
  });
  const existingUrls = new Set([...sitemapWithoutRetiredProjectUrls.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]));
  const sitemapDate = new Date().toISOString().slice(0, 10);
  const sitemapEntries = desiredProjectUrls.filter((url) => !existingUrls.has(url))
    .map((url) => `  <url><loc>${url}</loc><lastmod>${sitemapDate}</lastmod><changefreq>yearly</changefreq><priority>0.7</priority></url>`)
    .join('\n');
  const updatedSitemap = sitemapWithoutRetiredProjectUrls.replace('</urlset>', `${sitemapEntries ? `\n${sitemapEntries}\n` : ''}</urlset>`);
  await writeFile(path.join(siteRoot, 'sitemap.xml'), updatedSitemap, 'utf8');
  console.log(`Generated ${projects.length} case pages with ${projects.reduce((sum, project) => sum + project.images.length, 0)} gallery images.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
