(() => {
  const button = document.querySelector('[data-wechat-id]');
  const status = document.querySelector('[data-wechat-copy-status]');
  const projectContext = document.querySelector('[data-project-context]');
  const projectSlug = new URL(location.href).searchParams.get('project');

  async function showProjectContext() {
    if (!projectContext || !projectSlug || !/^[a-z0-9-]{1,120}$/i.test(projectSlug)) return;
    try {
      const response = await fetch('/assets/cases/index.json');
      if (!response.ok) return;
      const data = await response.json();
      const project = data.projects?.find((item) => item.slug === projectSlug);
      if (!project?.title) return;
      projectContext.textContent = 'Project of interest: ' + project.title;
      projectContext.hidden = false;
    } catch {}
  }

  const projectContextReady = showProjectContext();
  if (!button || !status) return projectContextReady;

  function fallbackCopy(value) {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    try {
      area.select();
      if (!document.execCommand('copy')) throw new Error('Copy command unavailable');
    } finally {
      area.remove();
    }
  }

  async function copyText(value) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        return;
      } catch {}
    }
    fallbackCopy(value);
  }

  button.addEventListener('click', async () => {
    const value = button.dataset.wechatId;
    status.hidden = false;
    try {
      await copyText(value);
      status.textContent = 'WeChat ID copied. Open WeChat and search for it.';
    } catch {
      status.textContent = `Copy unavailable. Select and copy this ID: ${value}`;
    }
  });

  return projectContextReady;
})();
