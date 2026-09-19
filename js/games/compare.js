// Comparison Module (<, =, >, Nhiều Hơn - Ít Hơn & Tìm Số Lớn Nhất/Bé Nhất)
// Bám sát Bài 3, Bài 4 & Bài 22 SGK Toán 1 Kết Nối Tri Thức Với Cuộc Sống
import { sounds } from '../audio.js';

export function generateCompareQuestion() {
  const mode = Math.floor(Math.random() * 3);

  if (mode === 0) {
    // Mode 0: Bài 3 SGK - Nhiều hơn / Ít hơn qua đối tượng trực quan
    const pairs = [
      { itemA: '🐰', nameA: 'Chú Thỏ', itemB: '🥕', nameB: 'Cà Rốt' },
      { itemA: '🦋', nameA: 'Chú Bướm', itemB: '🌸', nameB: 'Bông Hoa' },
      { itemA: '🐒', nameA: 'Chú Khỉ', itemB: '🍌', nameB: 'Quả Chuối' },
      { itemA: '🐸', nameA: 'Chú Ếch', itemB: '🪷', nameB: 'Lá Sen' }
    ];
    const pair = pairs[Math.floor(Math.random() * pairs.length)];

    const countA = Math.floor(Math.random() * 5) + 3; // 3 to 7
    let countB = Math.floor(Math.random() * 5) + 3;
    // ensure not equal for clearly more/less
    while (countB === countA) {
      countB = Math.floor(Math.random() * 5) + 3;
    }

    const askMore = Math.random() > 0.5;
    let correctAnswer = '';
    if (askMore) {
      correctAnswer = countA > countB ? pair.nameA : pair.nameB;
    } else {
      correctAnswer = countA < countB ? pair.nameA : pair.nameB;
    }

    return {
      mode: 'visual_compare',
      pair,
      countA,
      countB,
      askMore,
      correctAnswer,
      choices: [pair.nameA, pair.nameB],
      promptText: askMore
        ? `Số lượng ${pair.nameA} hay ${pair.nameB} NHIỀU HƠN?`
        : `Số lượng ${pair.nameA} hay ${pair.nameB} ÍT HƠN?`,
      hintText: `Bé hãy đếm số lượng từng bên hoặc ghép đôi một-một xem bên nào còn thừa nhé!`
    };
  } else if (mode === 1) {
    // Mode 1: Tìm số LỚN NHẤT hoặc BÉ NHẤT trong 3 số (SGK Bài 4 & 22)
    const nums = [];
    while (nums.length < 3) {
      const n = Math.floor(Math.random() * 15) + 1;
      if (!nums.includes(n)) nums.push(n);
    }
    const askMax = Math.random() > 0.5;
    const target = askMax ? Math.max(...nums) : Math.min(...nums);

    return {
      mode: 'find_extreme',
      nums,
      askMax,
      correctAnswer: target,
      choices: [...nums].sort(() => Math.random() - 0.5),
      promptText: askMax
        ? `Trong các số: ${nums.join(', ')} — Số nào LỚN NHẤT?`
        : `Trong các số: ${nums.join(', ')} — Số nào BÉ NHẤT?`,
      hintText: askMax
        ? `Số nào có giá trị lớn nhất trong 3 số trên nè?`
        : `Số nào có giá trị nhỏ nhất trong 3 số trên nè?`
    };
  } else {
    // Mode 2: Cá Sấu Allie so sánh hai số với >, =, <
    const numA = Math.floor(Math.random() * 15) + 1; // 1 to 15
    let numB = Math.floor(Math.random() * 15) + 1;

    // 25% chance of equal numbers to practice '='
    if (Math.random() < 0.25) {
      numB = numA;
    }

    let correctSign = '=';
    if (numA > numB) correctSign = '>';
    else if (numA < numB) correctSign = '<';

    return {
      mode: 'alligator',
      numA,
      numB,
      correctSign,
      correctAnswer: correctSign,
      choices: ['>', '=', '<'],
      promptText: `Bạn Cá Sấu Allie nên há miệng ngoạm dấu nào? ${numA} ... ${numB}`,
      hintText: `Cá Sấu luôn ngoạm về phía số lớn hơn! Hai số bằng nhau thì chọn = nhé!`
    };
  }
}

