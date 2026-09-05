// Measurement & Length Module (Dài Hơn - Ngắn Hơn & Đo Xăng-ti-mét)
import { sounds } from '../audio.js';

export function generateMeasurementQuestion() {
  const isRulerMode = Math.random() > 0.45;

  if (isRulerMode) {
    // Mode B: Ruler measurement in cm
    const lengthCm = Math.floor(Math.random() * 7) + 3; // 3 to 9 cm
    const items = [
      { name: 'bút chì', emoji: '✏️', color: '#f59e0b' },
      { name: 'bút sáp màu', emoji: '🖍️', color: '#ef4444' },
      { name: 'cục gôm tẩy', emoji: '🧼', color: '#06b6d4' },
      { name: 'chiếc muỗng', emoji: '🥄', color: '#8b5cf6' }
    ];
    const item = items[Math.floor(Math.random() * items.length)];

    const choices = [`${lengthCm} cm`];
    while (choices.length < 3) {
      const dist = Math.max(1, Math.min(10, lengthCm + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      const distStr = `${dist} cm`;
      if (!choices.includes(distStr)) {
        choices.push(distStr);
      }
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      isRulerMode: true,
      lengthCm,
      item,
      choices,
      correctAnswer: `${lengthCm} cm`,
      promptText: `Cây ${item.name} dài bao nhiêu xăng-ti-mét (cm)?`,
      hintText: `Bé nhìn điểm đầu ở vạch số 0, điểm cuối chỉ đến vạch số mấy nhé!`
    };
  } else {
    // Mode A: Compare longer / shorter
    const askLonger = Math.random() > 0.5;
    const lenA = Math.floor(Math.random() * 4) + 6; // 6 to 9 (đại diện dài)
    const lenB = Math.floor(Math.random() * 3) + 2; // 2 to 4 (đại diện ngắn)

    const isLeftLonger = Math.random() > 0.5;
    const item1Len = isLeftLonger ? lenA : lenB;
    const item2Len = isLeftLonger ? lenB : lenA;

    const targetLabel = askLonger
      ? (isLeftLonger ? 'Bút chì A (Màu đỏ)' : 'Bút chì B (Màu xanh)')
      : (isLeftLonger ? 'Bút chì B (Màu xanh)' : 'Bút chì A (Màu đỏ)');

    return {
      isRulerMode: false,
      askLonger,
      item1Len,
      item2Len,
      choices: ['Bút chì A (Màu đỏ)', 'Bút chì B (Màu xanh)'],
      correctAnswer: targetLabel,
      promptText: askLonger ? `Cây bút chì nào DÀI HƠN?` : `Cây bút chì nào NGẮN HƠN?`,
      hintText: askLonger ? `Cây bút nào vươn dài sang bên phải nhiều hơn là dài hơn nhé!` : `Cây bút nào ngắn hơn nhìn sẽ nhỏ gọn hơn nè!`
    };
  }
}

export function renderMeasurementStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  if (question.isRulerMode) {
    // Render ruler and measuring object
    const stageBox = document.createElement('div');
    stageBox.style.width = '100%';
    stageBox.style.maxWidth = '550px';
    stageBox.style.padding = '20px 10px';
    stageBox.style.display = 'flex';
    stageBox.style.flexDirection = 'column';
    stageBox.style.gap = '16px';

    // Object bar
    const objectBar = document.createElement('div');
    objectBar.style.height = '48px';
    objectBar.style.borderRadius = '12px';
    objectBar.style.background = `linear-gradient(90deg, ${question.item.color}, #fca5a5)`;
    objectBar.style.width = `${(question.lengthCm / 10) * 100}%`;
    objectBar.style.display = 'flex';
    objectBar.style.alignItems = 'center';
    objectBar.style.paddingLeft = '12px';
    objectBar.style.fontSize = '1.8rem';
    objectBar.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
    objectBar.style.transition = 'width 0.3s ease';
    objectBar.innerHTML = `<span>${question.item.emoji}</span>`;

    // Ruler (Thước kẻ chia vạch cm)
    const ruler = document.createElement('div');
    ruler.style.position = 'relative';
    ruler.style.width = '100%';
    ruler.style.height = '64px';
    ruler.style.background = '#fef3c7';
    ruler.style.borderRadius = '10px';
    ruler.style.border = '3px solid #d97706';
    ruler.style.display = 'flex';
    ruler.style.justifyContent = 'space-between';
    ruler.style.boxShadow = '0 8px 16px rgba(217, 119, 6, 0.15)';

    for (let i = 0; i <= 10; i++) {
      const tickCol = document.createElement('div');
      tickCol.style.display = 'flex';
      tickCol.style.flexDirection = 'column';
      tickCol.style.alignItems = 'center';
      tickCol.style.position = 'relative';
      tickCol.style.width = '2px';

      const tickMark = document.createElement('div');
      tickMark.style.width = '3px';
      tickMark.style.height = i % 5 === 0 ? '24px' : '14px';
      tickMark.style.background = '#78350f';

      const tickLabel = document.createElement('span');
      tickLabel.style.fontFamily = 'var(--font-heading)';
      tickLabel.style.fontSize = '1rem';
      tickLabel.style.fontWeight = '700';
      tickLabel.style.color = '#78350f';
      tickLabel.style.marginTop = '4px';
      tickLabel.textContent = i.toString();

      tickCol.appendChild(tickMark);
      tickCol.appendChild(tickLabel);
      ruler.appendChild(tickCol);
    }

    stageBox.appendChild(objectBar);
    stageBox.appendChild(ruler);
    container.appendChild(stageBox);
  } else {
    // Mode A: Compare 2 pencils
    const compareBox = document.createElement('div');
    compareBox.style.width = '100%';
    compareBox.style.maxWidth = '550px';
    compareBox.style.display = 'flex';
    compareBox.style.flexDirection = 'column';
    compareBox.style.gap = '20px';
    compareBox.style.padding = '10px';

    // Pencil A
    const rowA = document.createElement('div');
    rowA.style.display = 'flex';
    rowA.style.alignItems = 'center';
    rowA.style.gap = '14px';
    const labelA = document.createElement('span');
    labelA.style.fontFamily = 'var(--font-heading)';
    labelA.style.fontSize = '1.2rem';
    labelA.style.fontWeight = '700';
    labelA.style.color = '#dc2626';
    labelA.style.minWidth = '80px';
    labelA.textContent = 'Bút chì A:';

    const barA = document.createElement('div');
    barA.style.height = '42px';
    barA.style.width = `${(question.item1Len / 10) * 100}%`;
    barA.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
    barA.style.borderRadius = '12px';
    barA.style.display = 'flex';
    barA.style.alignItems = 'center';
    barA.style.paddingLeft = '10px';
    barA.style.fontSize = '1.6rem';
    barA.style.boxShadow = '0 4px 8px rgba(0,0,0,0.08)';
    barA.innerHTML = '<span>✏️</span>';

    rowA.appendChild(labelA);
    rowA.appendChild(barA);

    // Pencil B
    const rowB = document.createElement('div');
    rowB.style.display = 'flex';
    rowB.style.alignItems = 'center';
    rowB.style.gap = '14px';
    const labelB = document.createElement('span');
    labelB.style.fontFamily = 'var(--font-heading)';
    labelB.style.fontSize = '1.2rem';
    labelB.style.fontWeight = '700';
    labelB.style.color = '#2563eb';
    labelB.style.minWidth = '80px';
    labelB.textContent = 'Bút chì B:';

    const barB = document.createElement('div');
    barB.style.height = '42px';
    barB.style.width = `${(question.item2Len / 10) * 100}%`;
    barB.style.background = 'linear-gradient(90deg, #3b82f6, #60a5fa)';
    barB.style.borderRadius = '12px';
    barB.style.display = 'flex';
    barB.style.alignItems = 'center';
    barB.style.paddingLeft = '10px';
    barB.style.fontSize = '1.6rem';
    barB.style.boxShadow = '0 4px 8px rgba(0,0,0,0.08)';
    barB.innerHTML = '<span>✏️</span>';

    rowB.appendChild(labelB);
    rowB.appendChild(barB);

    compareBox.appendChild(rowA);
    compareBox.appendChild(rowB);
    container.appendChild(compareBox);
  }

  // Answer Choices Row
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.fontSize = '1.4rem';
    btn.style.minWidth = '140px';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.correctAnswer, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
