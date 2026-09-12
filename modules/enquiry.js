(() => {
 const form=document.querySelector('.enquiry-form'); if(!form)return;
 const cn=()=>document.documentElement.dataset.lang!=='en';
 const status=document.querySelector('[data-enquiry-status]');
 const result=document.querySelector('.enquiry-result');
 let copyState='';
 let project=null;
 const id=new URL(location.href).searchParams.get('project');
 function showProject(){const e=document.querySelector('.enquiry-context');if(project){e.hidden=false;e.textContent=(cn()?'正在阅读的项目：':'Project I am reading: ')+(project.title?.[cn()?'cn':'en']||project.title);}}
 async function loadProject(){
  if(!id)return;
  project=(window.HSD_PROJECTS||[]).find(p=>p.id===id);
  if(!project){try {const response=await fetch('assets/cases/index.json');if(!response.ok)return;const data=await response.json();project=data.projects.find(p=>p.slug===id);}catch{return;}}
  showProject();
 }
 function setCopyStatus(ok){copyState=ok?'copied':'manual';status.textContent=ok?(cn()?'已复制。请在微信中粘贴并发送。':'Copied. Paste and send in WeChat.'):(cn()?'未能访问剪贴板，请手动复制下方内容。':'Clipboard unavailable. Copy the text below manually.');}
 function buildLines(){
  const data=new FormData(form),lines=[cn()?'你好，我想和你交流建筑、室内或居住空间。':'Hello, I would like to exchange thoughts on architecture, interiors or everyday space.'];
  if(project)lines.push((cn()?'正在阅读的项目：':'Project I am reading: ')+(project.title?.[cn()?'cn':'en']||project.title));
  for(const [key,zh,en] of [['name','你的称呼','Name'],['channel','联系方式（可选）','Contact (optional)'],['message','想说的话','Your message']]){const value=String(data.get(key)||'').trim();if(value)lines.push((cn()?zh:en)+': '+value);}
  return lines;
 }
 document.addEventListener('hsd:language',()=>{
  showProject();
  if(!result.hidden){result.textContent=buildLines().join('\n');copyState='';status.textContent=cn()?'语言已切换，请重新复制留言。':'Language switched. Copy the note again.';}
 });loadProject();
 async function copy(value){
  try{await navigator.clipboard.writeText(value);return true;}
  catch{result.hidden=false;result.textContent=value;return false;}
 }
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  const lines=buildLines();
  result.hidden=false;result.textContent=lines.join('\n');
  const ok=await copy(result.textContent);
  setCopyStatus(ok);
 });
 document.querySelector('[data-copy-wechat]').addEventListener('click',async()=>{const ok=await copy('HSD_Design618');status.textContent=ok?(cn()?'微信号已复制：HSD_Design618':'WeChat ID copied: HSD_Design618'):'HSD_Design618';});
})();
