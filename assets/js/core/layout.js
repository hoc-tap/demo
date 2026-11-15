/* ============================================================
   core/layout.js – dựng khung trang dùng chung: icon sprite, header + menu,
   hộp thoại SOS, footer. Mỗi trang chỉ cần <main> + thuộc tính
   <html data-root="…" data-nav="…">.
   Sửa menu / footer / nội dung SOS ở ĐÂY là đổi toàn site.
   ============================================================ */
(function(){
  const ico=n=>`<svg class="i"><use href="#i-${n}"/></svg>`;
  const themeKey='safewater-theme';
  let theme;
  try{
    const savedTheme=localStorage.getItem(themeKey);
    theme=savedTheme==='light'||savedTheme==='dark'
      ?savedTheme
      :(document.documentElement.dataset.nav==='trochoi'?'dark':'light');
  }catch(error){
    console.warn('Không thể đọc tùy chọn giao diện đã lưu.',error);
    theme=document.documentElement.dataset.nav==='trochoi'?'dark':'light';
  }
  document.documentElement.dataset.theme=theme;

  /* [khóa data-nav, icon, nhãn, đường dẫn từ thư mục gốc] */
  const NAV=[
    ['home','home','Trang chủ','index.html'],
    ['kienthuc','book','Kiến thức','kien-thuc/index.html'],
    ['trochoi','game','Trò chơi','tro-choi/index.html'],
    ['bando','pin','Bản đồ','ban-do/index.html'],
    ['ai','bot','Trợ lý AI','tro-ly-ai/index.html'],
    ['khaosat','clip','Khảo sát','khao-sat/index.html'],
    ['gioithieu','info','Giới thiệu','gioi-thieu/index.html']
  ];
  const active=document.documentElement.dataset.nav;

  const sprite=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${SW.sprites.line}${SW.sprites.threeD}</defs></svg>`;

  const header=`<header><a class="logo" href="${SW.url('index.html')}"><i class="lg"><svg class="i"><use href="#i-drop"/></svg></i>SafeWater</a>
<nav>${NAV.map(n=>`<a href="${SW.url(n[3])}"${n[0]===active?' class="on"':''}>${ico(n[1])}${n[2]}</a>`).join('')}</nav>
<div class="header-actions">
<button class="theme-toggle" id="theme-toggle" type="button"></button>
<button class="sos" id="sos-open">${ico('siren')}SOS</button>
</div></header>
<dialog id="sos"><h2>🆘 Gặp người đuối nước</h2><ol><li><b>HÔ</b> to gọi người lớn ngay.</li><li><b>NÉM</b> phao, can nhựa, vật nổi.</li><li><b>CHÌA</b> cành cây, gậy dài – không nhảy xuống cứu.</li><li>Gọi <b>115</b> (cấp cứu) · <b>111</b> (bảo vệ trẻ em).</li></ol><form method="dialog"><button class="b">Đã hiểu</button></form></dialog>`;

  const footer=`<footer>Đề tài NCKH: “Ứng dụng web tương tác SafeWater trong giáo dục phòng chống đuối nước cho học sinh” · Năm 2026</footer>`;

  document.body.insertAdjacentHTML('afterbegin',sprite+header);
  if(document.documentElement.dataset.page==='lesson'){
    $('header:not(.hero)').insertAdjacentHTML('afterend',`<nav class="lesson-nav" aria-label="Điều hướng bài học"><a href="${SW.url('kien-thuc/index.html')}">← Kiến thức</a><a href="${SW.url('kien-thuc/bai-hoc.html')}">Danh sách bài học →</a></nav>`);
  }
  $('main').insertAdjacentHTML('afterend',footer);
  $('#sos-open').onclick=()=>$('#sos').showModal();
  const themeToggle=$('#theme-toggle');
  const updateThemeToggle=()=>{
    const dark=document.documentElement.dataset.theme==='dark';
    themeToggle.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true">${dark
      ?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>'
      :'<path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"/>'}</svg><span>${dark?'Tối':'Sáng'}</span>`;
    const next=dark?'sáng':'tối';
    themeToggle.setAttribute('aria-label',`Giao diện ${dark?'tối':'sáng'}; chuyển sang giao diện ${next}`);
    themeToggle.title=`Chuyển sang giao diện ${next}`;
    themeToggle.setAttribute('aria-pressed',String(dark));
  };
  updateThemeToggle();
  themeToggle.onclick=()=>{
    theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=theme;
    updateThemeToggle();
    try{
      localStorage.setItem(themeKey,theme);
    }catch(error){
      console.warn('Không thể lưu tùy chọn giao diện.',error);
    }
  };

  /* Trên điện thoại, cuộn menu để mục đang chọn nằm giữa màn hình */
  const on=$('nav a.on');on&&on.scrollIntoView({inline:'center',block:'nearest'});
})();
