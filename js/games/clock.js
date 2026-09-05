// Interactive Analog Clock Game Module (Telling Time to Hour & Half-Hour)
import { sounds } from '../audio.js';

const DAYS = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];

export function generateClockQuestion() {
  const isDayQuestion = Math.random() < 0.4;

  if (isDayQuestion) {
    const subType = Math.random() > 0.5 ? 'next' : 'prev';
    const dayIdx = Math.floor(Math.random() * DAYS.length);
    const today = DAYS[dayIdx];

    let targetIdx;
    let promptText = '';
    let questionText = '';
    if (subType === 'next') {
      targetIdx = (dayIdx + 1) % DAYS.length;
      promptText = `Hôm nay là ${today}. Ngày mai là ngày nào?`;
      questionText = `Ngày mai là thứ mấy?`;
    } else {
      targetIdx = (dayIdx - 1 + DAYS.length) % DAYS.length;
      promptText = `Hôm nay là ${today}. Hôm qua là ngày nào?`;
      questionText = `Hôm qua là thứ mấy?`;
    }

    const answer = DAYS[targetIdx];
    const choices = [answer];
    while (choices.length < 3) {
      const pick = DAYS[Math.floor(Math.random() * DAYS.length)];
      if (!choices.includes(pick)) {
        choices.push(pick);
      }
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      type: 'calendar',
      today,
      subType,
      choices,
      correctAnswer: answer,
      promptText,
      hintText: `Một tuần có 7 ngày bắt đầu từ Thứ Hai đến Chủ Nhật nhé bé!`
    };
  }

  // Clock question
  const isHalfHour = Math.random() > 0.5;
  const hour = Math.floor(Math.random() * 12) + 1; // 1 to 12
  const minute = isHalfHour ? 30 : 0;

  const timeString = `${hour}:${minute === 0 ? '00' : '30'}`;

  // Distractors
  const choices = [timeString];
  while (choices.length < 3) {
    const dHour = Math.floor(Math.random() * 12) + 1;
    const dMin = Math.random() > 0.5 ? 30 : 0;
    const dStr = `${dHour}:${dMin === 0 ? '00' : '30'}`;
    if (!choices.includes(dStr)) {
      choices.push(dStr);
    }
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
      ? `Kim phút màu xanh dài chỉ thẳng xuống số 6 (30 phút / rưỡi)!`
      : `Kim phút màu xanh dài chỉ thẳng lên số 12 (giờ đúng: 00 phút)!`
  };
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
    calCard.style.borderRadius = '22px';
    calCard.style.border = '4px solid #fed7aa';
    calCard.style.boxShadow = '0 10px 25px rgba(234, 88, 12, 0.15)';
    calCard.style.width = '260px';
    calCard.style.overflow = 'hidden';
    calCard.style.marginBottom = '20px';
    calCard.style.textAlign = 'center';

    const calHeader = document.createElement('div');
    calHeader.style.background = '#ea580c';
    calHeader.style.color = 'white';
    calHeader.style.padding = '10px 0';
    calHeader.style.fontFamily = 'var(--font-heading)';
    calHeader.style.fontWeight = '700';
    calHeader.style.fontSize = '1.2rem';
    calHeader.textContent = '📅 LỊCH TUẦN LỄ';

    const calBody = document.createElement('div');
    calBody.style.padding = '20px 16px';

    const todayTag = document.createElement('div');
    todayTag.style.fontSize = '0.9rem';
    todayTag.style.color = '#64748b';
    todayTag.style.fontWeight = '700';
    todayTag.textContent = 'HÔM NAY';

    const todayName = document.createElement('div');
    todayName.style.fontSize = '2rem';
    todayName.style.fontFamily = 'var(--font-heading)';
    todayName.style.fontWeight = '800';
    todayName.style.color = '#c2410c';
    todayName.style.margin = '4px 0 10px';
    todayName.textContent = question.today;

    const askTag = document.createElement('div');
    askTag.style.background = '#ffedd5';
    askTag.style.padding = '8px 12px';
    askTag.style.borderRadius = '14px';
    askTag.style.fontSize = '1.05rem';
    askTag.style.fontWeight = '700';
    askTag.style.color = '#9a3412';
    askTag.textContent = question.subType === 'next' ? '❓ Ngày mai là ngày nào?' : '❓ Hôm qua là ngày nào?';

    calBody.appendChild(todayTag);
    calBody.appendChild(todayName);
    calBody.appendChild(askTag);

    calCard.appendChild(calHeader);
    calCard.appendChild(calBody);

    container.appendChild(calCard);
  } else {
    const clockWrapper = document.createElement('div');
    clockWrapper.className = 'clock-container';

    // Calculate angles
    // Minute hand: 360 deg for 60 min -> 6 deg/min
    const minuteAngle = question.minute * 6;
    // Hour hand: 360 deg for 12 hours -> 30 deg/hour + 0.5 deg/min
    const hourAngle = (question.hour % 12) * 30 + (question.minute * 0.5);

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "220");
    svg.setAttribute("height", "220");
    svg.setAttribute("viewBox", "0 0 200 200");
    svg.classList.add("analog-clock-svg");

    // Clock face
    const face = document.createElementNS(svgNS, "circle");
    face.setAttribute("cx", "100");
    face.setAttribute("cy", "100");
    face.setAttribute("r", "90");
    face.setAttribute("fill", "#ffffff");
    face.setAttribute("stroke", "#4f46e5");
    face.setAttribute("stroke-width", "8");
    svg.appendChild(face);

    // Hour numerals 1 to 12
    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const x = 100 + 68 * Math.cos(angle);
      const y = 100 + 68 * Math.sin(angle) + 6; // adjust vertical baseline

      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", x.toString());
      text.setAttribute("y", y.toString());
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-family", "Fredoka, sans-serif");
      text.setAttribute("font-size", "18");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("fill", "#1e293b");
      text.textContent = i.toString();
      svg.appendChild(text);
    }

    // Hour Hand (Shorter, Red)
    const hourHand = document.createElementNS(svgNS, "line");
    hourHand.setAttribute("x1", "100");
    hourHand.setAttribute("y1", "100");
    hourHand.setAttribute("x2", "100");
    hourHand.setAttribute("y2", "54");
    hourHand.setAttribute("stroke", "#ef4444");
    hourHand.setAttribute("stroke-width", "6");
    hourHand.setAttribute("stroke-linecap", "round");
    hourHand.setAttribute("transform", `rotate(${hourAngle} 100 100)`);
    svg.appendChild(hourHand);

    // Minute Hand (Longer, Blue)
    const minuteHand = document.createElementNS(svgNS, "line");
    minuteHand.setAttribute("x1", "100");
    minuteHand.setAttribute("y1", "100");
    minuteHand.setAttribute("x2", "100");
    minuteHand.setAttribute("y2", "30");
    minuteHand.setAttribute("stroke", "#0284c7");
    minuteHand.setAttribute("stroke-width", "4");
    minuteHand.setAttribute("stroke-linecap", "round");
    minuteHand.setAttribute("transform", `rotate(${minuteAngle} 100 100)`);
    svg.appendChild(minuteHand);

    // Center Pin
    const centerPin = document.createElementNS(svgNS, "circle");
    centerPin.setAttribute("cx", "100");
    centerPin.setAttribute("cy", "100");
    centerPin.setAttribute("r", "7");
    centerPin.setAttribute("fill", "#1e1b4b");
    svg.appendChild(centerPin);

    clockWrapper.appendChild(svg);
    container.appendChild(clockWrapper);
  }

  // Choices Row
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.fontSize = typeof val === 'number' || val.length <= 5 ? '1.8rem' : '1.3rem';
    btn.style.minWidth = typeof val === 'number' || val.length <= 5 ? '120px' : '140px';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.correctAnswer, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
