/* data/survey.js – phiếu khảo sát (dùng cho cả phiếu TRƯỚC và SAU).
   correct = chỉ số đáp án đúng (nếu có) → dùng tính "điểm kiến thức" trước/sau.
   Câu không có correct (tự đánh giá, sở thích) không tính điểm. */
SW.data.survey=[
  {q:'Em biết bơi không?',options:['Không','Biết chút','Biết bơi tốt']},
  {q:'Khi thấy bạn đuối nước, em sẽ làm gì?',options:['Nhảy xuống cứu','Hô to, ném phao','Không biết'],correct:1},
  {q:'Số điện thoại cấp cứu y tế là?',options:['113','115','Không nhớ'],correct:1},
  {q:'Em tự tin về kỹ năng phòng chống đuối nước?',options:['1 – Thấp','3 – Vừa','5 – Cao']},
  {q:'Em có thích học qua trò chơi?',options:['Có','Bình thường','Không']}
];
