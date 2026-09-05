// Subtraction Fun: Interactive Balloon Pop & Snack Munch Module
import { sounds } from '../audio.js';

export function generateSubtractionQuestion() {
  const total = Math.floor(Math.random() * 6) + 4; // 4 to 9
  const takeAway = Math.floor(Math.random() * (total - 1)) + 1; // 1 to total - 1
  const answer = total - takeAway;

  const choices = [answer];
  while (choices.length < 3) {
    const dist = Math.max(0, Math.min(total, answer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
    if (!choices.includes(dist)) {
      choices.push(dist);
    }
  }
  choices.sort(() => Math.random() - 0.5);

  return {
    total,
    takeAway,
    answer,
    choices,
    promptText: `Bấm nổ ${takeAway} quả bóng! ${total} - ${takeAway} bằng bao nhiêu?`,
    hintText: `Bé hãy bấm vào các quả bóng để nổ, rồi đếm số bóng còn bay nhé!`
  };
}

export function renderSubtractionStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  const balloonGroup = document.createElement('div');
  balloonGroup.className = 'balloon-group';

  let poppedCount = 0;
  const counterBadge = document.createElement('div');
  counterBadge.style.fontFamily = 'var(--font-heading)';
  counterBadge.style.fontSize = '1.1rem';
  counterBadge.style.color = '#ef4444';
  counterBadge.style.marginBottom = '12px';
  counterBadge.textContent = `Đã nổ: 0 / ${question.takeAway}`;

  for (let i = 0; i < question.total; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon-item';
    balloon.textContent = '🎈';

    balloon.addEventListener('click', () => {
      if (!balloon.classList.contains('popped')) {
        sounds.playPop();
        balloon.classList.add('popped');
        poppedCount++;
        counterBadge.textContent = `Popped: ${poppedCount} / ${question.takeAway}`;
      }
    });

    balloonGroup.appendChild(balloon);
  }

  container.appendChild(counterBadge);
  container.appendChild(balloonGroup);

  // Render Choices
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.answer, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
