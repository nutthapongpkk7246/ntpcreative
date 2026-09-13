(()=>{
 const filters=[...document.querySelectorAll('.portfolio-filter')], cards=[...document.querySelectorAll('.real-work-card')], status=document.querySelector('#portfolioFilterStatus');
 filters.forEach(btn=>btn.addEventListener('click',()=>{
   const f=btn.dataset.filter||'all'; filters.forEach(x=>{x.classList.toggle('active',x===btn);x.setAttribute('aria-pressed',x===btn?'true':'false')});
   let count=0;cards.forEach(card=>{const show=f==='all'||(card.dataset.category||'').split(/\s+/).includes(f);card.hidden=!show;if(show)count++});
   if(status) status.textContent=`แสดง ${count} ผลงาน`;
 }));
 const box=document.querySelector('#portfolioLightbox'), img=box?.querySelector('img'), title=box?.querySelector('.lightbox-title');
 function close(){if(!box)return;box.classList.remove('open');box.setAttribute('aria-hidden','true');if(img)img.src='';document.body.style.overflow=''}
 document.querySelectorAll('.portfolio-image-btn').forEach(btn=>btn.addEventListener('click',()=>{if(!box||!img)return;img.src=btn.dataset.full||btn.querySelector('img')?.src||'';img.alt=btn.dataset.title||'';if(title)title.textContent=btn.dataset.title||'';box.classList.add('open');box.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}));
 box?.querySelector('.lightbox-close')?.addEventListener('click',close);box?.addEventListener('click',e=>{if(e.target===box)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
