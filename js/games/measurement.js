// Measurement & Length Module (Dài Hơn - Ngắn Hơn & Đo Xăng-ti-mét)
// Bám sát Bài 25, 26, 27, 28 SGK Toán 1 Tập 2 Kết Nối Tri Thức Với Cuộc Sống
import { sounds } from '../audio.js';

export function generateMeasurementQuestion() {
  const mode = Math.floor(Math.random() * 3);

  if (mode === 0) {
    // Mode 0: Phép tính có đơn vị xăng-ti-mét (Bài 26 & 28 SGK)
    const isAdd = Math.random() > 0.5;
    let a, b, ans;

    if (isAdd) {
      a = Math.floor(Math.random() * 5) + 2; // 2 to 6 cm
      b = Math.floor(Math.random() * 4) + 1; // 1 to 4 cm
      ans = a + b;
    } else {
      a = Math.floor(Math.random() * 5) + 5; // 5 to 9 cm
      b = Math.floor(Math.random() * (a - 2)) + 1;
      ans = a - b;
    }

    const correctStr = `${ans} cm`;
    const choices = [correctStr];
    while (choices.length < 3) {
      const dist = Math.max(1, Math.min(12, ans + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      const distStr = `${dist} cm`;
      if (!choices.includes(distStr)) choices.push(distStr);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'cm_math',
      a, b, isAdd, ans,
      correctAnswer: correctStr,
      choices,
      promptText: isAdd ? `Tính: ${a} cm + ${b} cm = ?` : `Tính: ${a} cm - ${b} cm = ?`,
      hintText: `Bé cộng hoặc trừ các con số bình thường, rồi nhớ viết thêm chữ cm đằng sau nhé!`
    };
  } else if (mode === 1) {
    // Mode 1: Thước đo cm (Bài 26 SGK)
    const lengthCm = Math.floor(Math.random() * 7) + 3; // 3 to 9 cm
    const items = [
      { name: 'bút chì', emoji: '✏️', color: '#f59e0b' },
      { name: 'bút sáp màu', emoji: '🖍️', color: '#ef4444' },
      { name: 'cục gôm tẩy', emoji: '🧼', color: '#06b6d4' },
      { name: 'chiếc thìa', emoji: '🥄', color: '#8b5cf6' }
    ];
    const item = items[Math.floor(Math.random() * items.length)];

    const choices = [`${lengthCm} cm`];
    while (choices.length < 3) {
      const dist = Math.max(1, Math.min(10, lengthCm + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      const distStr = `${dist} cm`;
      if (!choices.includes(distStr)) choices.push(distStr);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'ruler',
      lengthCm,
      item,
      choices,
      correctAnswer: `${lengthCm} cm`,
      promptText: `Cây ${item.name} dài bao nhiêu xăng-ti-mét (cm)?`,
      hintText: `Bé nhìn điểm đầu ở vạch số 0, điểm cuối chỉ đến vạch số mấy nhé!`
    };
  } else {
    // Mode 2: So sánh Dài hơn / Ngắn hơn (Bài 25 SGK)
    const askLonger = Math.random() > 0.5;
    const lenA = Math.floor(Math.random() * 4) + 6; // 6 to 9 (dài)
    const lenB = Math.floor(Math.random() * 3) + 2; // 2 to 4 (ngắn)

    const isLeftLonger = Math.random() > 0.5;
    const item1Len = isLeftLonger ? lenA : lenB;
    const item2Len = isLeftLonger ? lenB : lenA;

    const targetLabel = askLonger
      ? (isLeftLonger ? 'Bút chì A (Màu đỏ)' : 'Bút chì B (Màu xanh)')
      : (isLeftLonger ? 'Bút chì B (Màu xanh)' : 'Bút chì A (Màu đỏ)');

    return {
      mode: 'compare_len',
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

  if (question.mode === 'cm_math') {
    const card = document.createElement('div');
    card.style.background = 'white';
    card.style.borderRadius = '24px';
    card.style.padding = '24px 32px';
    card.style.boxShadow = 'var(--shadow-md)';
    card.style.border = '3px solid #67e8f9';
    card.style.margin = '20px 0';
    card.style.fontFamily = 'var(--font-heading)';
    card.style.fontSize = '2.4rem';
    card.style.fontWeight = '800';
    card.style.color = '#0e7490';
    card.style.textAlign = 'center';

    card.innerHTML = `
      <span>${question.a} cm</span>
      <span style="color: ${question.isAdd ? '#10b981' : '#ef4444'}; margin: 0 10px;">${question.isAdd ? '+' : '-'}</span>
      <span>${question.b} cm</span>
      <span style="color: #64748b; margin: 0 10px;">=</span>
      <span style="color: #d97706; background: #fef3c7; border: 2px dashed #f59e0b; padding: 4px 18px; border-radius: 16px;">?</span>
    `;
    container.appendChild(card);
  } else if (question.mode === 'ruler') {
    const stageBox = document.createElement('div');
    stageBox.style.width = '100%';
    stageBox.style.maxWidth = '550px';
    stageBox.style.padding = '20px 10px';
    stageBox.style.display = 'flex';
    stageBox.style.flexDirection = 'column';
    stageBox.style.gap = '16px';

    // Object bar
    const objBox = document.createElement('div');
    objBox.style.display = 'flex';
    objBox.style.alignItems = 'center';
    objBox.style.height = '48px';
    objBox.style.position = 'relative';

    const objectBar = document.createElement('div');
    const widthPct = (question.lengthCm / 10) * 100;
    objectBar.style.width = `${widthPct}%`;
    objectBar.style.height = '36px';
    objectBar.style.background = question.item.color;
    objectBar.style.borderRadius = '8px';
    objectBar.style.display = 'flex';
    objectBar.style.alignItems = 'center';
    objectBar.style.justifyContent = 'space-between';
    objectBar.style.padding = '0 8px';
    objectBar.style.boxShadow = 'var(--shadow-sm)';
    objectBar.innerHTML = `<span style="font-size: 1.4rem;">${question.item.emoji}</span><span style="font-weight: 700; color: white; font-size: 0.9rem;">${question.item.name}</span>`;

    objBox.appendChild(objectBar);
    stageBox.appendChild(objBox);

    // Ruler
    const ruler = document.createElement('div');
    ruler.className = 'cm-ruler';
    ruler.style.display = 'flex';
    ruler.style.width = '100%';
    ruler.style.background = '#fef08a';
    ruler.style.border = '2px solid #ca8a04';
    ruler.style.borderRadius = '6px';
    ruler.style.height = '60px';
    ruler.style.position = 'relative';

    for (let i = 0; i <= 10; i++) {
      const mark = document.createElement('div');
      mark.style.position = 'absolute';
      mark.style.left = `${(i / 10) * 100}%`;
      mark.style.top = '0';
      mark.style.bottom = '0';
      mark.style.borderLeft = '2px solid #854d0e';
      mark.style.paddingLeft = '4px';

      const label = document.createElement('span');
      label.style.position = 'absolute';
      label.style.bottom = '4px';
      label.style.left = '4px';
      label.style.fontFamily = 'var(--font-heading)';
      label.style.fontSize = '0.85rem';
      label.style.fontWeight = '700';
      label.style.color = '#713f12';
      label.textContent = i === 10 ? '10 cm' : i;

      mark.appendChild(label);
      ruler.appendChild(mark);
    }

    stageBox.appendChild(ruler);
    container.appendChild(stageBox);
  } else {
    // Mode compare length
    const stageBox = document.createElement('div');
    stageBox.style.width = '100%';
    stageBox.style.maxWidth = '500px';
    stageBox.style.padding = '16px';
    stageBox.style.display = 'flex';
    stageBox.style.flexDirection = 'column';
    stageBox.style.gap = '20px';

    const makePencil = (label, len, color, bg) => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.gap = '12px';

      const lbl = document.createElement('span');
      lbl.style.width = '70px';
      lbl.style.fontWeight = '700';
      lbl.style.color = '#334155';
      lbl.textContent = label;

      const bar = document.createElement('div');
      bar.style.height = '34px';
      bar.style.width = `${(len / 10) * 100}%`;
      bar.style.background = bg;
      bar.style.border = `2px solid ${color}`;
      bar.style.borderRadius = '8px';
      bar.style.display = 'flex';
      bar.style.alignItems = 'center';
      bar.style.padding = '0 8px';
      bar.innerHTML = `<span style="font-size: 1.3rem;">✏️</span>`;

      row.appendChild(lbl);
      row.appendChild(bar);
      return row;
    };

    stageBox.appendChild(makePencil('Bút A:', question.item1Len, '#dc2626', '#fca5a5'));
    stageBox.appendChild(makePencil('Bút B:', question.item2Len, '#2563eb', '#93c5fd'));
    container.appendChild(stageBox);
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
