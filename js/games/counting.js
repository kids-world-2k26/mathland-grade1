// Counting & Ten-Frame Manipulatives Game Module - Expanded for Grade 1
import { sounds } from '../audio.js';

const COUNT_ICONS = ['🍎', '⭐️', '🐥', '🧸', '🚗', '🍓', '🐸', '🚀', '🍩', '🦋', '🎈', '🐱', '⚽️', '🍦'];

export function generateCountingQuestion() {
  const mode = Math.floor(Math.random() * 4);

  if (mode === 0) {
    // Mode 0: Basic single object count (1-10)
    const targetNumber = Math.floor(Math.random() * 10) + 1;
    const icon = COUNT_ICONS[Math.floor(Math.random() * COUNT_ICONS.length)];

    const choices = [targetNumber];
    while (choices.length < 3) {
      const distractor = Math.max(1, Math.min(10, targetNumber + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(distractor)) choices.push(distractor);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'basic',
      targetNumber,
      icon,
      choices,
      promptText: `Bé hãy đếm xem có tất cả bao nhiêu ${icon}?`,
      hintText: `Bé có thể chạm vào từng hình khi đếm để khỏi bị sót nhé!`
    };
  } else if (mode === 1) {
    // Mode 1: Classic Ten-Frame (1-10)
    const targetNumber = Math.floor(Math.random() * 10) + 1;
    const choices = [targetNumber];
    while (choices.length < 3) {
      const distractor = Math.max(1, Math.min(10, targetNumber + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(distractor)) choices.push(distractor);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'ten_frame_single',
      targetNumber,
      choices,
      promptText: `Có bao nhiêu chấm tròn đỏ trong Khung 10 ô?`,
      hintText: `Hàng trên có 5 ô, hàng dưới có 5 ô, đếm thật nhanh nha bé!`
    };
  } else if (mode === 2) {
    // Mode 2: Two-color Ten-Frame (e.g. red + yellow dots)
    const redCount = Math.floor(Math.random() * 5) + 1; // 1 to 5
    const yellowCount = Math.floor(Math.random() * (10 - redCount)) + 1; // ensures <= 10
    const total = redCount + yellowCount;

    const askType = Math.random() > 0.5 ? 'total' : 'yellow';
    const targetNumber = askType === 'total' ? total : yellowCount;

    const choices = [targetNumber];
    while (choices.length < 3) {
      const dist = Math.max(1, Math.min(10, targetNumber + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'ten_frame_dual',
      redCount,
      yellowCount,
      total,
      askType,
      targetNumber,
      choices,
      promptText: askType === 'total'
        ? `Khung 10 ô có ${redCount} chấm đỏ và ${yellowCount} chấm vàng. Có tất cả bao nhiêu chấm?`
        : `Trong Khung 10 ô, có bao nhiêu chấm tròn VÀNG?`,
      hintText: `Bé hãy đếm theo màu sắc hoặc cộng các chấm lại nhé!`
    };
  } else {
    // Mode 3: Counting by pairs (Đếm theo cặp 2: 2, 4, 6, 8, 10 quả anh đào / đôi giày)
    const pairs = Math.floor(Math.random() * 4) + 2; // 2 to 5 pairs
    const targetNumber = pairs * 2;
    const pairEmoji = '🍒'; // cherries come in pairs

    const choices = [targetNumber];
    while (choices.length < 3) {
      const dist = Math.max(2, Math.min(10, targetNumber + (Math.random() > 0.5 ? 2 : -2)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'pairs',
      pairs,
      targetNumber,
      pairEmoji,
      choices,
      promptText: `Có ${pairs} chùm quả anh đào (mỗi chùm có 2 quả). Hỏi có tất cả bao nhiêu quả?`,
      hintText: `Bé hãy đếm cách 2: 2, 4, 6... nhé!`
    };
  }
}

export function renderCountingStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  if (question.mode === 'ten_frame_single' || question.mode === 'ten_frame_dual') {
    // Render Ten Frame
    const frameContainer = document.createElement('div');
    frameContainer.className = 'ten-frame-container';

    const frameGrid = document.createElement('div');
    frameGrid.className = 'ten-frame-grid';

    for (let i = 0; i < 10; i++) {
      const cell = document.createElement('div');
      cell.className = 'ten-frame-cell';

      if (question.mode === 'ten_frame_single') {
        if (i < question.targetNumber) {
          const token = document.createElement('div');
          token.className = 'counter-token token-red';
          cell.appendChild(token);
        }
      } else {
        // Dual color
        if (i < question.redCount) {
          const token = document.createElement('div');
          token.className = 'counter-token token-red';
          cell.appendChild(token);
        } else if (i < question.redCount + question.yellowCount) {
          const token = document.createElement('div');
          token.className = 'counter-token token-yellow';
          cell.appendChild(token);
        }
      }

      cell.addEventListener('click', () => {
        sounds.playPop();
      });
      frameGrid.appendChild(cell);
    }

    frameContainer.appendChild(frameGrid);
    container.appendChild(frameContainer);
  } else if (question.mode === 'pairs') {
    // Pairs grid
    const grid = document.createElement('div');
    grid.className = 'count-items-grid';
    grid.style.gap = '18px';

    for (let i = 0; i < question.pairs; i++) {
      const pairBox = document.createElement('div');
      pairBox.className = 'clickable-object';
      pairBox.style.fontSize = '2.8rem';
      pairBox.textContent = question.pairEmoji;
      pairBox.addEventListener('click', () => {
        sounds.playPop();
        pairBox.classList.toggle('counted');
      });
      grid.appendChild(pairBox);
    }
    container.appendChild(grid);
  } else {
    // Render Clickable Objects
    const grid = document.createElement('div');
    grid.className = 'count-items-grid';

    for (let i = 0; i < question.targetNumber; i++) {
      const item = document.createElement('span');
      item.className = 'clickable-object';
      item.textContent = question.icon;
      item.addEventListener('click', () => {
        sounds.playPop();
        item.classList.toggle('counted');
      });
      grid.appendChild(item);
    }
    container.appendChild(grid);
  }

  // Render Choices
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.targetNumber, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
