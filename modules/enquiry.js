(() => {
 const form=document.querySelector('.enquiry-form'); if(!form)return;
 const cn=()=>document.documentElement.dataset.lang!=='en';
 const status=document.querySelector('[data-enquiry-status]');
 const result=document.querySelector('.enquiry-result');
 const submit=document.querySelector('.enquiry-form [type="submit"]');
 let submitReset=null;
 let project=null;
 const id=new URL(location.href).searchParams.get('project');
 function showProject(){const e=document.querySelector('.enquiry-context');if(project){e.hidden=false;e.textContent=(cn()?'关注的项目：':'Project of interest: ')+(project.title?.[cn()?'cn':'en']||project.title);}}
 async function loadProject(){
  if(!id)return;
  project=(window.HSD_PROJECTS||[]).find(p=>p.id===id);
  if(!project){try {const response=await fetch('assets/cases/index.json');if(!response.ok)return;const data=await response.json();project=data.projects.find(p=>p.slug===id);}catch{return;}}
  showProject();
 }
 document.addEventListener('hsd:language',showProject);loadProject();
 async function copy(value){
  try{await navigator.clipboard.writeText(value);return true;}
  catch{result.hidden=false;result.textContent=value;return false;}
 }
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  const data=Object.fromEntries([...form.querySelectorAll('[data-field]')].map(field=>[field.dataset.field,field.value])),lines=[cn()?'你好，我想咨询住宅设计。':'Hello, I would like to discuss a residential design project.'];
  if(project)lines.push((cn()?'关注的项目：':'Project of interest: ')+(project.title?.[cn()?'cn':'en']||project.title));
  for(const [key,zh,en] of [['city','项目城市','City'],['type','住宅类型','Property type'],['area','大致面积','Area'],['stage','当前阶段与启动时间','Stage and start'],['priorities','希望解决的问题','Priorities']]){const value=String(data[key]||'').trim();if(value)lines.push((cn()?zh:en)+': '+value);}
  result.hidden=false;result.textContent=lines.join('\n');
  const ok=await copy(result.textContent);
  result.classList.remove('is-visible');
  // Restart the brief reveal only when the visitor creates a new message.
  requestAnimationFrame(()=>result.classList.add('is-visible'));
  form.classList.toggle('is-complete',ok);
  form.classList.toggle('is-copy-fallback',!ok);
  status.textContent=ok?(cn()?'已复制。请在微信中粘贴并发送。':'Copied. Paste and send in WeChat.'):(cn()?'未能访问剪贴板，请手动复制下方内容。':'Clipboard unavailable. Copy the text below manually.');
  if(submit){
   const original=cn()?submit.dataset.cn:submit.dataset.en;
   clearTimeout(submitReset);
   submit.classList.toggle('is-complete',ok);
   submit.classList.toggle('is-copy-fallback',!ok);
   submit.textContent=ok?(cn()?'已复制，可在微信发送':'Copied — send in WeChat'):(cn()?'请手动复制下方内容':'Copy the message below');
   submitReset=setTimeout(()=>{submit.classList.remove('is-complete','is-copy-fallback');submit.textContent=original;},2800);
  }
 });
 document.querySelector('[data-copy-wechat]').addEventListener('click',async()=>{const ok=await copy('HSD_Design618');status.textContent=ok?(cn()?'微信号已复制：HSD_Design618':'WeChat ID copied: HSD_Design618'):'HSD_Design618';});
})();
