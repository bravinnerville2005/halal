const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* gallery filters */
const items=[...document.querySelectorAll('.g-item')];
document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelector('.filters .on').classList.remove('on');b.classList.add('on');
  items.forEach(i=>i.classList.toggle('hide',b.dataset.f!=='all'&&i.dataset.cat!==b.dataset.f));
}));

/* lightbox */
const lb=document.getElementById('lb'),lbImg=lb.querySelector('img'),lbCap=lb.querySelector('figcaption');
let cur=0;
const vis=()=>items.filter(i=>!i.classList.contains('hide'));
function show(n){const v=vis();cur=(n+v.length)%v.length;const im=v[cur].querySelector('img');lbImg.src=im.src;lbImg.alt=im.alt;lbCap.textContent=im.alt}
function open(el){show(vis().indexOf(el));lb.classList.add('open');lb.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function close(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.style.overflow=''}
items.forEach(i=>{i.tabIndex=0;i.addEventListener('click',()=>open(i));i.addEventListener('keydown',e=>{if(e.key==='Enter')open(i)})});
lb.querySelector('.lb-x').onclick=close;
lb.querySelector('.lb-p').onclick=()=>show(cur-1);
lb.querySelector('.lb-n').onclick=()=>show(cur+1);
lb.addEventListener('click',e=>{if(e.target===lb)close()});
document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});