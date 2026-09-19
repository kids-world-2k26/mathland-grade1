// Subtraction Fun: Interactive Balloon Pop & Chain Subtraction Module
// Bám sát Bài 11, 12, 13 SGK Toán 1: Phép trừ trong phạm vi 10 & Bảng trừ
import { sounds } from '../audio.js';

export function generateSubtractionQuestion() {
  const mode = Math.floor(Math.random() * 3);

  if (mode === 0) {
    // Mode 0: Phép trừ 3 số liên tiếp (Bài 12 & 13 SGK: a - b - c = ?)
    const a = Math.floor(Math.random() * 4) + 7; // 7 to 10
    const b = Math.floor(Math.random() * 3) + 1; // 1 to 3
    const maxC = a - b - 1;
    const c = Math.floor(Math.random() * maxC) + 1;
    const answer = a - b - c;

    const choices = [answer];
    while (choices.length < 3) {
      const dist = Math.max(0, Math.min(a, answer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'chain_sub',
      a, b, c, answer,
      correctAnswer: answer,
      choices,
      promptText: `Tính phép trừ liên tiếp: ${a} - ${b} - ${c} = ?`,
      hintText: `Bé trừ từ trái sang phải: tính ${a} - ${b} trước, rồi trừ tiếp cho ${c} nhé!`
    };
  } else if (mode === 1) {
    // Mode 1: Điền số thích hợp vào phép trừ (a - ? = ans)
    const total = Math.floor(Math.random() * 6) + 4; // 4 to 9
    const missingNum = Math.floor(Math.random() * (total - 1)) + 1;
    const answer = total - missingNum;

    const choices = [missingNum];
    while (choices.length < 3) {
      const dist = Math.max(1, Math.min(total, missingNum + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'fill_missing',
      total, missingNum, answer,
      correctAnswer: missingNum,
      choices,
      promptText: `Điền số thích hợp vào dấu hỏi chấm: ${total} - ? = ${answer}`,
      hintText: `${total} bớt đi mấy thì còn lại ${answer} nhỉ bé?`
    };
  } else {
    // Mode 2: Interactive Balloon Pop
    const total = Math.floor(Math.random() * 6) + 4; // 4 to 9
    const takeAway = Math.floor(Math.random() * (total - 1)) + 1;
    const answer = total - takeAway;

    const choices = [answer];
    while (choices.length < 3) {
      const dist = Math.max(0, Math.min(total, answer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'balloon',
      total,
      takeAway,
      answer,
      correctAnswer: answer,
      choices,
      promptText: `Bé bấm nổ ${takeAway} quả bóng bay! ${total} - ${takeAway} bằng bao nhiêu?`,
      hintText: `Bé hãy bấm vào các quả bóng để làm nổ, rồi đếm số bóng còn bay nhé!`
    };
  }
}

export function renderSubtractionStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  if (question.mode === 'chain_sub') {
    const card = document.createElement('div');
    card.style.background = 'white';
    card.style.borderRadius = '24px';
    card.style.padding = '24px 30px';
    card.style.boxShadow = 'var(--shadow-md)';
    card.style.border = '3px solid #fca5a5';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.gap = '16px';
    card.style.margin = '20px 0';
    card.style.fontFamily = 'var(--font-heading)';
    card.style.fontSize = '2.2rem';
    card.style.fontWeight = '800';
    card.style.color = '#991b1b';

    card.innerHTML = `
      <span>${question.a}</span>
      <span style="color: #ef4444;">-</span>
      <span>${question.b}</span>
      <span style="color: #ef4444;">-</span>
      <span>${question.c}</span>
      <span style="color: #ef4444;">=</span>
      <span style="color: #d97706; background: #fef3c7; border: 2px dashed #f59e0b; padding: 4px 18px; border-radius: 16px;">?</span>
    `;
    container.appendChild(card);
  } else if (question.mode === 'fill_missing') {
    const card = document.createElement('div');
    card.style.background = 'white';
    card.style.borderRadius = '24px';
    card.style.padding = '24px 30px';
    card.style.boxShadow = 'var(--shadow-md)';
    card.style.border = '3px solid #fbcfe8';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.gap = '16px';
    card.style.margin = '20px 0';
    card.style.fontFamily = 'var(--font-heading)';
    card.style.fontSize = '2.4rem';
    card.style.fontWeight = '800';
    card.style.color = '#9d174d';

    card.innerHTML = `
      <span>${question.total}</span>
      <span style="color: #ec4899;">-</span>
      <span style="color: #ef4444; background: #fee2e2; border: 2px dashed #ef4444; padding: 4px 20px; border-radius: 16px;">?</span>
      <span style="color: #ec4899;">=</span>
      <span>${question.answer}</span>
    `;
    container.appendChild(card);
  } else {
    // Mode Balloon
    const balloonGroup = document.createElement('div');
    balloonGroup.className = 'balloon-group';

    let poppedCount = 0;
    const counterBadge = document.createElement('div');
    counterBadge.style.fontFamily = 'var(--font-heading)';
    counterBadge.style.fontSize = '1.15rem';
    counterBadge.style.color = '#dc2626';
    counterBadge.style.fontWeight = '700';
    counterBadge.style.marginBottom = '12px';
    counterBadge.textContent = `Đã bấm nổ: 0 / ${question.takeAway} quả bóng`;

    for (let i = 0; i < question.total; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon-item';
      balloon.textContent = '🎈';

      balloon.addEventListener('click', () => {
        if (!balloon.classList.contains('popped')) {
          sounds.playPop();
          balloon.classList.add('popped');
          poppedCount++;
          counterBadge.textContent = `Đã bấm nổ: ${poppedCount} / ${question.takeAway} quả bóng`;
        }
      });

      balloonGroup.appendChild(balloon);
    }

    container.appendChild(counterBadge);
    container.appendChild(balloonGroup);
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
