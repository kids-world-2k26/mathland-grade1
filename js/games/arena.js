// Math Arena: Speed & Streak Challenge Module (Đấu Trường Toán Học Siêu Tốc)
// Bám sát Bài 41 SGK Toán 1: Ôn tập chung & Đấu trường toán học
import { sounds } from '../audio.js';

export function generateArenaQuestion() {
  const qType = Math.floor(Math.random() * 4);
  let promptText = '';
  let hintText = '';
  let correctAnswer = 0;
  let choices = [];
  let badge = '';

  if (qType === 0) {
    // Quick Addition in range 10
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    correctAnswer = a + b;
    badge = '⚡️ Phép Cộng Thần Tốc';
    promptText = `${a} + ${b} = ?`;
    hintText = `Tính thật nhanh để duy trì chuỗi combo siêu tốc nhé!`;
  } else if (qType === 1) {
    // Quick Subtraction in range 10
    const a = Math.floor(Math.random() * 6) + 4; // 4 to 9
    const b = Math.floor(Math.random() * (a - 1)) + 1;
    correctAnswer = a - b;
    badge = '💥 Phép Trừ Siêu Hỏa Lực';
    promptText = `${a} - ${b} = ?`;
    hintText = `Tập trung phản xạ nhanh nào bé yêu!`;
  } else if (qType === 2) {
    // Quick Comparison
    const a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;
    if (Math.random() < 0.25) b = a;
    let sign = '=';
    if (a > b) sign = '>';
    else if (a < b) sign = '<';

    correctAnswer = sign;
    badge = '🐊 So Sánh Thần Tốc';
    promptText = `${a} ... ${b}`;
    hintText = `Chọn dấu >, < hoặc = thật nhanh nhé!`;
    choices = ['>', '=', '<'];
  } else {
    // Quick Tens calculation or Place Value
    const t = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const total = t * 10;
    correctAnswer = total;
    badge = '🍅 Đếm Tròn Chục Siêu Tốc';
    promptText = `${t} chục là bao nhiêu đơn vị?`;
    hintText = `1 chục là 10, ${t} chục là ${total}!`;
  }

  if (choices.length === 0) {
    choices = [correctAnswer];
    while (choices.length < 3) {
      const dist = Math.max(0, correctAnswer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);
  }

  return {
    badge,
    promptText,
    hintText,
    correctAnswer,
    choices
  };
}

export function renderArenaStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  const arenaCard = document.createElement('div');
  arenaCard.className = 'arena-combat-card';
  arenaCard.style.background = 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)';
  arenaCard.style.borderRadius = '24px';
  arenaCard.style.padding = '28px 36px';
  arenaCard.style.color = 'white';
  arenaCard.style.boxShadow = '0 12px 28px rgba(49, 46, 129, 0.4)';
  arenaCard.style.textAlign = 'center';
  arenaCard.style.margin = '16px 0';
  arenaCard.style.width = '100%';
  arenaCard.style.maxWidth = '520px';
  arenaCard.style.position = 'relative';
  arenaCard.style.overflow = 'hidden';

  arenaCard.innerHTML = `
    <div style="display: inline-block; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px); padding: 4px 14px; border-radius: 20px; font-size: 0.95rem; font-weight: 700; margin-bottom: 16px; border: 1px solid rgba(255, 255, 255, 0.3);">
      ${question.badge}
    </div>
    <div style="font-family: var(--font-heading); font-size: 3.6rem; font-weight: 900; letter-spacing: 2px; color: #facc15; text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); margin: 6px 0 12px;">
      ${question.promptText}
    </div>
    <div style="font-size: 1.05rem; color: #cbd5e1; font-weight: 600;">
      ⚡️ Bấm vào đáp án đúng nhanh nhất để ghi điểm tuyệt đối!
    </div>
  `;
  container.appendChild(arenaCard);

  // Choices
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.fontSize = '2rem';
    btn.style.minWidth = '110px';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.correctAnswer, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
