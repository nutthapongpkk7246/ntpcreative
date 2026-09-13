(()=>{
  const quoteContext=()=>{
    const select=document.querySelector('#quotePackage');
    const opt=select?.options?.[select.selectedIndex];
    const rush=Number(document.querySelector('input[name="rush"]:checked')?.value||1);
    const price=Number(opt?.dataset?.price||0);
    return {
      package_id:select?.value||'',
      package_name:(opt?.textContent||'').trim(),
      estimated_value:Math.round(price*rush),
      currency:'THB',
      rush_multiplier:rush
    };
  };

  const send=(name,params={})=>{
    if(typeof window.gtag==='function'){
      window.gtag('event',name,{page_path:location.pathname,...params});
    }
  };

  const channelFor=a=>{
    const h=(a.href||'').toLowerCase();
    if(h.includes('line.me')) return 'line';
    if(h.includes('m.me')) return 'messenger';
    if(h.includes('facebook.com')) return 'facebook';
    if(h.includes('tiktok.com')) return 'tiktok';
    return '';
  };

  document.addEventListener('click',e=>{
    const a=e.target.closest?.('a[href]');
    if(a){
      const channel=channelFor(a);
      if(channel){
        let placement='content';
        if(a.closest('.mobile-contact')) placement='floating';
        else if(a.closest('header')) placement='header';
        else if(a.closest('footer')) placement='footer';
        else if(a.closest('.quote-actions')) placement='quick_quote';
        send('contact_click',{
          contact_channel:channel,
          placement,
          link_text:(a.textContent||'').trim().slice(0,80),
          ...quoteContext()
        });
      }
    }

    const filter=e.target.closest?.('.portfolio-filter');
    if(filter){
      send('portfolio_filter',{
        filter_name:filter.dataset.filter||'all',
        filter_label:(filter.textContent||'').trim()
      });
    }

    const item=e.target.closest?.('.portfolio-image-btn');
    if(item){
      send('portfolio_item_view',{item_name:item.dataset.title||''});
    }

    if(e.target.closest?.('#copyBrief')){
      send('quote_brief_copy',quoteContext());
    }

    const pick=e.target.closest?.('.package-pick');
    if(pick){
      send('package_select',{package_id:pick.dataset.value||''});
    }
  },{capture:true});
})();
