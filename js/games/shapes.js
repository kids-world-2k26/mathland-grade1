// Shapes & Pattern Train Game Module
// Bám sát Bài 7, 8, 9, 19, 40 SGK Toán 1: Hình phẳng, Thực hành lắp ghép & Quy luật
import { sounds } from '../audio.js';

const SHAPES = [
  { id: 'circle', name: 'Hình tròn', icon: '⚪️', sides: 'đường cong tròn trịa (0 cạnh thẳng)', color: '#ef4444' },
  { id: 'square', name: 'Hình vuông', icon: '🟦', sides: '4 cạnh bằng nhau', color: '#3b82f6' },
  { id: 'triangle', name: 'Hình tam giác', icon: '🔺', sides: '3 góc và 3 cạnh', color: '#10b981' },
  { id: 'rectangle', name: 'Hình chữ nhật', icon: '🟩', sides: '4 cạnh (2 dài, 2 ngắn)', color: '#f59e0b' },
  { id: 'star', name: 'Hình ngôi sao', icon: '⭐️', sides: '5 cánh nhọn xinh', color: '#eab308' },
  { id: 'diamond', name: 'Hình thoi', icon: '🔶', sides: '4 cạnh nghiêng', color: '#a855f7' }
];

// Tranh ghép hình nghệ thuật theo Bài 8 & 19 SGK Toán 1
const COMPOUND_PICTURES = [
  {
    name: 'Ngôi Nhà Mơ Ước',
    icon: '🏠',
    desc: 'Mái nhà hình tam giác đỏ, thân nhà hình vuông xanh, cửa chính hình chữ nhật vàng, cửa sổ hình tròn.',
    counts: { 'Hình tam giác': 1, 'Hình vuông': 1, 'Hình chữ nhật': 2, 'Hình tròn': 2 },
    svg: `
      <svg width="220" height="180" viewBox="0 0 220 180" style="margin: auto;">
        <!-- Roof Triangle -->
        <polygon points="110,20 30,80 190,80" fill="#ef4444" stroke="#b91c1c" stroke-width="3" />
        <!-- House Body Square -->
        <rect x="40" y="80" width="140" height="90" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3" />
        <!-- Door Rectangle -->
        <rect x="90" y="110" width="40" height="60" fill="#f59e0b" stroke="#b45309" stroke-width="2.5" />
        <!-- Window Circles -->
        <circle cx="65" cy="115" r="14" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5" />
        <circle cx="155" cy="115" r="14" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5" />
        <!-- Chimney Rectangle -->
        <rect x="145" y="30" width="20" height="35" fill="#f97316" stroke="#c2410c" stroke-width="2" />
      </svg>
    `
  },
  {
    name: 'Chú Robot Thông Thái',
    icon: '🤖',
    desc: 'Đầu hình vuông, tai hình tròn, mắt hình tròn, thân hình chữ nhật, 2 chân hình chữ nhật.',
    counts: { 'Hình tam giác': 2, 'Hình vuông': 1, 'Hình chữ nhật': 3, 'Hình tròn': 4 },
    svg: `
      <svg width="220" height="190" viewBox="0 0 220 190" style="margin: auto;">
        <!-- Antennas Triangle -->
        <polygon points="85,15 75,35 95,35" fill="#10b981" stroke="#047857" stroke-width="2" />
        <polygon points="135,15 125,35 145,35" fill="#10b981" stroke="#047857" stroke-width="2" />
        <!-- Head Square -->
        <rect x="70" y="35" width="80" height="50" rx="4" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3" />
        <!-- Ears Circles -->
        <circle cx="60" cy="60" r="10" fill="#ec4899" stroke="#be185d" stroke-width="2" />
        <circle cx="160" cy="60" r="10" fill="#ec4899" stroke="#be185d" stroke-width="2" />
        <!-- Eyes Circles -->
        <circle cx="92" cy="55" r="8" fill="#ffffff" stroke="#1e293b" stroke-width="2" />
        <circle cx="128" cy="55" r="8" fill="#ffffff" stroke="#1e293b" stroke-width="2" />
        <!-- Body Rectangle -->
        <rect x="65" y="90" width="90" height="60" fill="#f59e0b" stroke="#d97706" stroke-width="3" />
        <!-- Legs Rectangles -->
        <rect x="80" y="153" width="20" height="32" fill="#6366f1" stroke="#4338ca" stroke-width="2" />
        <rect x="120" y="153" width="20" height="32" fill="#6366f1" stroke="#4338ca" stroke-width="2" />
      </svg>
    `
  },
  {
    name: 'Chiếc Thuyền Buồm',
    icon: '⛵️',
    desc: 'Cánh buồm hình tam giác, thân thuyền hình chữ nhật lượn sóng.',
    counts: { 'Hình tam giác': 3, 'Hình vuông': 1, 'Hình chữ nhật': 1, 'Hình tròn': 2 },
    svg: `
      <svg width="220" height="180" viewBox="0 0 220 180" style="margin: auto;">
        <!-- Mast Line/Rectangle -->
        <rect x="106" y="25" width="8" height="95" fill="#78350f" />
        <!-- Big Sail Triangle -->
        <polygon points="116,30 180,105 116,105" fill="#ef4444" stroke="#b91c1c" stroke-width="2.5" />
        <!-- Small Sail Triangle -->
        <polygon points="104,45 50,105 104,105" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2.5" />
        <!-- Flag Triangle -->
        <polygon points="114,25 140,35 114,45" fill="#facc15" stroke="#ca8a04" stroke-width="2" />
        <!-- Boat Hull Rectangle/Trapezoid -->
        <polygon points="35,120 185,120 160,155 60,155" fill="#f59e0b" stroke="#d97706" stroke-width="3" />
        <!-- Porthole Circles -->
        <circle cx="90" cy="138" r="8" fill="#ffffff" stroke="#0284c7" stroke-width="2" />
        <circle cx="130" cy="138" r="8" fill="#ffffff" stroke="#0284c7" stroke-width="2" />
        <!-- Flag post box Square -->
        <rect x="102" y="115" width="16" height="12" fill="#10b981" stroke="#047857" stroke-width="1.5" />
      </svg>
    `
  }
];

