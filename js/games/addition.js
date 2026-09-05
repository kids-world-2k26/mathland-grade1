// Addition Adventure & Number Line Frog Hop Module
import { sounds } from '../audio.js';

export function generateAdditionQuestion() {
  const isNumberLine = Math.random() > 0.45;
  const num1 = Math.floor(Math.random() * 6) + 1; // 1 to 6
  const num2 = Math.floor(Math.random() * 5) + 1; // 1 to 5
  const sum = num1 + num2;

  const choices = [sum];
  while (choices.length < 3) {
    const dist = Math.max(2, Math.min(15, sum + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
    if (!choices.includes(dist)) {
      choices.push(dist);
    }
  }
  choices.sort(() => Math.random() - 0.5);

  return {
    isNumberLine,
    num1,
    num2,
    sum,
    choices,
    promptText: isNumberLine
      ? `Nhảy về phía trước! ${num1} + ${num2} bằng bao nhiêu?`
      : `Cùng làm phép cộng nào: ${num1} + ${num2} bằng bao nhiêu?`,
    hintText: isNumberLine ? `Bắt đầu từ số ${num1} và nhảy ${num2} bước sang phải nhé!` : `Đếm tất cả các bạn nhỏ lại với nhau nhé!`
  };
}

export function renderAdditionStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  if (question.isNumberLine) {
    // Number Line Frog Hop
    const lineWrapper = document.createElement('div');
    lineWrapper.className = 'number-line-container';

    const track = document.createElement('div');
    track.className = 'number-line-track';

    const maxLine = 12;
    const frog = document.createElement('div');
    frog.className = 'number-line-frog';
    frog.textContent = '🐸';
    track.appendChild(frog);

    // Position frog initially at num1
    const updateFrogPos = (idx) => {
      const pct = (idx / maxLine) * 100;
      frog.style.left = `calc(${pct}% - 22px)`;
    };

    setTimeout(() => updateFrogPos(question.num1), 50);

    for (let i = 0; i <= maxLine; i++) {
      const tickWrap = document.createElement('div');
      tickWrap.className = 'line-tick-wrapper';

      const tick = document.createElement('div');
      tick.className = 'line-tick';

      const num = document.createElement('span');
      num.className = 'line-number';
      num.textContent = i;

      tickWrap.appendChild(tick);
      tickWrap.appendChild(num);

      tickWrap.addEventListener('click', () => {
        sounds.playPop();
        frog.classList.add('hopping');
        updateFrogPos(i);
        setTimeout(() => frog.classList.remove('hopping'), 400);
      });

      track.appendChild(tickWrap);
    }

    lineWrapper.appendChild(track);
    container.appendChild(lineWrapper);
  } else {
    // Visual Groups Combination
    const groupsWrap = document.createElement('div');
    groupsWrap.style.display = 'flex';
    groupsWrap.style.alignItems = 'center';
    groupsWrap.style.gap = '20px';
    groupsWrap.style.padding = '16px';
    groupsWrap.style.flexWrap = 'wrap';
    groupsWrap.style.justifyContent = 'center';

    const createGroup = (count, emoji, bg) => {
      const box = document.createElement('div');
      box.style.display = 'flex';
      box.style.gap = '8px';
      box.style.padding = '14px 20px';
      box.style.background = bg;
      box.style.borderRadius = '20px';
      box.style.border = '2px solid rgba(0,0,0,0.06)';

      for (let i = 0; i < count; i++) {
        const item = document.createElement('span');
        item.style.fontSize = '2.8rem';
        item.style.cursor = 'pointer';
        item.textContent = emoji;
        item.addEventListener('click', () => {
          sounds.playPop();
          item.style.transform = 'scale(1.3)';
          setTimeout(() => item.style.transform = 'scale(1)', 200);
        });
        box.appendChild(item);
      }
      return box;
    };

    const g1 = createGroup(question.num1, '🐥', '#fef3c7');
    const plus = document.createElement('span');
    plus.textContent = '+';
    plus.style.fontSize = '2.5rem';
    plus.style.fontFamily = 'var(--font-heading)';
    plus.style.color = '#4ade80';

    const g2 = createGroup(question.num2, '🦆', '#e0f2fe');

    groupsWrap.appendChild(g1);
    groupsWrap.appendChild(plus);
    groupsWrap.appendChild(g2);
    container.appendChild(groupsWrap);
  }

  // Answer Choices
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.sum, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
