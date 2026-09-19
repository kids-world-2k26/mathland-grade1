// Interactive Analog Clock Game Module (Telling Time to Hour & Half-Hour, Daily Routine & Calendar)
// Bám sát Bài 34, 35, 36, 37 SGK Toán 1 Tập 2: Thời gian. Giờ và lịch
import { sounds } from '../audio.js';

const DAYS = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];

const ROUTINES = [
  { hour: 7, minute: 0, timeStr: '7:00', title: '7 giờ sáng', desc: 'Bé cắp sách đến trường đi học 🎒', emoji: '🏫' },
  { hour: 11, minute: 30, timeStr: '11:30', title: '11 giờ rưỡi trưa', desc: 'Bé cùng các bạn ăn cơm trưa ngon lành 🍱', emoji: '🍚' },
  { hour: 14, minute: 0, timeStr: '14:00', title: '2 giờ chiều', desc: 'Bé thức dậy sau giấc ngủ trưa và học bài 📚', emoji: '📖' },
  { hour: 17, minute: 0, timeStr: '17:00', title: '5 giờ chiều', desc: 'Bé tan học và đá bóng cùng bạn bè ⚽️', emoji: '🏃' },
  { hour: 20, minute: 0, timeStr: '20:00', title: '8 giờ tối', desc: 'Bé cùng bố mẹ đọc sách truyện thiếu nhi 🌙', emoji: '🛋️' },
  { hour: 21, minute: 30, timeStr: '21:30', title: '9 giờ rưỡi tối', desc: 'Bé đánh răng và lên giường ngủ say giấc 😴', emoji: '🛏️' }
];

export function generateClockQuestion() {
  const mode = Math.floor(Math.random() * 3);

  if (mode === 0) {
    // Mode 0: Giờ sinh hoạt thực tế trong ngày (Bài 36 SGK)
    const r = ROUTINES[Math.floor(Math.random() * ROUTINES.length)];
    const timeAnswer = r.title;

    const choices = [timeAnswer];
    while (choices.length < 3) {
      const other = ROUTINES[Math.floor(Math.random() * ROUTINES.length)].title;
      if (!choices.includes(other)) choices.push(other);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      type: 'routine',
      routine: r,
      hour: r.hour > 12 ? r.hour - 12 : r.hour,
      minute: r.minute,
      correctAnswer: timeAnswer,
      choices,
      promptText: `Lúc ${r.title}, ${r.desc}. Đồng hồ đang chỉ mấy giờ?`,
      hintText: `Quan sát kim ngắn (chỉ giờ) và kim dài (chỉ phút) trên mặt đồng hồ nhé!`
    };
  } else if (mode === 1) {
    // Mode 1: Calendar Days (Bài 35 SGK)
    const subType = Math.random() > 0.5 ? 'next' : 'prev';
    const dayIdx = Math.floor(Math.random() * DAYS.length);
    const today = DAYS[dayIdx];

    let targetIdx;
    let promptText = '';
    if (subType === 'next') {
      targetIdx = (dayIdx + 1) % DAYS.length;
      promptText = `Hôm nay là ${today}. Ngày mai là ngày nào trong tuần?`;
    } else {
      targetIdx = (dayIdx - 1 + DAYS.length) % DAYS.length;
      promptText = `Hôm nay là ${today}. Hôm qua là ngày nào trong tuần?`;
    }

    const answer = DAYS[targetIdx];
    const choices = [answer];
    while (choices.length < 3) {
      const pick = DAYS[Math.floor(Math.random() * DAYS.length)];
      if (!choices.includes(pick)) choices.push(pick);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      type: 'calendar',
      today,
      subType,
      choices,
      correctAnswer: answer,
      promptText,
      hintText: `Một tuần có 7 ngày từ Thứ Hai đến Chủ Nhật nhé bé!`
    };
  } else {
    // Mode 2: Classic Clock (Giờ đúng & Giờ rưỡi - Bài 34 SGK)
    const isHalfHour = Math.random() > 0.5;
    const hour = Math.floor(Math.random() * 12) + 1; // 1 to 12
    const minute = isHalfHour ? 30 : 0;

    const timeString = isHalfHour ? `${hour} giờ rưỡi (30 phút)` : `${hour} giờ đúng`;

    const choices = [timeString];
    while (choices.length < 3) {
      const dHour = Math.floor(Math.random() * 12) + 1;
      const dHalf = Math.random() > 0.5;
      const dStr = dHalf ? `${dHour} giờ rưỡi (30 phút)` : `${dHour} giờ đúng`;
      if (!choices.includes(dStr)) choices.push(dStr);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      type: 'clock',
      hour,
      minute,
      timeString,
      correctAnswer: timeString,
      choices,
      promptText: `Đồng hồ đang chỉ mấy giờ?`,
      hintText: isHalfHour
        ? `Kim phút màu xanh dài chỉ thẳng xuống số 6 là 30 phút (giờ rưỡi)!`
        : `Kim phút màu xanh dài chỉ thẳng lên số 12 là đúng giờ tròn!`
    };
  }
}

