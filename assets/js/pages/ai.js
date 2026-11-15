/* pages/ai.js – Trợ lý SafeWater: chat khớp từ khóa + đọc to + nhập giọng nói.
   Dữ liệu trả lời: data/chatbot.js */
(function(){
  const {rules,fallback,quickQuestions}=SW.data.chatbot;

  function answerFor(q){return rules.find(r=>r.pattern.test(q))||fallback}

  function ask(q){
    if(!q)return;
    const c=$('#chat');
    c.innerHTML+=`<div class="m u">${q}</div>`;
    const r=answerFor(q);
    c.innerHTML+=`<div class="m a">${r.answer}</div>`;
    c.scrollTop=1e5;
    $('#mas').textContent=r.mood;
    if($('#tts').checked&&window.speechSynthesis){
      speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(r.answer);u.lang='vi-VN';speechSynthesis.speak(u);
    }
  }

  $('#qk').innerHTML=quickQuestions.map(q=>`<button class="opt">${q}</button>`).join('');
  $$('#qk .opt').forEach(b=>b.onclick=()=>ask(b.textContent));
  $('#snd').onclick=()=>{ask($('#cin').value);$('#cin').value=''};
  $('#cin').onkeydown=e=>e.key=='Enter'&&$('#snd').click();
  $('#mic').onclick=()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){alert('Trình duyệt chưa hỗ trợ nhập giọng nói');return}
    const r=new SR();r.lang='vi-VN';r.onresult=e=>ask(e.results[0][0].transcript);r.start();
  };
})();
