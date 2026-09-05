// Hungry Alligator Comparison Module (<, =, >)
import { sounds } from '../audio.js';

export function generateCompareQuestion() {
  const numA = Math.floor(Math.random() * 12) + 1; // 1 to 12
  let numB = Math.floor(Math.random() * 12) + 1;

  // 25% chance of equal numbers to practice '='
  if (Math.random() < 0.25) {
    numB = numA;
  }

  let correctSign = '=';
  if (numA > numB) correctSign = '>';
  else if (numA < numB) correctSign = '<';

  return {
    numA,
    numB,
    correctSign,
    choices: ['>', '=', '<'],
    promptText: `Bạn Cá Sấu Allie nên há miệng ngoạm bên nào?`,
    hintText: `Cá Sấu luôn thích ăn số lớn hơn! Nếu hai số bằng nhau thì chọn dấu = nhé!`
  };
}

export function renderCompareStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  const compareRow = document.createElement('div');
  compareRow.className = 'compare-container';

  // Card Left
  const cardLeft = document.createElement('div');
  cardLeft.className = 'compare-number-card';
  cardLeft.innerHTML = `<span>${question.numA}</span>`;

  // Target Box
  const targetBox = document.createElement('div');
  targetBox.className = 'alligator-target-box';
  targetBox.textContent = '?';

  // Card Right
  const cardRight = document.createElement('div');
  cardRight.className = 'compare-number-card';
  cardRight.innerHTML = `<span>${question.numB}</span>`;

  compareRow.appendChild(cardLeft);
  compareRow.appendChild(targetBox);
  compareRow.appendChild(cardRight);
  container.appendChild(compareRow);

  // Choices Row
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  const labels = {
    '>': '> (Ngoạm bên trái)',
    '=': '= (Bằng nhau)',
    '<': '< (Ngoạm bên phải)'
  };

  question.choices.forEach(sign => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.fontSize = '1.8rem';
    btn.style.minWidth = '110px';
    btn.textContent = sign;
    btn.title = labels[sign];

    btn.addEventListener('click', () => {
      targetBox.textContent = sign;
      onAnswer(sign === question.correctSign, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
