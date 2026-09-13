(()=>{
  const $=s=>document.querySelector(s);
  const packageSelect=$('#quotePackage'), total=$('#quoteTotal'), extra=$('#quoteExtra'), status=$('#quoteStatus'), copyBtn=$('#copyBrief');
  if(!packageSelect) return;
  const rushInputs=[...document.querySelectorAll('input[name="rush"]')];
  const addons=[...document.querySelectorAll('.addon')];
  const money=n=>`${Math.round(n).toLocaleString('th-TH')} บาท`;
  function current(){
    const opt=packageSelect.options[packageSelect.selectedIndex];
    const base=Number(opt?.dataset.price||0);
    const rush=Number(document.querySelector('input[name="rush"]:checked')?.value||1);
    return {opt,base,rush,est:Math.round(base*rush)};
  }
  function update(){
    const c=current(); total.textContent=money(c.est);
    const selected=addons.filter(x=>x.checked).map(x=>x.value);
    extra.textContent=selected.length?`บริการเสริม ${selected.length} รายการ ประเมินเพิ่มตามบรีฟ`:'บริการเสริมประเมินเพิ่มตามบรีฟ';
  }
  packageSelect.addEventListener('change',update); rushInputs.forEach(x=>x.addEventListener('change',update)); addons.forEach(x=>x.addEventListener('change',update));
  document.querySelectorAll('.package-pick').forEach(btn=>btn.addEventListener('click',()=>{packageSelect.value=btn.dataset.value;update();document.querySelector('#quick-quote')?.scrollIntoView({behavior:'smooth',block:'start'});}));
  copyBtn?.addEventListener('click',async()=>{
    const c=current();
    const rushLabel=document.querySelector('input[name="rush"]:checked')?.parentElement?.textContent?.trim()||'คิวปกติ';
    const selected=addons.filter(x=>x.checked).map(x=>`- ${x.value}`);
    const brief=[
      'บรีฟงาน NTP Creative',
      `งานที่สนใจ: ${c.opt?.textContent?.trim()||''}`,
      `ความเร่งด่วน: ${rushLabel.replace(/\s+/g,' ')}`,
      `ประมาณการจากเรตหลัก: ${money(c.est)}`,
      selected.length?'บริการเสริมที่สนใจ:\n'+selected.join('\n'):'บริการเสริมที่สนใจ: -',
      '',
      'รายละเอียดเพิ่มเติม / ข้อความ / โทนสี / ขนาดที่ต้องการ:'
    ].join('\n');
    try{await navigator.clipboard.writeText(brief);status.textContent='คัดลอกบรีฟแล้ว นำไปวางใน Messenger หรือ LINE ได้เลย';status.classList.add('success');copyBtn.classList.add('copied');copyBtn.textContent='คัดลอกแล้ว ✓';setTimeout(()=>{copyBtn.classList.remove('copied');copyBtn.textContent='สร้างบรีฟ + คัดลอก';},2400)}catch(e){status.textContent='สร้างบรีฟแล้ว กรุณากดค้างเพื่อคัดลอก: '+brief;status.classList.add('success')}
  });
  update();
})();
