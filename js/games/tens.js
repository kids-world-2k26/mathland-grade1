// Tens and Ones / Two-digit numbers Module (Chục & Đơn Vị - Số Có Hai Chữ Số)
// Theo Bài 21 & 22 - SGK Toán 1 Tập 2 Kết Nối Tri Thức Với Cuộc Sống
import { sounds } from '../audio.js';

export function generateTensQuestion() {
  const mode = Math.floor(Math.random() * 3);

  if (mode === 0) {
    // 1 chục và X đơn vị là số mấy?
    const ones = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const total = 10 + ones;

    const choices = [total];
    while (choices.length < 3) {
      const dist = Math.max(10, Math.min(20, total + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(dist)) {
        choices.push(dist);
      }
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 0,
      ones,
      total,
      choices,
      correctAnswer: total,
      promptText: `1 chục và ${ones} đơn vị là số mấy?`,
      hintText: `1 chục là 10, thêm ${ones} nữa là số ${total} nhé!`
    };
  } else if (mode === 1) {
    // Đọc số đặc biệt: 11, 14, 15, 20
    const numbers = [
      { num: 11, read: 'Mười một', wrong: ['Mười mốt', 'Mười một mốt'] },
      { num: 14, read: 'Mười bốn', wrong: ['Mười tư', 'Một bốn'] },
      { num: 15, read: 'Mười lăm', wrong: ['Mười năm', 'Một năm'] },
      { num: 20, read: 'Hai mươi', wrong: ['Hai chục mốt', 'Mười hai'] }
    ];
    const item = numbers[Math.floor(Math.random() * numbers.length)];
    const choices = [item.read, ...item.wrong].slice(0, 3);
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 1,
      num: item.num,
      choices,
      correctAnswer: item.read,
      promptText: `Số ${item.num} đọc là gì?`,
      hintText: `Bé đọc phát âm chuẩn tiếng Việt lớp 1 nhé!`
    };
  } else {
    // Số tròn chục (10, 20, 30, ..., 90)
    const bags = Math.floor(Math.random() * 5) + 2; // 2 to 6 bags
    const total = bags * 10;

    const choices = [total];
    while (choices.length < 3) {
      const dist = Math.max(10, Math.min(90, (bags + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)) * 10));
      if (!choices.includes(dist)) {
        choices.push(dist);
      }
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 2,
      bags,
      total,
      choices,
      correctAnswer: total,
      promptText: `Có ${bags} túi cà chua, mỗi túi có 10 quả (1 chục). Có tất cả bao nhiêu quả?`,
      hintText: `Đếm tròn chục: ${bags} chục là ${total} quả cà chua nè!`
    };
  }
}

export function renderTensStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  const visualBox = document.createElement('div');
  visualBox.style.background = '#fffbeb';
  visualBox.style.borderRadius = '24px';
  visualBox.style.border = '3px solid #fde68a';
  visualBox.style.padding = '20px 24px';
  visualBox.style.marginBottom = '20px';
  visualBox.style.display = 'flex';
  visualBox.style.flexWrap = 'wrap';
  visualBox.style.alignItems = 'center';
  visualBox.style.justifyContent = 'center';
  visualBox.style.gap = '16px';
  visualBox.style.boxShadow = '0 6px 14px rgba(245, 158, 11, 0.1)';

  if (question.mode === 0) {
    // 1 bag of 10 tomatoes + loose tomatoes
    const bag = document.createElement('div');
    bag.style.background = '#fee2e2';
    bag.style.borderRadius = '18px';
    bag.style.padding = '10px 16px';
    bag.style.display = 'flex';
    bag.style.alignItems = 'center';
    bag.style.gap = '8px';
    bag.innerHTML = `<span style="font-size: 2.5rem;">🛍️</span> <span style="font-family: var(--font-heading); font-weight: 700; color: #b91c1c; font-size: 1.2rem;">1 Chục (10 🍅)</span>`;

    const plus = document.createElement('span');
    plus.textContent = '+';
    plus.style.fontSize = '2rem';
    plus.style.fontFamily = 'var(--font-heading)';
    plus.style.color = '#ca8a04';

    const loose = document.createElement('div');
    loose.style.display = 'flex';
    loose.style.gap = '6px';
    loose.style.fontSize = '2.2rem';
    for (let i = 0; i < question.ones; i++) {
      loose.innerHTML += '<span>🍅</span>';
    }

    visualBox.appendChild(bag);
    visualBox.appendChild(plus);
    visualBox.appendChild(loose);
  } else if (question.mode === 1) {
    // Number display
    const numDisplay = document.createElement('div');
    numDisplay.style.fontSize = '4.5rem';
    numDisplay.style.fontFamily = 'var(--font-heading)';
    numDisplay.style.fontWeight = '700';
    numDisplay.style.color = '#b45309';
    numDisplay.textContent = question.num.toString();
    visualBox.appendChild(numDisplay);
  } else {
    // Multiple bags of 10
    for (let i = 0; i < question.bags; i++) {
      const bag = document.createElement('div');
      bag.style.fontSize = '2.6rem';
      bag.title = '10 quả cà chua';
      bag.innerHTML = '<span>🛍️</span>';
      visualBox.appendChild(bag);
    }
  }

  container.appendChild(visualBox);

  // Choices Row
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.fontSize = typeof val === 'number' ? '2.2rem' : '1.4rem';
    btn.style.minWidth = typeof val === 'number' ? '90px' : '140px';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.correctAnswer, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
