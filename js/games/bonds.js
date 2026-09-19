// Number Bonds (Part-Part-Whole & Mấy và Mấy) Game Module for Grade 1
// Bám sát Bài 5 SGK Toán 1: Mấy và mấy (Sơ đồ tách - gộp số)
import { sounds } from '../audio.js';

export function generateBondsQuestion() {
  const mode = Math.random();

  if (mode < 0.4) {
    // Mode 1: Cặp số bạn thân tạo thành 10 (Friends of 10)
    const part1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const part2 = 10 - part1;
    const whole = 10;

    const choices = [part2];
    while (choices.length < 3) {
      const dist = Math.max(1, Math.min(9, part2 + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'ten_friend',
      whole,
      part1,
      part2,
      correctAnswer: part2,
      choices,
      promptText: `Tìm bạn thân tạo thành 10! Số ${part1} và mấy để được 10?`,
      hintText: `Mấy ngón tay gập lại khi giơ ${part1} ngón tay trên cả 2 bàn tay nhỉ?`
    };
  } else if (mode < 0.75) {
    // Mode 2: Standard Part-Part-Whole Diagram (Missing whole, part1, or part2)
    const whole = Math.floor(Math.random() * 7) + 3; // 3 to 9
    const part1 = Math.floor(Math.random() * (whole - 1)) + 1;
    const part2 = whole - part1;

    const rand = Math.random();
    let missing = 'part2';
    let correctAnswer = part2;

    if (rand < 0.33) {
      missing = 'whole';
      correctAnswer = whole;
    } else if (rand < 0.66) {
      missing = 'part1';
      correctAnswer = part1;
    }

    const choices = [correctAnswer];
    while (choices.length < 3) {
      const dist = Math.max(0, Math.min(10, correctAnswer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    let promptText = '';
    if (missing === 'whole') {
      promptText = `Gộp ${part1} và ${part2} được số mấy ở trên cùng?`;
    } else {
      promptText = `Tách ${whole} gồm ${missing === 'part1' ? part2 : part1} và mấy?`;
    }

    return {
      mode: 'classic_bond',
      whole,
      part1,
      part2,
      missing,
      correctAnswer,
      choices,
      promptText,
      hintText: missing === 'whole'
        ? `Cộng ${part1} + ${part2} để tìm số tổng ở trên nhé!`
        : `Số mấy cộng với ${missing === 'part1' ? part2 : part1} thì bằng ${whole} nhỉ?`
    };
  } else {
    // Mode 3: Tách đồ vật trực quan (Visual Item Splitting)
    const items = ['🍎', '⭐️', '🍓', '🥕', '🌸', '🎈'];
    const emoji = items[Math.floor(Math.random() * items.length)];
    const whole = Math.floor(Math.random() * 5) + 4; // 4 to 8
    const leftCount = Math.floor(Math.random() * (whole - 2)) + 1; // 1 to whole-2
    const rightCount = whole - leftCount;

    const choices = [rightCount];
    while (choices.length < 3) {
      const dist = Math.max(1, Math.min(whole, rightCount + (Math.random() > 0.5 ? 1 : -1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'visual_split',
      whole,
      leftCount,
      rightCount,
      emoji,
      correctAnswer: rightCount,
      choices,
      promptText: `Có tất cả ${whole} ${emoji}. Bên trái có ${leftCount} ${emoji}, hỏi bên phải có mấy ${emoji}?`,
      hintText: `Bé lấy tổng ${whole} bớt đi ${leftCount} ở bên trái nhé!`
    };
  }
}

export function renderBondsStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  if (question.mode === 'visual_split') {
    const splitCard = document.createElement('div');
    splitCard.style.background = 'white';
    splitCard.style.borderRadius = '24px';
    splitCard.style.padding = '20px 24px';
    splitCard.style.boxShadow = 'var(--shadow-md)';
    splitCard.style.border = '3px solid #cbd5e1';
    splitCard.style.display = 'flex';
    splitCard.style.alignItems = 'center';
    splitCard.style.gap = '20px';
    splitCard.style.margin = '16px 0';
    splitCard.style.flexWrap = 'wrap';
    splitCard.style.justifyContent = 'center';

    splitCard.innerHTML = `
      <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 16px; padding: 12px 18px; text-align: center;">
        <div style="font-size: 2rem;">${question.emoji.repeat(question.leftCount)}</div>
        <div style="font-weight: 700; color: #166534; margin-top: 4px;">Bên trái: ${question.leftCount}</div>
      </div>
      <div style="font-size: 2rem; font-weight: 800; color: #64748b;">+</div>
      <div style="background: #fefce8; border: 2px dashed #fde047; border-radius: 16px; padding: 12px 24px; text-align: center;">
        <div style="font-size: 2.2rem; font-weight: 900; color: #ca8a04;">?</div>
        <div style="font-weight: 700; color: #854d0e; margin-top: 4px;">Bên phải: ?</div>
      </div>
      <div style="font-size: 2rem; font-weight: 800; color: #64748b;">=</div>
      <div style="background: #eff6ff; border: 2px solid #93c5fd; border-radius: 16px; padding: 12px 18px; text-align: center;">
        <div style="font-size: 1.8rem;">${question.emoji.repeat(question.whole)}</div>
        <div style="font-weight: 700; color: #1e40af; margin-top: 4px;">Tổng: ${question.whole}</div>
      </div>
    `;
    container.appendChild(splitCard);
  } else {
    // Render classic or ten_friend bond diagram
    const diagram = document.createElement('div');
    diagram.className = 'number-bond-diagram';

    const lineLeft = document.createElement('div');
    lineLeft.className = 'bond-line left';
    const lineRight = document.createElement('div');
    lineRight.className = 'bond-line right';

    const circleWhole = document.createElement('div');
    const isWholeMissing = question.missing === 'whole';
    circleWhole.className = `bond-circle whole ${isWholeMissing ? 'missing' : ''}`;
    circleWhole.textContent = isWholeMissing ? '?' : question.whole;

    const circlePart1 = document.createElement('div');
    const isPart1Missing = question.missing === 'part1';
    circlePart1.className = `bond-circle part-left ${isPart1Missing ? 'missing' : ''}`;
    circlePart1.textContent = isPart1Missing ? '?' : question.part1;

    const circlePart2 = document.createElement('div');
    const isPart2Missing = question.mode === 'ten_friend' || question.missing === 'part2';
    circlePart2.className = `bond-circle part-right ${isPart2Missing ? 'missing' : ''}`;
    circlePart2.textContent = isPart2Missing ? '?' : question.part2;

    diagram.appendChild(lineLeft);
    diagram.appendChild(lineRight);
    diagram.appendChild(circleWhole);
    diagram.appendChild(circlePart1);
    diagram.appendChild(circlePart2);

    container.appendChild(diagram);
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
