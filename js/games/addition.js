// Addition Adventure & Number Line Frog Hop Module
// Bám sát Bài 10, 12, 13 SGK Toán 1: Phép cộng trong phạm vi 10 & Bảng cộng
import { sounds } from '../audio.js';

export function generateAdditionQuestion() {
  const mode = Math.floor(Math.random() * 3);

  if (mode === 0) {
    // Mode 0: Phép cộng 3 số (Bài 12 & 13 SGK: a + b + c = ?)
    const num1 = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const num2 = Math.floor(Math.random() * 3) + 1; // 1 to 3
    const maxN3 = 10 - (num1 + num2);
    const num3 = Math.floor(Math.random() * maxN3) + 1;
    const sum = num1 + num2 + num3;

    const choices = [sum];
    while (choices.length < 3) {
      const dist = Math.max(2, Math.min(10, sum + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'three_nums',
      num1,
      num2,
      num3,
      sum,
      correctAnswer: sum,
      choices,
      promptText: `Tính phép cộng 3 số: ${num1} + ${num2} + ${num3} = ?`,
      hintText: `Bé cộng lần lượt từ trái sang phải: tính ${num1} + ${num2} trước, rồi cộng tiếp ${num3} nhé!`
    };
  } else if (mode === 1) {
    // Mode 1: Điền số còn thiếu vào phép cộng (a + ? = sum)
    const num1 = Math.floor(Math.random() * 6) + 1; // 1 to 6
    const missingNum = Math.floor(Math.random() * (10 - num1)) + 1;
    const sum = num1 + missingNum;

    const choices = [missingNum];
    while (choices.length < 3) {
      const dist = Math.max(1, Math.min(9, missingNum + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'fill_missing',
      num1,
      missingNum,
      sum,
      correctAnswer: missingNum,
      choices,
      promptText: `Điền số thích hợp vào dấu hỏi chấm: ${num1} + ? = ${sum}`,
      hintText: `Số mấy cộng với ${num1} thì bằng ${sum} nhỉ?`
    };
  } else {
    // Mode 2: Chú ếch nhảy tia số hoặc gộp đồ vật
    const isNumberLine = Math.random() > 0.45;
    const num1 = Math.floor(Math.random() * 6) + 1;
    const num2 = Math.floor(Math.random() * (10 - num1)) + 1;
    const sum = num1 + num2;

    const choices = [sum];
    while (choices.length < 3) {
      const dist = Math.max(2, Math.min(10, sum + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'classic',
      isNumberLine,
      num1,
      num2,
      sum,
      correctAnswer: sum,
      choices,
      promptText: isNumberLine
        ? `Chú ếch nhảy về phía trước! ${num1} + ${num2} bằng bao nhiêu?`
        : `Cùng làm phép cộng nào: ${num1} + ${num2} bằng bao nhiêu?`,
      hintText: isNumberLine
        ? `Bắt đầu từ số ${num1} và nhảy ${num2} bước sang phải nhé!`
        : `Đếm tất cả các bạn nhỏ lại với nhau nhé!`
    };
  }
}

export function renderAdditionStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  if (question.mode === 'three_nums') {
    const card = document.createElement('div');
    card.style.background = 'white';
    card.style.borderRadius = '24px';
    card.style.padding = '24px 30px';
    card.style.boxShadow = 'var(--shadow-md)';
    card.style.border = '3px solid #6ee7b7';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.gap = '16px';
    card.style.margin = '20px 0';
    card.style.fontFamily = 'var(--font-heading)';
    card.style.fontSize = '2.2rem';
    card.style.fontWeight = '800';
    card.style.color = '#065f46';

    card.innerHTML = `
      <span>${question.num1}</span>
      <span style="color: #10b981;">+</span>
      <span>${question.num2}</span>
      <span style="color: #10b981;">+</span>
      <span>${question.num3}</span>
      <span style="color: #10b981;">=</span>
      <span style="color: #d97706; background: #fef3c7; border: 2px dashed #f59e0b; padding: 4px 18px; border-radius: 16px;">?</span>
    `;
    container.appendChild(card);
  } else if (question.mode === 'fill_missing') {
    const card = document.createElement('div');
    card.style.background = 'white';
    card.style.borderRadius = '24px';
    card.style.padding = '24px 30px';
    card.style.boxShadow = 'var(--shadow-md)';
    card.style.border = '3px solid #93c5fd';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.gap = '16px';
    card.style.margin = '20px 0';
    card.style.fontFamily = 'var(--font-heading)';
    card.style.fontSize = '2.4rem';
    card.style.fontWeight = '800';
    card.style.color = '#1e3a8a';

    card.innerHTML = `
      <span>${question.num1}</span>
      <span style="color: #3b82f6;">+</span>
      <span style="color: #ef4444; background: #fee2e2; border: 2px dashed #ef4444; padding: 4px 20px; border-radius: 16px;">?</span>
      <span style="color: #3b82f6;">=</span>
      <span>${question.sum}</span>
    `;
    container.appendChild(card);
  } else if (question.isNumberLine) {
    // Number Line Frog Hop
    const lineWrapper = document.createElement('div');
    lineWrapper.className = 'number-line-container';

    const track = document.createElement('div');
    track.className = 'number-line-track';

    const maxLine = 12;
    const frog = document.createElement('div');
    frog.className = 'number-line-frog';
    frog.textContent = '🐸';
    track.appendChild(frog);

    const updateFrogPos = (idx) => {
      const pct = (idx / maxLine) * 100;
      frog.style.left = `calc(${pct}% - 22px)`;
    };

    setTimeout(() => updateFrogPos(question.num1), 50);

    for (let i = 0; i <= maxLine; i++) {
      const tickWrap = document.createElement('div');
      tickWrap.className = 'line-tick-wrapper';

      const tick = document.createElement('div');
      tick.className = 'line-tick';

      const num = document.createElement('span');
      num.className = 'line-number';
      num.textContent = i;

      tickWrap.appendChild(tick);
      tickWrap.appendChild(num);

      tickWrap.addEventListener('click', () => {
        sounds.playPop();
        frog.classList.add('hopping');
        updateFrogPos(i);
        setTimeout(() => frog.classList.remove('hopping'), 400);
      });

      track.appendChild(tickWrap);
    }

    lineWrapper.appendChild(track);
    container.appendChild(lineWrapper);
  } else {
    // Visual Groups
    const groupsWrap = document.createElement('div');
    groupsWrap.style.display = 'flex';
    groupsWrap.style.alignItems = 'center';
    groupsWrap.style.gap = '20px';
    groupsWrap.style.padding = '16px';
    groupsWrap.style.flexWrap = 'wrap';
    groupsWrap.style.justifyContent = 'center';

    const createGroup = (count, emoji, bg) => {
      const box = document.createElement('div');
      box.style.display = 'flex';
      box.style.gap = '8px';
      box.style.background = bg;
      box.style.padding = '12px 16px';
      box.style.borderRadius = '16px';
      box.style.fontSize = '2rem';
      for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.textContent = emoji;
        box.appendChild(span);
      }
      return box;
    };

    groupsWrap.appendChild(createGroup(question.num1, '⭐️', '#fef9c3'));

    const plusSign = document.createElement('span');
    plusSign.style.fontSize = '2.5rem';
    plusSign.style.fontWeight = 'bold';
    plusSign.style.color = 'var(--primary-coral)';
    plusSign.textContent = '+';
    groupsWrap.appendChild(plusSign);

    groupsWrap.appendChild(createGroup(question.num2, '🌟', '#fee2e2'));

    container.appendChild(groupsWrap);
  }

  // Choices
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.correctAnswer, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
