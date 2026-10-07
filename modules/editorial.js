(() => {
  const language = () => document.documentElement.dataset.lang === 'en' ? 'en' : 'cn';
  const local = value => value[language()];
  let readings = [
    {title:{cn:'A / 庭院与日光',en:'A / Courtyard and daylight'},text:{cn:'透过大幅玻璃，庭院中的植物与石墙成为起居空间的背景。观察日光落在地面与座椅上的位置，能读出室内与室外的联系。',en:'Through broad glazing, planting and a stone wall become the backdrop to the living room. Follow daylight across the floor and seating to read the connection between inside and outside.'}},
    {title:{cn:'B / 围坐与交流',en:'B / Gathering and conversation'},text:{cn:'沙发、单椅与茶几形成围坐关系。较低的家具让视线继续向庭院延伸，也为人与人之间的交流留出开放的空间。',en:'Sofas, chairs and tables define a place to gather. Their low profile keeps the view toward the courtyard open and leaves space for conversation.'}},
    {title:{cn:'C / 材料与尺度',en:'C / Material and scale'},text:{cn:'浅色地面、木饰面与石材呈现不同的肌理。看一看硬质墙面与柔软家具相遇的位置，空间的温度也藏在这些对照之中。',en:'Pale flooring, timber and stone reveal different textures. Look at the meeting of solid walls and soft furnishings: these contrasts contribute to the character of the room.'}}
  ];
  const initialReadings = readings;
  document.addEventListener('hsd:comparison', event => {
    const project = event.detail;
    const primary = project.id === 'zhonglv-jiulonghu-villa';
    const story = window.HSD_STORIES?.[project.id];
    readings = primary ? initialReadings : (story?.sections || []).slice(0,3).map((section,i)=>({title:{cn:`${'ABC'[i]} / ${section.title.cn}`,en:`${'ABC'[i]} / ${section.title.en}`},text:section.text}));
    const hint = document.querySelector('.reading-tools > span');
    if(hint) { hint.dataset.cn = primary ? '拖动分界线，或点选画面代号' : '拖动分界线，比较两幅画面'; hint.dataset.en = primary ? 'Drag the divider or select a lettered detail' : 'Drag the divider to compare the two views'; hint.textContent = hint.dataset[language()]; }
    const leftTag = document.querySelector('.comparison-tag-left');
    if(leftTag) { leftTag.dataset.cn = primary ? '空间基底示意' : '对比视图'; leftTag.dataset.en = primary ? 'SHELL STUDY' : 'COMPARISON VIEW'; leftTag.textContent = leftTag.dataset[language()]; }
    activeReading = 0;
    document.querySelectorAll('[data-reading]').forEach(button => button.hidden = !primary);
    const link = document.querySelector('.comparison-editorial-copy > .text-link');
    if(link)link.dataset.projectId = project.id;
    renderReading();
  });
  let activeReading = 0;
  const panel = document.querySelector('.reading-panel');
  function renderReading() {
    if (!panel) return;
    panel.innerHTML = readings.map((reading,index) => `<article class="${index === activeReading ? "is-active" : ""}"><h3>${local(reading.title)}</h3><p>${local(reading.text)}</p></article>`).join("");
    document.querySelectorAll('[data-reading]').forEach(button => button.setAttribute('aria-expanded', String(Number(button.dataset.reading) === activeReading)));
  }
  document.querySelectorAll('[data-reading]').forEach(button => button.addEventListener('click', () => { activeReading = Number(button.dataset.reading); renderReading(); }));
  document.addEventListener('hsd:language', renderReading);
  renderReading();

  const comparison = document.querySelector('.comparison-section');
  if (comparison) {
    const copy = document.createElement('div'); copy.className = 'comparison-editorial-copy';
    const media = document.createElement('div'); media.className = 'comparison-editorial-media';
    const tools = comparison.querySelector('.reading-tools');
    copy.append(comparison.querySelector('.section-heading'), panel, tools.querySelector('a'), comparison.querySelector('.reading-disclosure'));
    media.append(comparison.querySelector('.comparison-frame'), tools);
    comparison.append(copy, media);
    const controls=document.createElement('div');controls.className='comparison-controls';
    controls.innerHTML='<button type="button" data-comparison-prev aria-label="上一个对比案例 / Previous case">←</button><span><strong data-comparison-index></strong><em data-comparison-title></em></span><button type="button" data-comparison-next aria-label="下一个对比案例 / Next case">→</button>';
    media.append(controls);
  }

  // The native dialog keeps the full image separate from the article and restores focus.
  const zoom = document.createElement('dialog');
  zoom.className = 'image-lightbox';
  zoom.setAttribute('aria-label', '图片放大查看');
  zoom.innerHTML = '<button type="button" class="lightbox-close">关闭 ×</button><img alt=""><p></p>';
  document.body.append(zoom);
  let zoomTrigger = null;
  function closeZoom() { zoom.close(); zoomTrigger?.focus({preventScroll:true}); }
  zoom.querySelector('button').addEventListener('click',closeZoom);
  zoom.addEventListener('cancel',event => { event.preventDefault(); event.stopPropagation(); closeZoom(); });
  zoom.addEventListener('click',event => { if(event.target===zoom)closeZoom(); });
  document.addEventListener('click',event => {
    const trigger = event.target.closest('[data-zoom-image]');
    if(!trigger)return;
    event.preventDefault();
    zoomTrigger = trigger;
    const label = trigger.dataset.zoomLabel || '';
    zoom.querySelector('img').src = trigger.dataset.zoomImage;
    zoom.querySelector('img').alt = label;
    zoom.querySelector('p').textContent = label;
    zoom.querySelector('button').textContent = language()==='cn' ? '关闭 ×' : 'Close ×';
    zoom.setAttribute('aria-label', language()==='cn' ? '图片放大查看' : 'Enlarged image');
    zoom.showModal();
  });

  // Move the existing awards below the portrait, keeping every original certificate available.
  const founder = document.querySelector('.studio-founder-hero');
  if (founder) {
    let section = founder.querySelector('.editorial-awards');
    if (!section) {
      const portrait = founder.querySelector('.studio-founder-portrait');
      const recognition = founder.querySelector('.studio-founder-recognition');
      const awards = founder.querySelector('.studio-founder-visual');
      founder.append(portrait);
      section = document.createElement('section');
      section.className = 'editorial-awards section';
      section.innerHTML = '<div class="editorial-heading"><p class="eyebrow" data-cn="获奖与资历" data-en="RECOGNITION">获奖与资历</p></div>';
      if(recognition)section.append(recognition);
      if(awards){
        const details = document.createElement('details');
        details.className='award-disclosure';
        details.innerHTML='<summary><span data-cn="展开查看证书" data-en="View certificates">展开查看证书</span> +</summary>';
        awards.removeAttribute('tabindex');
        awards.querySelectorAll('figure').forEach(figure=>{
          const image=figure.querySelector('img');
          image.loading='lazy';
          const button=document.createElement('button');
          button.type='button';
          button.dataset.zoomImage=image.getAttribute('src');
          button.dataset.zoomLabel=image.alt;
          button.setAttribute('aria-label',image.alt);
          button.append(image);
          figure.append(button);
        });
        details.append(awards);section.append(details);
      }
      founder.querySelector('.studio-founder-copy').append(section);
    } else {
      const awards = section.querySelector('.studio-founder-visual');
      awards?.querySelectorAll('figure').forEach(figure=>{
        const image=figure.querySelector('img');
        if(!image || figure.querySelector('button'))return;
        image.loading='lazy';
        const button=document.createElement('button');
        button.type='button';
        button.dataset.zoomImage=image.getAttribute('src');
        button.dataset.zoomLabel=image.alt;
        button.setAttribute('aria-label',image.alt);
        button.append(image);
        figure.append(button);
      });
    }
    // Keep the source-language attributes on moved content.
    function localizeAwards(){section.querySelectorAll('[data-cn][data-en]').forEach(e=>e.textContent=e.dataset[language()]);section.querySelectorAll('[data-zoom-image]').forEach(b=>{b.dataset.zoomLabel=b.querySelector('img').alt;b.setAttribute('aria-label',b.dataset.zoomLabel);});}
    localizeAwards();document.addEventListener('hsd:language',localizeAwards);
  }
})();