export function renderClockStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  if (question.type === 'calendar') {
    const calCard = document.createElement('div');
    calCard.style.background = 'white';
    calCard.style.border = '3px solid #fbcfe8';
    calCard.style.borderRadius = '24px';
    calCard.style.padding = '24px 36px';
    calCard.style.boxShadow = 'var(--shadow-md)';
    calCard.style.textAlign = 'center';
    calCard.style.margin = '20px 0';

    calCard.innerHTML = `
      <div style="font-size: 3.5rem; margin-bottom: 8px;">🗓️</div>
      <div style="font-size: 1rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Hôm Nay Là</div>
      <div style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; color: #db2777; margin: 4px 0 12px;">
        ${question.today}
      </div>
      <div style="font-size: 1.05rem; color: #475569; font-weight: 600;">
        ${question.subType === 'next' ? 'Bé hãy chọn xem ngày mai là thứ mấy nhé!' : 'Bé hãy nhớ lại xem hôm qua là thứ mấy nhé!'}
      </div>
    `;
    container.appendChild(calCard);
  } else {
    // Render Clock Face (either routine or classic clock)
    const clockBox = document.createElement('div');
    clockBox.style.display = 'flex';
    clockBox.style.flexDirection = 'column';
    clockBox.style.alignItems = 'center';
    clockBox.style.gap = '14px';
    clockBox.style.margin = '16px 0';

    if (question.type === 'routine') {
      const routineInfo = document.createElement('div');
      routineInfo.style.background = '#f0fdf4';
      routineInfo.style.border = '2px solid #86efac';
      routineInfo.style.borderRadius = '16px';
      routineInfo.style.padding = '10px 20px';
      routineInfo.style.fontSize = '1.15rem';
      routineInfo.style.fontWeight = '700';
      routineInfo.style.color = '#15803d';
      routineInfo.innerHTML = `${question.routine.emoji} ${question.routine.desc}`;
      clockBox.appendChild(routineInfo);
    }

    const clockWrap = document.createElement('div');
    clockWrap.className = 'analog-clock-container';

    const hourDeg = (question.hour % 12) * 30 + (question.minute / 60) * 30;
    const minDeg = question.minute * 6;

    clockWrap.innerHTML = `
      <div class="clock-face">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => {
          const angle = (n * 30 - 90) * (Math.PI / 180);
          const r = 85;
          const x = 110 + r * Math.cos(angle);
          const y = 110 + r * Math.sin(angle);
          return `<span class="clock-number" style="left: ${x}px; top: ${y}px;">${n}</span>`;
        }).join('')}
        <div class="clock-hand hand-hour" style="transform: rotate(${hourDeg}deg)"></div>
        <div class="clock-hand hand-minute" style="transform: rotate(${minDeg}deg)"></div>
        <div class="clock-center-pin"></div>
      </div>
    `;

    clockBox.appendChild(clockWrap);
    container.appendChild(clockBox);
  }

  // Choices
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.fontSize = '1.25rem';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.correctAnswer, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