export function renderCompareStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  if (question.mode === 'visual_compare') {
    // Render side-by-side visual cards
    const compareRow = document.createElement('div');
    compareRow.style.display = 'flex';
    compareRow.style.gap = '24px';
    compareRow.style.justifyContent = 'center';
    compareRow.style.flexWrap = 'wrap';
    compareRow.style.margin = '16px 0';

    // Box A
    const boxA = document.createElement('div');
    boxA.className = 'compare-visual-box';
    boxA.style.background = '#eff6ff';
    boxA.style.border = '3px solid #93c5fd';
    boxA.style.borderRadius = '20px';
    boxA.style.padding = '16px 20px';
    boxA.style.textAlign = 'center';
    boxA.style.minWidth = '180px';
    boxA.innerHTML = `
      <div style="font-size: 1.8rem; margin-bottom: 8px;">${question.pair.itemA.repeat(question.countA)}</div>
      <div style="font-family: var(--font-heading); font-weight: 700; color: #1e40af; font-size: 1.1rem;">
        ${question.pair.nameA}: ${question.countA}
      </div>
    `;

    // Box B
    const boxB = document.createElement('div');
    boxB.className = 'compare-visual-box';
    boxB.style.background = '#fef2f2';
    boxB.style.border = '3px solid #fca5a5';
    boxB.style.borderRadius = '20px';
    boxB.style.padding = '16px 20px';
    boxB.style.textAlign = 'center';
    boxB.style.minWidth = '180px';
    boxB.innerHTML = `
      <div style="font-size: 1.8rem; margin-bottom: 8px;">${question.pair.itemB.repeat(question.countB)}</div>
      <div style="font-family: var(--font-heading); font-weight: 700; color: #991b1b; font-size: 1.1rem;">
        ${question.pair.nameB}: ${question.countB}
      </div>
    `;

    compareRow.appendChild(boxA);
    compareRow.appendChild(boxB);
    container.appendChild(compareRow);

    // Choices
    const choicesRow = document.createElement('div');
    choicesRow.className = 'choices-row';
    question.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.style.fontSize = '1.25rem';
      btn.textContent = choice;
      btn.addEventListener('click', () => {
        onAnswer(choice === question.correctAnswer, btn);
      });
      choicesRow.appendChild(btn);
    });
    container.appendChild(choicesRow);
  } else if (question.mode === 'find_extreme') {
    // Render 3 large number cards
    const cardsRow = document.createElement('div');
    cardsRow.style.display = 'flex';
    cardsRow.style.gap = '20px';
    cardsRow.style.justifyContent = 'center';
    cardsRow.style.margin = '20px 0';

    question.nums.forEach(n => {
      const card = document.createElement('div');
      card.className = 'compare-number-card';
      card.style.fontSize = '2.4rem';
      card.textContent = n;
      cardsRow.appendChild(card);
    });
    container.appendChild(cardsRow);

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
  } else {
    // Mode Alligator (Classic)
    const compareRow = document.createElement('div');
    compareRow.className = 'compare-container';

    const cardLeft = document.createElement('div');
    cardLeft.className = 'compare-number-card';
    cardLeft.innerHTML = `<span>${question.numA}</span>`;

    const targetBox = document.createElement('div');
    targetBox.className = 'alligator-target-box';
    targetBox.textContent = '?';

    const cardRight = document.createElement('div');
    cardRight.className = 'compare-number-card';
    cardRight.innerHTML = `<span>${question.numB}</span>`;

    compareRow.appendChild(cardLeft);
    compareRow.appendChild(targetBox);
    compareRow.appendChild(cardRight);
    container.appendChild(compareRow);

    const choicesRow = document.createElement('div');
    choicesRow.className = 'choices-row';

    question.choices.forEach(sign => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.style.fontSize = '1.8rem';
      btn.style.minWidth = '110px';
      btn.textContent = sign;

      btn.addEventListener('click', () => {
        targetBox.textContent = sign;
        onAnswer(sign === question.correctSign, btn);
      });
      choicesRow.appendChild(btn);
    });

    container.appendChild(choicesRow);
  }

  return container;
}
