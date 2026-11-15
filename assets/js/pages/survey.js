/* pages/survey.js – khảo sát trước / sau. Lưu trong localStorage của trình duyệt (sw_f1, sw_f2).
   Dữ liệu câu hỏi: data/survey.js */
(function(){
  const SV=SW.data.survey;
  const total=SV.filter(s=>s.correct!==undefined).length;

  ['f1','f2'].forEach(id=>{
    $('#'+id).innerHTML=SV.map((s,i)=>`<p><b>${i+1}. ${s.q}</b></p>${s.options.map((o,k)=>`<label style="display:block"><input type="radio" name="${id}${i}" value="${k}"> ${o}</label>`).join('')}`).join('')+`<button class="b" style="margin-top:8px" data-form="${id}">Gửi khảo sát</button>`;
  });
  $$('[data-form]').forEach(b=>b.onclick=()=>submit(b.dataset.form));

  /* số câu trả lời đúng (chỉ tính câu có correct) */
  const score=a=>a?a.filter((v,i)=>SV[i].correct!==undefined&&v===SV[i].correct).length:0;

  function submit(id){
    const a=SV.map((s,i)=>{const c=document.querySelector(`input[name="${id}${i}"]:checked`);return c?+c.value:-1});
    try{localStorage.setItem('sw_'+id,JSON.stringify(a))}catch(e){}
    const k=$('#kres');k.hidden=false;
    let p=null,q=null;
    try{p=JSON.parse(localStorage.getItem('sw_f1'));q=JSON.parse(localStorage.getItem('sw_f2'))}catch(e){}
    k.innerHTML='✅ Cảm ơn em! '+(p&&q?`Điểm kiến thức: trước ${score(p)}/${total} → sau ${score(q)}/${total}.`:'Hoàn thành cả hai phiếu để xem sự tiến bộ.');
  }
})();
