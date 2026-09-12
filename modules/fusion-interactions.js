(() => {
  const root = document.documentElement;
  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  const getLanguage = () => root.dataset.lang === 'en' ? 'en' : 'cn';

  function addRevealMotion() {
    const sections = [...document.querySelectorAll('main > section')];
    const animated = sections.filter((section) => !section.classList.contains('light-court-hero'));
    const staggered = document.querySelectorAll('[data-featured-grid] .project-card, [data-comparison] .comparison-frame, .method-list li, .service-steps article');
    staggered.forEach((item, index) => {
      item.classList.add('fusion-stagger');
      item.style.setProperty('--fusion-delay', `${Math.min(index, 8) * 55}ms`);
    });
    animated.forEach((section) => section.classList.add('fusion-reveal'));
    if (reducedQuery.matches || !('IntersectionObserver' in window)) {
      animated.forEach((section) => section.classList.add('fusion-reveal-in'));
      return;
    }
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('fusion-reveal-in');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.02 });
    animated.forEach((section) => observer.observe(section));
  }

  function addScrollNarrative() {
    if (reducedQuery.matches) return;
    const sections = [...document.querySelectorAll('main > section:not(.light-court-hero)')];
    if (!sections.length) return;
    sections.forEach((section) => section.dataset.scrollNarrative = 'true');
    let frame = null;
    const update = () => {
      frame = null;
      const viewport = window.innerHeight || 1;
      sections.forEach((section) => {
        const bounds = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport - bounds.top) / (viewport + bounds.height)));
        section.style.setProperty('--scroll-story', `${((progress - .5) * 18).toFixed(2)}px`);
      });
    };
    const schedule = () => { if (frame === null) frame = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();
  }

  function addHeroMotion() {
    const hero = document.querySelector('.light-court-hero');
    if (!hero) return;
    hero.dataset.fusionHero = 'true';
    const reset = () => {
      hero.style.setProperty('--fusion-x', '0px');
      hero.style.setProperty('--fusion-y', '0px');
      hero.style.setProperty('--fusion-light-x', '50%');
      hero.style.setProperty('--fusion-light-y', '42%');
    };
    hero.addEventListener('pointermove', (event) => {
      if (reducedQuery.matches || event.pointerType === 'touch') return;
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
      const y = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
      hero.style.setProperty('--fusion-x', `${(x * 42).toFixed(2)}px`);
      hero.style.setProperty('--fusion-y', `${(y * 28).toFixed(2)}px`);
      hero.style.setProperty('--fusion-light-x', `${(x * 100 + 50).toFixed(2)}%`);
      hero.style.setProperty('--fusion-light-y', `${(y * 100 + 50).toFixed(2)}%`);
    }, { passive: true });
    hero.addEventListener('pointerleave', reset, { passive: true });
    reset();
  }

  function addMagneticLinks() {
    if (!finePointerQuery.matches || reducedQuery.matches) return;
    document.querySelectorAll('.hero-cta, .service-link, .section-end .text-link').forEach((link) => {
      link.addEventListener('pointermove', (event) => {
        const bounds = link.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * 0.1;
        const y = (event.clientY - bounds.top - bounds.height / 2) * 0.1;
        link.style.setProperty('--magnetic-x', `${x.toFixed(2)}px`);
        link.style.setProperty('--magnetic-y', `${y.toFixed(2)}px`);
      }, { passive: true });
      link.addEventListener('pointerleave', () => {
        link.style.setProperty('--magnetic-x', '0px');
        link.style.setProperty('--magnetic-y', '0px');
      }, { passive: true });
    });
  }

  function addComparison() {
    const comparison = document.querySelector('[data-comparison]');
    const projects = Array.isArray(window.HSD_PROJECTS) ? window.HSD_PROJECTS.filter((project) => project.comparison?.length === 2) : [];
    if (!comparison || !projects.length) return;
    const frame = comparison.querySelector('[data-comparison-frame]');
    const base = comparison.querySelector('[data-comparison-base]');
    const overlay = comparison.querySelector('[data-comparison-overlay]');
    const range = comparison.querySelector('[data-comparison-range]');
    const title = comparison.querySelector('[data-comparison-title]');
    const indexLabel = comparison.querySelector('[data-comparison-index]');
    const previous = comparison.querySelector('[data-comparison-prev]');
    const next = comparison.querySelector('[data-comparison-next]');
    if (!frame || !base || !overlay || !range) return;
    let projectIndex = 0;
    const updateSplit = () => {
      const split = Number(range.value);
      comparison.style.setProperty('--comparison-split', `${split}%`);
      range.setAttribute('aria-valuenow', String(split));
    };
    const render = () => {
      const project = projects[projectIndex];
      const language = getLanguage();
      const comparisonImages = project.comparison || [project.gallery[0], project.gallery[1]];
      base.src = comparisonImages[0];
      overlay.src = comparisonImages[1];
      base.alt = language === 'cn' ? `${project.title.cn} 主视图` : `${project.title.en} main view`;
      overlay.alt = language === 'cn' ? `${project.title.cn} 对比视图` : `${project.title.en} comparison view`;
      if (title) title.textContent = language === 'cn' ? project.title.cn : project.title.en;
      if (indexLabel) indexLabel.textContent = `${String(projectIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
      document.dispatchEvent(new CustomEvent('hsd:comparison', {detail:project}));
      range.value = '52';
      updateSplit();
    };
    const step = (direction) => {
      projectIndex = (projectIndex + direction + projects.length) % projects.length;
      render();
    };
    range.addEventListener('input', updateSplit);
    previous?.addEventListener('click', () => step(-1));
    next?.addEventListener('click', () => step(1));
    frame.addEventListener('pointerdown', (event) => {
      if (event.target.closest('input, button')) return;
      frame.dataset.gestureStart = String(event.clientX);
    }, { passive: true });
    frame.addEventListener('pointerup', (event) => {
      const start = Number(frame.dataset.gestureStart);
      delete frame.dataset.gestureStart;
      if (!Number.isFinite(start) || Math.abs(event.clientX - start) < 80) return;
      step(event.clientX < start ? 1 : -1);
    }, { passive: true });
    frame.addEventListener('pointercancel', () => { delete frame.dataset.gestureStart; }, { passive: true });
    new MutationObserver(render).observe(root, { attributes: true, attributeFilter: ['data-lang'] });
    render();
    comparison.dataset.fusionReady = 'true';
  }

  // Content stays visible; transitions are restricted to intentional interactions.



  addHeroMotion();
  addComparison();
})();
