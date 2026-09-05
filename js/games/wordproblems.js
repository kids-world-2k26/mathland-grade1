// Word Problems with Pictures Module (Giải Toán Có Lời Văn Lớp 1)
import { sounds } from '../audio.js';

const WORD_TEMPLATES = [
  {
    type: 'add',
    makeQuestion: () => {
      const a = Math.floor(Math.random() * 5) + 2; // 2 to 6
      const b = Math.floor(Math.random() * 4) + 1; // 1 to 4
      const ans = a + b;
      return {
        promptText: `Trên cành có ${a} chú chim, thêm ${b} chú chim bay tới. Hỏi có tất cả bao nhiêu chú chim?`,
        hintText: `Thêm vào là làm phép cộng (+): ${a} + ${b} = ?`,
        a, b, ans, emoji: '🐦', op: '+'
      };
    }
  },
  {
    type: 'add',
    makeQuestion: () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 4) + 1;
      const ans = a + b;
      return {
        promptText: `Trong rổ có ${a} quả cam, mẹ mua thêm ${b} quả cam. Hỏi có tất cả bao nhiêu quả cam?`,
        hintText: `Gộp cả hai nhóm lại bằng phép cộng: ${a} + ${b} = ?`,
        a, b, ans, emoji: '🍊', op: '+'
      };
    }
  },
  {
    type: 'sub',
    makeQuestion: () => {
      const a = Math.floor(Math.random() * 5) + 4; // 4 to 8
      const b = Math.floor(Math.random() * (a - 2)) + 1; // 1 to a-2
      const ans = a - b;
      return {
        promptText: `Trong ao có ${a} chú vịt, có ${b} chú vịt lên bờ. Hỏi dưới ao còn lại bao nhiêu chú vịt?`,
        hintText: `Bớt đi thì làm phép trừ (-): ${a} - ${b} = ?`,
        a, b, ans, emoji: '🦆', op: '-'
      };
    }
  },
  {
    type: 'sub',
    makeQuestion: () => {
      const a = Math.floor(Math.random() * 5) + 4;
      const b = Math.floor(Math.random() * (a - 2)) + 1;
      const ans = a - b;
      return {
        promptText: `Bé có ${a} chiếc bánh quy, bé ăn mất ${b} chiếc. Hỏi bé còn lại bao nhiêu chiếc bánh?`,
        hintText: `Ăn bớt đi thì làm phép tính trừ: ${a} - ${b} = ?`,
        a, b, ans, emoji: '🍪', op: '-'
      };
    }
  }
];

export function generateWordProblemQuestion() {
  const tmpl = WORD_TEMPLATES[Math.floor(Math.random() * WORD_TEMPLATES.length)];
  const qData = tmpl.makeQuestion();

  const choices = [qData.ans];
  while (choices.length < 3) {
    const dist = Math.max(1, Math.min(12, qData.ans + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
    if (!choices.includes(dist)) {
      choices.push(dist);
    }
  }
  choices.sort(() => Math.random() - 0.5);

  return {
    ...qData,
    choices
  };
}

export function renderWordProblemStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  // Visual Scene Area
  const scene = document.createElement('div');
  scene.style.background = '#f8fafc';
  scene.style.borderRadius = '24px';
  scene.style.border = '3px dashed #cbd5e1';
  scene.style.padding = '20px 24px';
  scene.style.marginBottom = '16px';
  scene.style.display = 'flex';
  scene.style.flexWrap = 'wrap';
  scene.style.alignItems = 'center';
  scene.style.justifyContent = 'center';
  scene.style.gap = '16px';
  scene.style.maxWidth = '600px';

  if (question.op === '+') {
    // Show Group A
    const boxA = document.createElement('div');
    boxA.style.background = '#dcfce7';
    boxA.style.borderRadius = '16px';
    boxA.style.padding = '10px 16px';
    boxA.style.display = 'flex';
    boxA.style.gap = '6px';
    boxA.style.fontSize = '2.4rem';
    for (let i = 0; i < question.a; i++) {
      boxA.innerHTML += `<span>${question.emoji}</span>`;
    }

    const sign = document.createElement('span');
    sign.textContent = '+';
    sign.style.fontFamily = 'var(--font-heading)';
    sign.style.fontSize = '2.2rem';
    sign.style.color = '#16a34a';

    // Show Group B
    const boxB = document.createElement('div');
    boxB.style.background = '#fef9c3';
    boxB.style.borderRadius = '16px';
    boxB.style.padding = '10px 16px';
    boxB.style.display = 'flex';
    boxB.style.gap = '6px';
    boxB.style.fontSize = '2.4rem';
    for (let i = 0; i < question.b; i++) {
      boxB.innerHTML += `<span>${question.emoji}</span>`;
    }

    scene.appendChild(boxA);
    scene.appendChild(sign);
    scene.appendChild(boxB);
  } else {
    // Subtraction scene
    const boxTotal = document.createElement('div');
    boxTotal.style.background = '#fee2e2';
    boxTotal.style.borderRadius = '16px';
    boxTotal.style.padding = '12px 18px';
    boxTotal.style.display = 'flex';
    boxTotal.style.gap = '8px';
    boxTotal.style.fontSize = '2.4rem';

    for (let i = 0; i < question.a; i++) {
      const itemSpan = document.createElement('span');
      itemSpan.textContent = question.emoji;
      if (i >= question.a - question.b) {
        itemSpan.style.opacity = '0.35';
        itemSpan.style.textDecoration = 'line-through';
        itemSpan.title = 'Bớt đi';
      }
      boxTotal.appendChild(itemSpan);
    }
    scene.appendChild(boxTotal);
  }

  container.appendChild(scene);

  // Choices Row
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.ans, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
