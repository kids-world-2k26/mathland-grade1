// Shapes & Pattern Train Game Module
import { sounds } from '../audio.js';

const SHAPES = [
  { id: 'circle', name: 'Hình tròn', icon: '⚪️', sides: 'đường cong tròn trịa (0 cạnh thẳng)', color: '#ef4444' },
  { id: 'square', name: 'Hình vuông', icon: '🟦', sides: '4 cạnh bằng nhau', color: '#3b82f6' },
  { id: 'triangle', name: 'Hình tam giác', icon: '🔺', sides: '3 góc và 3 cạnh', color: '#10b981' },
  { id: 'rectangle', name: 'Hình chữ nhật', icon: '🟩', sides: '4 cạnh (2 dài, 2 ngắn)', color: '#f59e0b' },
  { id: 'star', name: 'Hình ngôi sao', icon: '⭐️', sides: '5 cánh nhọn xinh', color: '#eab308' },
  { id: 'diamond', name: 'Hình thoi', icon: '🔶', sides: '4 cạnh nghiêng', color: '#a855f7' }
];

export function generateShapesQuestion() {
  const isPattern = Math.random() > 0.5;

  if (isPattern) {
    // Pattern Train Mode
    const pool = ['🍎', '🍌', '🍇', '🍓', '🍊', '🌟', '🎈', '🚗'];
    const itemA = pool[Math.floor(Math.random() * pool.length)];
    let itemB = pool[Math.floor(Math.random() * pool.length)];
    while (itemB === itemA) {
      itemB = pool[Math.floor(Math.random() * pool.length)];
    }

    // Pattern type: ABABAB or AABAAB
    const isAAB = Math.random() > 0.5;
    let sequence = [];
    let nextItem = '';

    if (isAAB) {
      sequence = [itemA, itemA, itemB, itemA, itemA];
      nextItem = itemB;
    } else {
      sequence = [itemA, itemB, itemA, itemB, itemA];
      nextItem = itemB;
    }

    const choices = [nextItem, itemA];
    let other = pool[Math.floor(Math.random() * pool.length)];
    while (choices.includes(other)) {
      other = pool[Math.floor(Math.random() * pool.length)];
    }
    choices.push(other);
    choices.sort(() => Math.random() - 0.5);

    return {
      isPattern: true,
      sequence,
      nextItem,
      choices,
      promptText: `Hình nào tiếp theo trên toa tàu quy luật?`,
      hintText: `Bé hãy đọc to chuỗi hình lên để nhận ra giai điệu quy luật nhé!`
    };
  } else {
    // 2D Shape Identifier Mode
    const target = SHAPES[Math.floor(Math.random() * SHAPES.length)];

    const choices = [target.name];
    while (choices.length < 3) {
      const other = SHAPES[Math.floor(Math.random() * SHAPES.length)].name;
      if (!choices.includes(other)) {
        choices.push(other);
      }
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      isPattern: false,
      target,
      choices,
      promptText: `Đây là hình gì: ${target.icon}?`,
      hintText: `Quan sát các cạnh và góc: ${target.sides}!`
    };
  }
}

export function renderShapesStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  if (question.isPattern) {
    const train = document.createElement('div');
    train.className = 'pattern-train';

    question.sequence.forEach(item => {
      const wagon = document.createElement('div');
      wagon.className = 'train-wagon';
      wagon.textContent = item;
      train.appendChild(wagon);
    });

    const targetWagon = document.createElement('div');
    targetWagon.className = 'train-wagon target';
    targetWagon.textContent = '?';
    train.appendChild(targetWagon);

    container.appendChild(train);

    // Choices
    const choicesRow = document.createElement('div');
    choicesRow.className = 'choices-row';

    question.choices.forEach(val => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = val;
      btn.addEventListener('click', () => {
        targetWagon.textContent = val;
        onAnswer(val === question.nextItem, btn);
      });
      choicesRow.appendChild(btn);
    });

    container.appendChild(choicesRow);
  } else {
    // Single Shape Display
    const shapeArea = document.createElement('div');
    shapeArea.className = 'shape-display-area';

    const iconBox = document.createElement('div');
    iconBox.style.fontSize = '5rem';
    iconBox.style.animation = 'mascotHover 3s infinite alternate';
    iconBox.textContent = question.target.icon;

    shapeArea.appendChild(iconBox);
    container.appendChild(shapeArea);

    // Choices
    const choicesRow = document.createElement('div');
    choicesRow.className = 'choices-row';

    question.choices.forEach(val => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.style.fontSize = '1.3rem';
      btn.style.minWidth = '130px';
      btn.textContent = val;
      btn.addEventListener('click', () => {
        onAnswer(val === question.target.name, btn);
      });
      choicesRow.appendChild(btn);
    });

    container.appendChild(choicesRow);
  }

  return container;
}