export function generateShapesQuestion() {
  const mode = Math.floor(Math.random() * 3);

  if (mode === 0) {
    // Mode 0: Đếm hình trong tranh ghép (Bài 8 & 19 SGK)
    const pic = COMPOUND_PICTURES[Math.floor(Math.random() * COMPOUND_PICTURES.length)];
    const shapeTypes = Object.keys(pic.counts);
    const targetShape = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const count = pic.counts[targetShape];

    const choices = [count];
    while (choices.length < 3) {
      const dist = Math.max(1, Math.min(5, count + (Math.random() > 0.5 ? 1 : -1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'compound',
      pic,
      targetShape,
      count,
      correctAnswer: count,
      choices,
      promptText: `Bức tranh "${pic.name}" có bao nhiêu ${targetShape}?`,
      hintText: `Bé nhìn kỹ các chi tiết trong hình để đếm đúng số lượng ${targetShape} nhé!`
    };
  } else if (mode === 1) {
    // Mode 1: Toa tàu quy luật hình học (Pattern Train)
    const pool = ['🍎', '🍌', '🍇', '🍓', '🍊', '🌟', '🎈', '🚗', '🔷', '🌸'];
    const itemA = pool[Math.floor(Math.random() * pool.length)];
    let itemB = pool[Math.floor(Math.random() * pool.length)];
    while (itemB === itemA) itemB = pool[Math.floor(Math.random() * pool.length)];

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
    while (choices.includes(other)) other = pool[Math.floor(Math.random() * pool.length)];
    choices.push(other);
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'pattern',
      sequence,
      nextItem,
      correctAnswer: nextItem,
      choices,
      promptText: `Hình nào tiếp theo trên toa tàu quy luật?`,
      hintText: `Bé hãy đọc to chuỗi hình lên để nhận ra giai điệu quy luật nhé!`
    };
  } else {
    // Mode 2: Nhận biết đặc điểm hình học phẳng (Bài 7 SGK)
    const target = SHAPES[Math.floor(Math.random() * SHAPES.length)];

    const choices = [target.name];
    while (choices.length < 3) {
      const other = SHAPES[Math.floor(Math.random() * SHAPES.length)].name;
      if (!choices.includes(other)) choices.push(other);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'identifier',
      target,
      correctAnswer: target.name,
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

  if (question.mode === 'compound') {
    const card = document.createElement('div');
    card.style.background = 'white';
    card.style.borderRadius = '24px';
    card.style.padding = '20px 24px';
    card.style.boxShadow = 'var(--shadow-md)';
    card.style.border = '3px solid #cbd5e1';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    card.style.margin = '14px 0';
    card.style.maxWidth = '420px';

    card.innerHTML = `
      <div style="margin-bottom: 12px;">${question.pic.svg}</div>
      <div style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #1e293b;">
        ${question.pic.name}
      </div>
      <div style="font-size: 0.95rem; color: #64748b; text-align: center; margin-top: 4px;">
        ${question.pic.desc}
      </div>
    `;
    container.appendChild(card);
  } else if (question.mode === 'pattern') {
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
  } else {
    // Mode Identifier
    const displayBox = document.createElement('div');
    displayBox.style.fontSize = '5.5rem';
    displayBox.style.margin = '24px 0';
    displayBox.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))';
    displayBox.textContent = question.target.icon;
    container.appendChild(displayBox);
  }

  // Choices
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.fontSize = '1.3rem';
    btn.textContent = choice;
    btn.addEventListener('click', () => {
      onAnswer(choice === question.correctAnswer, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
