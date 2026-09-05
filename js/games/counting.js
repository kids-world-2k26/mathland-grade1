// Counting & Ten-Frame Manipulatives Game Module
import { sounds } from '../audio.js';

const COUNT_ICONS = ['🍎', '⭐️', '🐥', '🧸', '🚗', '🍓', '🐸', '🚀', '🍩', '🦋'];

export function generateCountingQuestion() {
  const isTenFrame = Math.random() > 0.45;
  const targetNumber = Math.floor(Math.random() * 10) + 1; // 1 to 10 for Grade 1
  const icon = COUNT_ICONS[Math.floor(Math.random() * COUNT_ICONS.length)];

  // Generate 3 choices (1 correct, 2 distractors)
  const choices = [targetNumber];
  while (choices.length < 3) {
    const distractor = Math.max(1, Math.min(10, targetNumber + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
    if (!choices.includes(distractor)) {
      choices.push(distractor);
    }
  }
  choices.sort(() => Math.random() - 0.5);

  return {
    isTenFrame,
    targetNumber,
    icon,
    choices,
    promptText: isTenFrame ? `Có bao nhiêu chấm tròn trong Khung 10 ô?` : `Bé hãy đếm xem có bao nhiêu ${icon}?`,
    hintText: `Bé có thể bấm vào từng hình khi đếm để khỏi bị sót nhé!`
  };
}

export function renderCountingStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  if (question.isTenFrame) {
    // Render Ten Frame
    const frameContainer = document.createElement('div');
    frameContainer.className = 'ten-frame-container';

    const frameGrid = document.createElement('div');
    frameGrid.className = 'ten-frame-grid';

    for (let i = 0; i < 10; i++) {
      const cell = document.createElement('div');
      cell.className = 'ten-frame-cell';
      if (i < question.targetNumber) {
        const token = document.createElement('div');
        token.className = 'counter-token token-red';
        cell.appendChild(token);
      }
      cell.addEventListener('click', () => {
        sounds.playPop();
      });
      frameGrid.appendChild(cell);
    }

    frameContainer.appendChild(frameGrid);
    container.appendChild(frameContainer);
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
