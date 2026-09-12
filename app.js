(() => {
  const root = document.documentElement;
  const body = document.body;
  // The release build is a public personal portfolio. Keep project context and
  // image-treatment notes visible instead of hiding them as internal-preview UI.
  const isClientView = false;
  body.classList.toggle('client-view', isClientView);
  const languageButtons = [...document.querySelectorAll('[data-language-toggle]')];
  const selectedProjects = Array.isArray(window.HSD_PROJECTS) ? window.HSD_PROJECTS : [];
  const truthLabels = {
    'source-case': { en: 'SOURCE MATERIAL / CONTEXT PROVIDED', cn: '来源资料 / 具体说明见项目备注' },
    'source-case-plus-reconstruction': { en: 'SOURCE CASE + VISUAL RECONSTRUCTIONS', cn: '\u6765\u6e90\u6848\u4f8b + \u89c6\u89c9\u91cd\u6784' },
    'source-case-plus-concepts': { en: 'SOURCE CASE + CONCEPT SUPPLEMENTS', cn: '来源案例 + 概念补图' },
    'concept-study': { en: 'CONCEPT STUDY', cn: '概念研究' },
    'not-built': { en: 'NOT BUILT', cn: '非建成项目' },
    'verified-built': { en: 'VERIFIED BUILT', cn: '已核实建成' }
  };
  const categoryLabels = {
    residential: { en: 'Residential', cn: '住宅' },
    hospitality: { en: 'Hospitality', cn: '酒店' },
    workplace: { en: 'Workplace', cn: '办公' },
    landscape: { en: 'Landscape', cn: '景观' },
    commercial: { en: 'Commercial', cn: '商业' },
    institutional: { en: 'Institutional', cn: '机构' },
    other: { en: 'Other', cn: '其他' }
  };
  const archiveTitleCn = {
    'aihua-education-hq': '爱华教育总部',
    'armani-art-apartment-clubhouse': '阿玛尼艺术公寓会所',
    'bihai-building': '广东温泉宾馆碧海楼',
    'black-cow-villa': '黑牛别墅',
    'camellia-forest-park': '山茶花森林公园 / 室内升级',
    'congdu-international-manor-villa': '从都国际庄园别墅',
    'dongguan-palm-garden-villa': '东莞棕榈园别墅',
    'east-tower-office': '东塔办公室',
    'eko-46f-office': 'EKO 46层办公室',
    'eko-cambodia-factory-architecture': 'EKO 柬埔寨工厂建筑',
    'eko-headquarters-office': 'EKO 总部办公室',
    'eko-jiangmen-factory-architecture': 'EKO 江门工厂建筑',
    'eko-villa-clubhouse': '鼎宏俱乐部会所',
    'foshan-sofitel-hotel-suites': '佛山索菲特酒店套房',
    'german-aeg-exhibition-hall': '德国 AEG 展厅',
    'guangzhou-conrad-hotel-rooms': '广州康莱德酒店客房',
    'guangzhou-huayuan-office': '广州华苑园林办公室',
    'guangzhou-luhu-mingxuan-villa-01': '广州麓湖名轩别墅',
    'guangzhou-nansha-yacht-club': '广州南沙游艇会',
    'guangzhou-private-residence-2021': '广州私宅',
    'haizhu-1918-industrial-park': '海珠 1918 产业园',
    'hong-kong-villa': '香港别墅',
    'hubin-hotel': '广东温泉宾馆湖滨楼',
    'huidong-medical-center': '中山大信医疗中心',
    'longyuehang-office': '龙粤行办公室',
    'mj-physical-examination-center': 'MJ 体检中心',
    'nanxi-river-yantou': '楠溪江岩头改造',
    'pazhou-no1-detached-villa': '琶洲壹号独栋别墅 F',
    'pazhou-no1-villa-02': '琶洲壹号独栋别墅 B',
    'qilongshan-tourist-resort': '祁龙山旅游度假区',
    'qingxi-villa': '清溪别墅',
    'sanlitun-intercontinental-hotel-lobby': '三里屯洲际酒店大堂',
    'shanghai-intercontinental-hotel-banquet': '上海洲际酒店宴会厅',
    'shenzhen-china-resources-show-flat': '深圳华润样板间',
    'shenzhen-hyatt-hotel-lobby': '深圳君悦酒店大堂',
    'shenzhen-nanshan-marriott-hotel-dining': '深圳南山万豪酒店餐厅',
    'shenzhen-qiaocheng-no1-villa-01': '深圳侨城壹号大平层',
    'shenzhen-shajing-jiaotang-garden-1602': '深圳茭塘花园',
    'shunde-liang-villa': '顺德梁宅独栋',
    'taiguhui-office': '太古汇办公室',
    'taohua-spring-art-town': '桃花源艺术小镇',
    'tiande-plaza-42f': '天德广场',
    'tianmu-lake-wei-hotel-rooms': '天目湖 WEI 酒店客房',
    'trumpchi-ground-floor': 'Trumpchi 首层',
    'trumpchi-special-store': 'Trumpchi 专卖店',
    'vanke-crystal-city-villa-01': '万科水晶城别墅',
    'xiamen-luxury-collection-hotel-restaurant': '厦门豪华精选酒店餐厅',
    'xian-hualuxe-intercontinental-hotel': '西安华邑洲际酒店',
    'xinghewan-huixin-garden-5-1701': '星河湾汇心花园',
    'zhonglv-jiulonghu-villa': '中旅玖珑湖别墅',
    'zhonglv-rose-lake-detached-villa': '中旅玫瑰湖独栋别墅',
    'zhuhai-baikang-ningqiaowan-medical-education': '珠海百康宁桥湾医疗教育',
    'zhuhai-intercontinental-hotel-lobby': '珠海洲际酒店大堂'
  };
  const archiveTitleEn = {
    'bihai-building': 'Guangdong Hot Spring Hotel Bihai Building',
    'eko-villa-clubhouse': 'Dinghong Clubhouse',
    'guangzhou-huayuan-office': 'Guangzhou Huayuan Landscape Office',
    'hubin-hotel': 'Guangdong Hot Spring Hotel Hubin Building',
    'huidong-medical-center': 'Zhongshan Daxin Medical Center',
    'longyuehang-office': 'Longyuehang Office',
    'nanxi-river-yantou': 'Nanxi River Yantou Renovation',
    'shenzhen-shajing-jiaotang-garden-1602': 'Shenzhen Jiaotang Garden',
    'shunde-liang-villa': 'Shunde Liang Detached Residence'
  };
  const pageTitles = {
    home: { en: 'HSD / HANS DESIGN | Light Court Sequence', cn: 'HSD / HANS DESIGN / 翰 · 设计｜光庭序列' },
    projects: { en: 'Projects | HSD / HANS DESIGN', cn: '项目｜HSD / HANS DESIGN / 翰 · 设计' },
    studio: { en: 'About | HSD / HANS DESIGN', cn: '关于我｜HSD / HANS DESIGN / 翰 · 设计' },
    services: { en: 'Practice | HSD / HANS DESIGN', cn: '设计方法｜HSD / HANS DESIGN / 翰 · 设计' },
    contact: { en: 'Contact | HSD / HANS DESIGN', cn: '联系｜HSD / HANS DESIGN / 翰 · 设计' },
    privacy: { en: 'Privacy | HSD / HANS DESIGN', cn: '隐私｜HSD / HANS DESIGN / 翰 · 设计' },
    '404': { en: '404 | HSD / HANS DESIGN', cn: '404｜HSD / HANS DESIGN / 翰 · 设计' }
  };

  let language = 'cn';
  let lastProjectTrigger = null;
  let activeProjects = selectedProjects;
  let activeIndex = 0;
  let archiveProjects = [];
  let currentFilter = 'all';
  const stories = window.HSD_STORIES || {};
  const curatedIds = ['zhonglv-jiulonghu-villa', 'zhonglv-rose-lake-detached-villa', 'shenzhen-qiaocheng-no1-villa-01', 'guangzhou-luhu-mingxuan-villa-01', 'congdu-international-manor-villa'];
  const archiveTitleOverrides = new Map(selectedProjects.map((project) => [project.id, project.title]));

  try {
    const saved = window.localStorage.getItem('hsd-light-court-language');
    if (saved === 'en' || saved === 'cn') language = saved;
  } catch (_) {}

  function localText(value) {
    if (value && typeof value === 'object') return value[language] || value.en || value.cn || '';
    return value || '';
  }

  function setLanguage(nextLanguage, persist = true) {
    language = nextLanguage === 'en' ? 'en' : 'cn';
    root.dataset.lang = language;
    root.lang = language === 'cn' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-cn]').forEach((element) => {
      element.textContent = element.dataset[language];
    });
    document.querySelectorAll('[data-aria-en][data-aria-cn]').forEach((element) => {
      element.setAttribute('aria-label', element.dataset[language === 'en' ? 'ariaEn' : 'ariaCn']);
    });
    document.querySelectorAll('[data-alt-en][data-alt-cn]').forEach((image) => {
      image.alt = image.dataset[`alt${language === 'en' ? 'En' : 'Cn'}`];
    });
    languageButtons.forEach((button) => {
      button.textContent = language === 'cn' ? 'EN' : '中文';
      button.setAttribute('aria-label', language === 'cn' ? 'Switch to English' : '切换为中文');
    });
    const title = pageTitles[body.dataset.page];
    if (title) document.title = title[language];
    if (persist) {
      try { window.localStorage.setItem('hsd-light-court-language', language); } catch (_) {}
    }
    renderFeatured();
    renderArchive();
    const dialog = document.querySelector('[data-project-dialog]');
    if (dialog?.open && activeProjects[activeIndex]) updateDialog(activeProjects[activeIndex], activeIndex, false);
    document.dispatchEvent(new CustomEvent('hsd:language')); 
  }

  languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(language === 'cn' ? 'en' : 'cn')));

  function installFounderHero() {
    if (body.dataset.page !== 'studio' || document.querySelector('.studio-founder-hero')) return;
    const originalHero = document.querySelector('.studio-hero');
    if (!originalHero) return;
    originalHero.querySelector('.studio-hero-meta')?.remove();
    const section = document.createElement('section');
    section.className = 'studio-founder-hero';
    section.setAttribute('aria-labelledby', 'studio-founder-title');
    const awardGallery = [
      ['assets/lossless/30910da05d29d77e9416.webp', 'iF Design Award 2024 证书', 'iF Design Award 2024 certificate', 2714, 3840],
      ['assets/lossless/9d25c3364e95a4ade867.webp', 'Red Dot Award 2022 证书', 'Red Dot Award 2022 certificate', 2619, 3668],
      ['assets/lossless/16688c6a65a5571f1ce0.webp', 'Good Design Award 2022 证书', 'Good Design Award 2022 certificate', 2431, 3840],
      ['assets/lossless/6c8198fc5dc7532ec6e8.webp', 'IDA Design Awards 2021 证书', 'IDA Design Awards 2021 certificate', 2379, 3220],
      ['assets/lossless/57a5383402deed420dec.webp', 'IDA Design Awards 2023 证书', 'IDA Design Awards 2023 certificate', 2715, 3840],
      ['assets/lossless/1e1e4896e3cb0b9d4f39.webp', 'APDC Design Awards 2022 证书', 'APDC Design Awards 2022 certificate', 2695, 3840],
      ['assets/lossless/99840584cf02dc1f6e47.webp', 'Architecture MasterPrize 2021 证书', 'Architecture MasterPrize 2021 certificate', 2836, 3840],
      ['assets/lossless/d555e7ada831e92b818a.webp', 'IAI Design Award 2023 证书', 'IAI Design Award 2023 certificate', 2507, 3840],
      ['assets/lossless/5add46cf22ed306a53a3.webp', 'Japan International Design Pioneer Award 2023 证书', 'Japan International Design Pioneer Award 2023 certificate', 2460, 3450],
      ['assets/lossless/257b8a4e67db121465c9.webp', 'MUSE Design Awards 2023 金奖证书：Vanke Crystal City Villa', 'MUSE Design Awards 2023 Gold Winner certificate: Vanke Crystal City Villa', 2718, 3840],
      ['assets/lossless/731037bc78cc609b19eb.webp', 'MUSE Design Awards 2023 金奖证书：EKO Intelligent Industrial Park', 'MUSE Design Awards 2023 Gold Winner certificate: EKO Intelligent Industrial Park', 1241, 1754],
      ['assets/lossless/16533a9377a43b8c72d1.webp', 'MUSE Design Awards 2023 推荐信', 'MUSE Design Awards 2023 recommendation letter', 1241, 1754],
      ['assets/lossless/c3550e97f0f5f8a6394e.webp', 'MUSE Design Awards 2023 金奖证书：GAC Trumpchi Lobby and Conference Center', 'MUSE Design Awards 2023 Gold Winner certificate: GAC Trumpchi Lobby and Conference Center', 1116, 1359],
      ['assets/lossless/d692db8df14cc4fe77a6.webp', 'APDC 亚太设计师证书', 'APDC designer certificate', 1886, 1287],
      ['assets/lossless/c9097675683269ea4fbf.webp', 'APDC 会员证书', 'APDC membership certificate', 1817, 2485],
      ['assets/lossless/03da7235dfb1a9894647.webp', 'WAD 世界青年设计师 2019 年度杰出设计师证书', 'WAD Outstanding Designer of 2019 certificate', 2634, 3599]
    ];
    const awardFigures = awardGallery.map(([file, altCn, altEn, width, height]) => `<figure class="studio-founder-award"><img src="${file}" alt="${altCn}" data-alt-cn="${altCn}" data-alt-en="${altEn}" width="${width}" height="${height}"></figure>`).join('');
    section.innerHTML = `
      <div class="studio-founder-copy">
        <div class="studio-founder-title-row">
          <div>
            <h1 id="studio-founder-title" data-en="HINS CHAN" data-cn="陈翰翔">陈翰翔</h1>
            <p class="studio-founder-role" data-en="Architectural &amp; Interior Designer" data-cn="建筑及室内设计师">建筑及室内设计师</p>
          </div>
        </div>
        <div class="studio-founder-portrait"><img src="assets/lossless/7abdd8f37c82c1d23e97.webp" alt="陈翰翔个人肖像" data-alt-cn="陈翰翔个人肖像" data-alt-en="Portrait of Hins Chan" width="1280" height="1920"></div>
        <p class="studio-founder-perspective"><span data-cn="从建筑看见整体，" data-en="See the whole through architecture,">从建筑看见整体，</span><span data-cn="从日常理解细节。" data-en="the detail through daily life.">从日常理解细节。</span></p>
        <p class="studio-founder-lead" data-en="Graduate of the Architecture Department, South China University of Technology\nPractice across architecture, interiors and place-making\nPreviously with TSD New York\nHuangpu Architectural Design Institute (Class A) and Guangdong Jimei Design\nFocused on the coordination of function, experience, spatial order and expression" data-cn="毕业于华南理工大学建筑系\n设计实践涵盖建筑、室内与整体场所环境\n曾供职于美国纽约 TSD 设计事务所\n广州黄埔建筑设计院（甲级）及广东集美设计公司\n关注功能、体验、空间秩序与整体表达的协同">毕业于华南理工大学建筑系<br>设计实践涵盖建筑、室内与整体场所环境<br>曾供职于美国纽约 TSD 设计事务所<br>广州黄埔建筑设计院（甲级）及广东集美设计公司<br>关注功能、体验、空间秩序与整体表达的协同</p>
        <div class="studio-founder-recognition">
          <p class="eyebrow" data-en="SELECTED RECOGNITION" data-cn="精选获奖与资历">精选获奖与资历</p>
          <ul>
            <li data-en="iF Design Award · Winner · 2024" data-cn="iF Design Award · Winner · 2024">iF Design Award · Winner · 2024</li>
            <li data-en="MUSE Design Awards · 3 × Gold Winner · 2023" data-cn="MUSE Design Awards · 3 项金奖 · 2023">MUSE Design Awards · 3 项金奖 · 2023</li>
            <li data-en="IDA Design Awards · Gold / Silver · 2021 / 2023" data-cn="IDA Design Awards · 金奖 / 银奖 · 2021 / 2023">IDA Design Awards · 金奖 / 银奖 · 2021 / 2023</li>
            <li data-en="IAI Design Award · Gold · 2022 / 2023" data-cn="IAI Design Award · 金奖 · 2022 / 2023">IAI Design Award · 金奖 · 2022 / 2023</li>
            <li data-en="Japan IDPA · Professional Award / Pioneer · 2023" data-cn="Japan IDPA · 专业奖 / 先锋奖 · 2023">Japan IDPA · 专业奖 / 先锋奖 · 2023</li>
            <li data-en="Red Dot Winner · 2022" data-cn="Red Dot Winner · 2022">Red Dot Winner · 2022</li>
            <li data-en="Good Design Award · 2022" data-cn="Good Design Award · 2022">Good Design Award · 2022</li>
            <li data-en="APDC Design Awards · Honorable Award · 2022" data-cn="APDC Design Awards · 优秀奖 · 2022">APDC Design Awards · 优秀奖 · 2022</li>
            <li data-en="Architecture MasterPrize · Honorable Mention · 2021" data-cn="Architecture MasterPrize · 荣誉奖 · 2021">Architecture MasterPrize · 荣誉奖 · 2021</li>
            <li data-en="WAD World Youth Designer · Outstanding Designer of 2019" data-cn="WAD 世界青年设计师 · 2019 年度杰出设计师">WAD 世界青年设计师 · 2019 年度杰出设计师</li>
            <li data-en="APDC · Member Certificate / Senior Interior Designer" data-cn="APDC · 认证会员证书 / 室内设计（高级）设计师">APDC · 认证会员证书 / 室内设计（高级）设计师</li>
            <li data-en="National Registered Senior Interior Designer" data-cn="国家注册高级室内设计师">国家注册高级室内设计师</li>
          </ul>
        </div>
      </div>
      <div class="studio-founder-visual" role="group" tabindex="0" aria-label="获奖与资历图片">
        ${awardFigures}
      </div>`;
    originalHero.before(section);
  }
  installFounderHero();

  const header = document.querySelector('[data-site-header]');
  function installTransparentBrandLockups() {
    const lockup = `
      <span class="brand-lockup brand-lockup-desktop" aria-hidden="true">
        <img class="brand-logo-main brand-logo-black" src="assets/brand/hsd-main-horizontal-black.svg" alt="">
        <img class="brand-logo-main brand-logo-reverse" src="assets/brand/hsd-main-horizontal-reverse.svg" alt="">
      </span>`;
    document.querySelectorAll('.brand .brand-desktop').forEach((current) => current.outerHTML = lockup);
  }
  installTransparentBrandLockups();
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  function keepFocusIn(event, container) {
    if (event.key !== 'Tab' || !container) return;
    const focusable = [...container.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((element) => element.getClientRects().length);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  function setMenu(open) {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenu.inert = !open;
    body.classList.toggle('menu-open', open);
    document.querySelector('main')?.toggleAttribute('inert', open);
    document.querySelector('.site-footer')?.toggleAttribute('inert', open);
    if (open) window.setTimeout(() => mobileMenu.querySelector('a')?.focus(), 180);
    else menuButton.focus();
  }
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (menuButton?.getAttribute('aria-expanded') === 'true') keepFocusIn(event, mobileMenu);
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') setMenu(false);
  });

  function projectCard(project, index) {
    const story = stories[project.id];
    const isLead = project.id === curatedIds[0] && body.dataset.page === 'home';
    const image = story?.cover || project.thumbnail || project.cover;
    return `<button class="project-card ${isLead ? 'editorial-lead' : ''}" type="button" data-project-id="${project.id}" aria-label="${localText(project.title)}">
      <span class="project-card-media"><img src="${image}" alt="${localText(project.title)}" width="1800" height="1200" loading="lazy" decoding="async"></span>
      <span class="project-card-copy"><span class="card-no">${String(index + 1).padStart(2,'0')} / ${language === 'cn' ? '住宅阅读' : 'RESIDENCE'}</span><h3>${localText(project.title)}</h3><span class="card-premise">${story ? localText(story.premise) : ''}</span><span class="card-read">${language === 'cn' ? '进入空间' : 'Explore the space'} <i aria-hidden="true">↗</i></span></span></button>`;
  }
  function renderFeatured() {
    document.querySelectorAll('[data-featured-grid]').forEach((grid) => {
      const curated = curatedIds.map(id => selectedProjects.find(p => p.id === id)).filter(Boolean);
      const collection = grid.dataset.curation === 'lead' ? curated.slice(0,1) : grid.dataset.curation === 'support' ? selectedProjects.filter(p => p.id !== curatedIds[0]).slice(0,6) : selectedProjects;
      grid.innerHTML = collection.map((p,i)=>projectCard(p, grid.dataset.curation === 'support' ? i+1 : i)).join('');
    });
  }

  const archiveGrid = document.querySelector('[data-archive-grid]');
  const archiveStatus = document.querySelector('[data-archive-status]');
  const archiveSection = archiveGrid?.closest('.archive-section');
  const archiveFilters = [...document.querySelectorAll('[data-archive-filters] button')];
  function normalizedCategory(category) {
    return ['residential', 'hospitality', 'workplace'].includes(category) ? category : 'other';
  }
  function setArchiveState(state, message) {
    if (!archiveGrid) return;
    const ready = state === 'ready';
    archiveGrid.dataset.state = state;
    archiveGrid.setAttribute('aria-busy', String(!ready));
    archiveSection?.setAttribute('aria-busy', String(!ready));
    archiveFilters.forEach((button) => { button.disabled = !ready; });
    if (archiveStatus) {
      archiveStatus.dataset.state = state;
      archiveStatus.textContent = message;
    }
  }
  function renderArchive() {
    if (!archiveGrid || !archiveProjects.length) return;
    const visible = currentFilter === 'all' ? archiveProjects : archiveProjects.filter((project) => normalizedCategory(project.category) === currentFilter);
    archiveGrid.innerHTML = visible.map((project) => `
      <button class="archive-card" type="button" data-archive-id="${project.id}" aria-label="${localText(project.title)}">
        <figure><div class="archive-image"><img src="${project.cover}" alt="${localText(project.title)}" width="1200" height="900" loading="lazy"></div>
        <figcaption><h3>${localText(project.title)}</h3><p class="archive-meta"><span>${categoryLabels[normalizedCategory(project.category)][language]}</span><span class="archive-source-status"> · ${truthLabels[project.truthStatus]?.[language] || truthLabels['source-case'][language]}</span></p></figcaption></figure>
      </button>`).join('');
    setArchiveState('ready', language === 'cn' ? `显示 ${visible.length} / ${archiveProjects.length} 个项目` : `Showing ${visible.length} of ${archiveProjects.length} projects`);
    archiveGrid.classList.add('is-updating');
    window.setTimeout(() => archiveGrid.classList.remove('is-updating'), 180);
  }

  async function loadArchive() {
    if (!archiveGrid) return;
    setArchiveState('loading', language === 'cn' ? '正在读取完整来源档案…' : 'Loading the complete source archive…');
    archiveGrid.innerHTML = `<p class="archive-loading">${language === 'cn' ? '正在读取档案…' : 'Loading archive…'}</p>`;
    try {
      const response = await fetch('assets/cases/index.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      archiveProjects = payload.projects.map((project) => ({
        id: project.slug,
          title: archiveTitleOverrides.get(project.slug) || { en: archiveTitleEn[project.slug] || project.title, cn: archiveTitleCn[project.slug] || project.title },
        category: project.category || 'other',
        cover: project.cover,
        gallery: project.images || [project.cover],
        truthStatus: project.reconstructionCount ? 'source-case-plus-reconstruction' : (project.conceptSupplementCount ? 'source-case-plus-concepts' : 'source-case'),
        reconstructionNote: project.reconstructionNote,
        reconstructionNoteEn: project.reconstructionNoteEn,
        description: project.reconstructionNote ? { en: project.reconstructionNoteEn, cn: project.reconstructionNote } : {
          en: project.conceptSupplementCount ? 'Source-case material retained in the complete archive, with clearly marked concept supplements added for visual audit. Concept supplements are not factual original project evidence.' : 'A project gallery edited from the available material.',
          cn: project.conceptSupplementCount ? '完整档案中的来源案例素材，另含已明确标记的概念补图，用于视觉审计；概念补图不作为真实原始项目证据。' : '根据现有项目资料整理的作品图集。'
        }
      }));
      renderArchive();
      restoreProjectFromUrl();
    } catch (_) {
      const message = language === 'cn' ? '完整档案暂时无法读取。精选项目仍可正常浏览。' : 'The complete archive could not be loaded. Selected projects remain available.';
      archiveGrid.innerHTML = `<p class="archive-error">${message}</p>`;
      setArchiveState('error', message);
    }
  }

  archiveFilters.forEach((button) => {
    const activateFilter = () => {
      currentFilter = button.dataset.filter;
      archiveFilters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderArchive();
      button.focus();
    };
    button.addEventListener('click', activateFilter);
    button.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      button.click();
    });
  });

  const dialog = document.querySelector('[data-project-dialog]');
  const dialogMedia = dialog?.querySelector('[data-dialog-media]');
  const dialogTitle = dialog?.querySelector('[data-dialog-title]');
  const dialogDescription = dialog?.querySelector('[data-dialog-description]');
  const dialogNote = dialog?.querySelector('[data-dialog-note]');
  const dialogStatus = dialog?.querySelector('[data-dialog-status]');
  const dialogIndex = dialog?.querySelector('[data-dialog-index]');
  let dialogGalleryIndex = 0;

  function renderDialogGallery(project, requestedIndex = 0) {
    if (!dialogMedia || !project) return;
    const gallery = project.gallery?.length ? project.gallery : [project.cover];
    dialogGalleryIndex = (requestedIndex + gallery.length) % gallery.length;
    const name = localText(project.title);
    const previous = language === 'cn' ? '上一张图库图片' : 'Previous image';
    const next = language === 'cn' ? '下一张图库图片' : 'Next image';
    const zoom = language === 'cn' ? '放大查看' : 'Enlarge image';
    dialogMedia.innerHTML = `<div class="dialog-gallery" data-dialog-gallery>
      <div class="dialog-gallery-viewport" data-dialog-gallery-viewport tabindex="0" aria-label="${language === 'cn' ? '图库，左右方向键翻页' : 'Gallery, use left and right arrow keys'}">
        <img data-dialog-gallery-image src="${gallery[dialogGalleryIndex]}" alt="${name} · ${dialogGalleryIndex+1}" decoding="async">
        <button type="button" class="gallery-zoom" data-zoom-image="${gallery[dialogGalleryIndex]}" data-zoom-label="${name}">${zoom} ↗</button>
      </div>
      <div class="gallery-controls"><button class="dialog-gallery-button" data-dialog-gallery-prev aria-label="${previous}">←</button><span aria-live="polite" data-dialog-gallery-index>${String(dialogGalleryIndex+1).padStart(2,'0')} / ${String(gallery.length).padStart(2,'0')}</span><button class="dialog-gallery-button" data-dialog-gallery-next aria-label="${next}">→</button></div>
      <div class="gallery-thumbnails" aria-label="${language === 'cn' ? '图片缩略图' : 'Image thumbnails'}">${gallery.map((src,i)=>`<button type="button" data-gallery-index="${i}" aria-label="${language === 'cn' ? '查看第' : 'View image '}${i+1}${language === 'cn' ? '张图片' : ''}" aria-pressed="${i===dialogGalleryIndex}"><img src="${src}" alt="" loading="lazy" decoding="async"></button>`).join('')}</div>
    </div>`;
    const move = n => {renderDialogGallery(project, dialogGalleryIndex+n); dialogMedia.querySelector(n>0 ? '[data-dialog-gallery-next]' : '[data-dialog-gallery-prev]').focus({preventScroll:true});};
    dialogMedia.querySelector('[data-dialog-gallery-prev]').onclick=()=>move(-1);
    dialogMedia.querySelector('[data-dialog-gallery-next]').onclick=()=>move(1);
    dialogMedia.querySelectorAll('[data-gallery-index]').forEach(b=>b.onclick=()=>{ const i=Number(b.dataset.galleryIndex); const scroll=dialogMedia.querySelector('.gallery-thumbnails').scrollLeft; renderDialogGallery(project,i); dialogMedia.querySelector('.gallery-thumbnails').scrollLeft=scroll; dialogMedia.querySelector(`[data-gallery-index="${i}"]`).focus({preventScroll:true}); });
    const stage=dialogMedia.querySelector('[data-dialog-gallery-viewport]');
    let start=null;
    stage.addEventListener('touchstart',e=>{start={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
    stage.addEventListener('touchend',e=>{if(!start)return; const x=e.changedTouches[0].clientX-start.x,y=e.changedTouches[0].clientY-start.y;start=null;if(Math.abs(x)>70 && Math.abs(x)>Math.abs(y)*1.5) move(x<0?1:-1);},{passive:true});
    stage.addEventListener('touchcancel',()=>start=null,{passive:true});
    addImageFallback(dialogMedia.querySelector('[data-dialog-gallery-image]'));
  }

  function renderStory(project) {
    dialog.querySelector('.case-reading')?.remove();
    const story = stories[project.id];
    if (!story) return;
    const section=document.createElement('section');
    section.className='case-reading';
    section.innerHTML=`<header class="case-reading-heading"><p class="eyebrow">${language==='cn' ? '空间阅读' : 'SPATIAL READING'}</p><h3>${localText(story.premise)}</h3><p>${language==='cn' ? '以下为基于现有画面的设计解读。' : 'A design reading of the available imagery.'}</p></header><div class="case-reading-grid">${story.sections.map((s,i)=>`<article><span class="eyebrow">0${i+1} / ${localText(s.title)}</span><p>${localText(s.text)}</p></article>`).join('')}</div><div class="case-related"><span>${language==='cn'?'延续这一观察':'Continue this reading'}</span>${selectedProjects.filter(p=>p.id!==project.id && stories[p.id]).slice(0,2).map(p=>`<button type="button" data-project-id="${p.id}"><img src="${p.cover}" alt="" loading="lazy"><span>${localText(p.title)} ↗</span></button>`).join('')}</div>`;
    dialog.querySelector('.dialog-shell').append(section);
  }

  function stepDialogGallery(direction) {
    const project = activeProjects[activeIndex];
    if (project) renderDialogGallery(project, dialogGalleryIndex + direction, true);
  }

  function updateDialog(project, index, animate = true, direction = 1) {
    if (!dialog || !project) return;
    const apply = () => {
      dialogTitle.textContent = localText(project.title);
      dialogDescription.textContent = stories[project.id] ? localText(stories[project.id].premise) : (language === 'cn' ? '空间图集' : 'Project gallery');
      if (dialogNote) dialogNote.textContent = project.reconstructionNote ? localText({ en: project.reconstructionNoteEn, cn: project.reconstructionNote }) : '';
      dialogStatus.textContent = truthLabels[project.truthStatus]?.[language] || truthLabels['source-case'][language];
      dialogIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(activeProjects.length).padStart(2, '0')}`;
      renderDialogGallery(project, 0, false);
      renderStory(project);
      renderProjectActions(project);
      renderProjectFacts(project);
    };
    const canAnimate = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof dialogMedia.animate === 'function';
    if (!canAnimate) { apply(); return; }
    const offset = `${direction * 16}px`;
    Promise.all([
      dialogMedia.animate([{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: `translateX(${-direction * 10}px)` }], { duration: 160, easing: 'cubic-bezier(0.77,0,0.175,1)' }).finished,
      dialog.querySelector('.dialog-copy').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: 'ease-in' }).finished
    ]).then(() => {
      apply();
      dialogMedia.animate([{ opacity: 0, transform: `translateX(${offset})` }, { opacity: 1, transform: 'translateX(0)' }], { duration: 420, easing: 'cubic-bezier(0.16,1,0.3,1)' });
      dialog.querySelector('.dialog-copy').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: 'cubic-bezier(0.16,1,0.3,1)' });
    });
  }

  function renderProjectFacts(project) {
    dialog.querySelector('.project-facts')?.remove();
    const facts=window.HSD_PROJECT_FACTS?.[project.id];if(!facts)return;
    const dl=document.createElement('dl');dl.className='project-facts';
    for(const [key,zh,en] of [['role','设计角色','Role'],['scope','参与范围','Scope'],['status','项目状态','Status']]) {
      const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');
      dt.textContent=language==='cn'?zh:en;dd.textContent=localText(facts[key]);row.append(dt,dd);dl.append(row);
    }
    dialog.querySelector('.dialog-copy').insertBefore(dl,dialogNote);
  }
  function renderProjectActions(project) {
    dialog.querySelector('.project-actions')?.remove();
    const actions = document.createElement('div'); actions.className='project-actions';
    const share = document.createElement('button'); share.type='button'; share.textContent=language==='cn'?'复制案例链接':'Copy project link';
    const status=document.createElement('p'); status.setAttribute('role','status');
    share.addEventListener('click',async()=>{
      const url=new URL('projects.html',location.href);url.searchParams.set('project',project.id);
      try { await copyText(url.href); status.textContent=language==='cn'?'案例链接已复制':'Project link copied'; }
      catch { status.textContent=url.href; }
    });
    const enquire=document.createElement('a');enquire.href='contact.html?project='+encodeURIComponent(project.id);enquire.textContent=language==='cn'?'联系我 ↗':'Contact me ↗';
    actions.append(share,enquire,status);dialog.querySelector('.dialog-copy').append(actions);
  }
  function restoreProjectFromUrl() {
    if(!dialog)return;
    const id=new URL(location.href).searchParams.get('project');
    if(!id){if(dialog.open)closeProject();return;}
    const selected=selectedProjects.find(p=>p.id===id);
    const archived=archiveProjects.find(p=>p.id===id);
    const project=selected||archived;
    if(project && (!dialog.open || activeProjects[activeIndex]?.id!==id))openProject(project,selected?selectedProjects:archiveProjects,null,true);
  }
  window.addEventListener('popstate',restoreProjectFromUrl);

  function openProject(project, collection, trigger, fromUrl = false) {
    if (!dialog) return;
    if (!fromUrl) {
      const url = new URL(location.href); url.searchParams.set("project", project.id);
      history[dialog.open ? "replaceState" : "pushState"]({hsdProject:true}, "", url);
    }
    activeProjects = collection;
    activeIndex = Math.max(0, collection.findIndex((item) => item.id === project.id));
    if (!dialog.contains(trigger)) lastProjectTrigger = trigger;
    updateDialog(project, activeIndex, false);
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    body.classList.add('dialog-open');
    window.setTimeout(() => dialog.querySelector('[data-dialog-close]')?.focus(), 40);
  }
  function closeProject() {
    if (!dialog?.open) return;
    const url = new URL(location.href);
    if (url.searchParams.has("project")) { url.searchParams.delete("project"); history.replaceState(null,"",url); }
    dialog.close();
    body.classList.remove('dialog-open');
    window.setTimeout(() => lastProjectTrigger?.focus(), 40);
  }
  function stepProject(direction) {
    if (!activeProjects.length) return;
    activeIndex = (activeIndex + direction + activeProjects.length) % activeProjects.length;
    const url = new URL(location.href); url.searchParams.set("project",activeProjects[activeIndex].id); history.replaceState(history.state,"",url);
    updateDialog(activeProjects[activeIndex], activeIndex, false, direction);
  }

  document.addEventListener('click', (event) => {
    const selectedTrigger = event.target.closest('[data-project-id]');
    if (selectedTrigger) {
      event.preventDefault();
      const project = selectedProjects.find((item) => item.id === selectedTrigger.dataset.projectId);
      if (project) openProject(project, selectedProjects, selectedTrigger);
      return;
    }
    const archiveTrigger = event.target.closest('[data-archive-id]');
    if (archiveTrigger) {
      const visibleCollection = currentFilter === 'all' ? archiveProjects : archiveProjects.filter((item) => normalizedCategory(item.category) === currentFilter);
      const project = visibleCollection.find((item) => item.id === archiveTrigger.dataset.archiveId);
      if (project) openProject(project, visibleCollection, archiveTrigger);
    }
  });
  dialog?.querySelector('[data-dialog-close]')?.addEventListener('click', closeProject);
  dialog?.querySelector('[data-project-prev]')?.addEventListener('click', () => stepProject(-1));
  dialog?.querySelector('[data-project-next]')?.addEventListener('click', () => stepProject(1));
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) closeProject(); });
  dialog?.addEventListener('cancel', (event) => { event.preventDefault(); closeProject(); });
  dialog?.addEventListener('close', () => body.classList.remove('dialog-open'));
  document.addEventListener('keydown', (event) => {
    if (!dialog?.open || document.querySelector('.image-lightbox[open]')) return;
    keepFocusIn(event, dialog);
    if (event.key === 'Escape') {
      event.preventDefault();
      closeProject();
      return;
    }
    if (event.target.closest('[data-dialog-gallery]') && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      stepDialogGallery(event.key === 'ArrowRight' ? 1 : -1);
      return;
    }
    if (event.key === 'ArrowLeft') stepProject(-1);
    if (event.key === 'ArrowRight') stepProject(1);
  });

  function addImageFallback(image) {
    image.addEventListener('error', () => {
      const figure = image.closest('figure') || image.parentElement;
      image.remove();
      const message = document.createElement('p');
      message.className = 'image-fallback';
      message.setAttribute('role', 'status');
      message.textContent = language === 'cn' ? '图片暂时无法读取' : 'Image unavailable';
      figure?.append(message);
    }, { once: true });
  }
  document.querySelectorAll('img').forEach(addImageFallback);

  async function copyText(value) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value);
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    const copied = document.execCommand('copy');
    area.remove();
    if (!copied) throw new Error('Copy command unavailable');
  }
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const original = language === 'cn' ? button.querySelector('span')?.dataset.cn : button.querySelector('span')?.dataset.en;
      const label = button.querySelector('span');
      label?.setAttribute('aria-live', 'polite');
      try {
        await copyText(button.dataset.copy);
        button.classList.add('is-copied');
        if (label) label.textContent = language === 'cn' ? '已复制 HSD_Design618' : 'Copied HSD_Design618';
        window.setTimeout(() => { button.classList.remove('is-copied'); if (label) label.textContent = original; }, 1400);
      } catch (_) {
        button.classList.add('is-copy-fallback');
        if (label) label.textContent = language === 'cn' ? '请手动复制 HSD_Design618' : 'Copy HSD_Design618 manually';
        window.setTimeout(() => { button.classList.remove('is-copy-fallback'); if (label) label.textContent = original; }, 2600);
      }
    });
  });

  renderFeatured();
  loadArchive();
  setLanguage(language, false);
  restoreProjectFromUrl();
  const fusionScript = document.createElement('script');
  fusionScript.src = 'modules/fusion-interactions.js?v=interaction-20260912';
  fusionScript.defer = true;
  document.head.append(fusionScript);
})();

