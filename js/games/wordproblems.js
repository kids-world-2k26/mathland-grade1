// Word Problems with Pictures Module (Giải Toán Có Lời Văn Lớp 1)
// Bám sát Bài 20 & 41 SGK Toán 1: Bài toán thực tế sinh động, phát triển tư duy ngôn ngữ và số học
import { sounds } from '../audio.js';

const WORD_TEMPLATES = [
  {
    type: 'add',
    makeQuestion: () => {
      const a = Math.floor(Math.random() * 4) + 3; // 3 to 6
      const b = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const ans = a + b;
      return {
        promptText: `Trên cành cây có ${a} chú chim hót, một lát sau có thêm ${b} chú chim bay tới. Hỏi trên cành có tất cả bao nhiêu chú chim?`,
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
        promptText: `Trong rổ có ${a} quả cam mọng nước, mẹ đi chợ mua thêm ${b} quả cam nữa. Hỏi trong rổ có tất cả bao nhiêu quả cam?`,
        hintText: `Gộp cả hai nhóm lại bằng phép tính cộng: ${a} + ${b} = ?`,
        a, b, ans, emoji: '🍊', op: '+'
      };
    }
  },
  {
    type: 'sub',
    makeQuestion: () => {
      const a = Math.floor(Math.random() * 4) + 6; // 6 to 9
      const b = Math.floor(Math.random() * (a - 3)) + 1; // 1 to a-3
      const ans = a - b;
      return {
        promptText: `Trong ao nước có ${a} chú vịt con đang bơi, có ${b} chú vịt đã lạch bạch nhảy lên bờ. Hỏi dưới ao còn lại bao nhiêu chú vịt?`,
        hintText: `Bớt đi thì làm phép tính trừ (-): ${a} - ${b} = ?`,
        a, b, ans, emoji: '🦆', op: '-'
      };
    }
  },
  {
    type: 'sub',
    makeQuestion: () => {
      const a = Math.floor(Math.random() * 4) + 6;
      const b = Math.floor(Math.random() * (a - 3)) + 1;
      const ans = a - b;
      return {
        promptText: `Bé cưng có ${a} chiếc bánh quy giòn tan, bé chia cho bạn ăn mất ${b} chiếc. Hỏi bé còn lại bao nhiêu chiếc bánh quy?`,
        hintText: `Bớt đi thì làm phép tính trừ: ${a} - ${b} = ?`,
        a, b, ans, emoji: '🍪', op: '-'
      };
    }
  },
  {
    type: 'add',
    makeQuestion: () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 4) + 2;
      const ans = a + b;
      return {
        promptText: `Bé Mai hái được ${a} bông hoa màu hồng, bé Lan hái được ${b} bông hoa màu vàng. Hỏi cả hai bạn hái được tất cả bao nhiêu bông hoa?`,
        hintText: `Gộp hoa của cả hai bạn lại: ${a} + ${b} = ?`,
        a, b, ans, emoji: '🌸', op: '+'
      };
    }
  },
  {
    type: 'sub',
    makeQuestion: () => {
      const a = Math.floor(Math.random() * 4) + 7; // 7 to 10
      const b = Math.floor(Math.random() * (a - 4)) + 2;
      const ans = a - b;
      return {
        promptText: `Bác thợ cầm chùm ${a} quả bóng bay, gió thổi mạnh làm bay mất ${b} quả bóng. Hỏi bác thợ còn giữ lại bao nhiêu quả bóng?`,
        hintText: `Bay mất là bớt đi: ${a} - ${b} = ?`,
        a, b, ans, emoji: '🎈', op: '-'
      };
    }
  },
  {
    type: 'add',
    makeQuestion: () => {
      const a = Math.floor(Math.random() * 4) + 3;
      const b = Math.floor(Math.random() * 3) + 2;
      const ans = a + b;
      return {
        promptText: `Trong bể cá có ${a} chú cá vàng, bố thả thêm vào bể ${b} chú cá bảy màu xinh xắn. Hỏi trong bể có tất cả bao nhiêu chú cá?`,
        hintText: `Thả thêm vào làm phép cộng: ${a} + ${b} = ?`,
        a, b, ans, emoji: '🐠', op: '+'
      };
    }
  },
  {
    type: 'sub',
    makeQuestion: () => {
      const a = Math.floor(Math.random() * 4) + 6;
      const b = Math.floor(Math.random() * (a - 3)) + 1;
      const ans = a - b;
      return {
        promptText: `Vườn nhà thỏ con trồng được ${a} củ cà rốt, thỏ con đã nhổ ăn mất ${b} củ. Hỏi trong vườn còn lại bao nhiêu củ cà rốt?`,
        hintText: `Ăn mất thì làm phép trừ: ${a} - ${b} = ?`,
        a, b, ans, emoji: '🥕', op: '-'
      };
    }
  }
];

export function generateWordProblemQuestion() {
  const tmpl = WORD_TEMPLATES[Math.floor(Math.random() * WORD_TEMPLATES.length)];
  const qData = tmpl.makeQuestion();

  const choices = [qData.ans];
  while (choices.length < 3) {
    const dist = Math.max(1, Math.min(15, qData.ans + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
    if (!choices.includes(dist)) choices.push(dist);
  }
  choices.sort(() => Math.random() - 0.5);

  return {
    ...qData,
    correctAnswer: qData.ans,
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
    boxA.style.background = '#fef3c7';
    boxA.style.border = '2px solid #fde047';
    boxA.style.borderRadius = '16px';
    boxA.style.padding = '10px 16px';
    boxA.style.textAlign = 'center';
    boxA.innerHTML = `
      <div style="font-size: 2.2rem;">${question.emoji.repeat(question.a)}</div>
      <div style="font-weight: 700; color: #b45309; margin-top: 4px;">Lúc đầu: ${question.a}</div>
    `;

    const plus = document.createElement('span');
    plus.style.fontSize = '2.2rem';
    plus.style.fontWeight = '800';
    plus.style.color = '#10b981';
    plus.textContent = '+';

    // Show Group B
    const boxB = document.createElement('div');
    boxB.style.background = '#dcfce7';
    boxB.style.border = '2px solid #86efac';
    boxB.style.borderRadius = '16px';
    boxB.style.padding = '10px 16px';
    boxB.style.textAlign = 'center';
    boxB.innerHTML = `
      <div style="font-size: 2.2rem;">${question.emoji.repeat(question.b)}</div>
      <div style="font-weight: 700; color: #15803d; margin-top: 4px;">Thêm vào: ${question.b}</div>
    `;

    scene.appendChild(boxA);
    scene.appendChild(plus);
    scene.appendChild(boxB);
  } else {
    // Subtraction Visual
    const box = document.createElement('div');
    box.style.background = '#fee2e2';
    box.style.border = '2px solid #fca5a5';
    box.style.borderRadius = '16px';
    box.style.padding = '14px 20px';
    box.style.textAlign = 'center';

    let itemsHtml = '';
    for (let i = 0; i < question.a; i++) {
      if (i < question.b) {
        itemsHtml += `<span style="opacity: 0.35; text-decoration: line-through; margin: 0 4px; display: inline-block;">${question.emoji}</span>`;
      } else {
        itemsHtml += `<span style="margin: 0 4px; display: inline-block;">${question.emoji}</span>`;
      }
    }

    box.innerHTML = `
      <div style="font-size: 2.2rem; margin-bottom: 8px;">${itemsHtml}</div>
      <div style="font-weight: 700; color: #991b1b;">
        Ban đầu có ${question.a} — Bớt đi ${question.b}
      </div>
    `;
    scene.appendChild(box);
  }

  container.appendChild(scene);

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
