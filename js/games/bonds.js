// Number Bonds (Part-Part-Whole) Game Module for Grade 1
import { sounds } from '../audio.js';

export function generateBondsQuestion() {
  const whole = Math.floor(Math.random() * 7) + 3; // 3 to 9
  const part1 = Math.floor(Math.random() * (whole - 1)) + 1; // 1 to whole-1
  const part2 = whole - part1;

  // Decide which circle is missing: 'whole', 'part1', or 'part2'
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
    if (!choices.includes(dist)) {
      choices.push(dist);
    }
  }
  choices.sort(() => Math.random() - 0.5);

  let promptText = '';
  if (missing === 'whole') {
    promptText = `Gộp các phần lại! Số ở trên cùng là bao nhiêu?`;
  } else {
    promptText = `Tìm số còn lại để gộp thành ${whole}!`;
  }

  return {
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
}

export function renderBondsStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  const diagram = document.createElement('div');
  diagram.className = 'number-bond-diagram';

  // Connecting lines
  const lineLeft = document.createElement('div');
  lineLeft.className = 'bond-line left';
  const lineRight = document.createElement('div');
  lineRight.className = 'bond-line right';

  // Circles
  const circleWhole = document.createElement('div');
  circleWhole.className = `bond-circle whole ${question.missing === 'whole' ? 'missing' : ''}`;
  circleWhole.textContent = question.missing === 'whole' ? '?' : question.whole;

  const circlePart1 = document.createElement('div');
  circlePart1.className = `bond-circle part-left ${question.missing === 'part1' ? 'missing' : ''}`;
  circlePart1.textContent = question.missing === 'part1' ? '?' : question.part1;

  const circlePart2 = document.createElement('div');
  circlePart2.className = `bond-circle part-right ${question.missing === 'part2' ? 'missing' : ''}`;
  circlePart2.textContent = question.missing === 'part2' ? '?' : question.part2;

  diagram.appendChild(lineLeft);
  diagram.appendChild(lineRight);
  diagram.appendChild(circleWhole);
  diagram.appendChild(circlePart1);
  diagram.appendChild(circlePart2);

  container.appendChild(diagram);

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
