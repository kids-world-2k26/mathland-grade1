// Tens and Ones / Two-digit numbers Module (Chục & Đơn Vị - Số Có Hai Chữ Số)
// Bám sát Bài 21, 22, 23, 29, 30, 31, 32 - SGK Toán 1 Tập 2 Kết Nối Tri Thức Với Cuộc Sống
import { sounds } from '../audio.js';

export function generateTensQuestion() {
  // Fix previous bug: now uses 5 diverse modes!
  const mode = Math.floor(Math.random() * 5);

  if (mode === 0) {
    // Mode 0: 1 chục và X đơn vị (Bài 21 SGK)
    const ones = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const total = 10 + ones;

    const choices = [total];
    while (choices.length < 3) {
      const dist = Math.max(10, Math.min(20, total + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 0,
      ones,
      total,
      choices,
      correctAnswer: total,
      promptText: `1 chục và ${ones} đơn vị là số mấy?`,
      hintText: `1 chục là 10, thêm ${ones} nữa là số ${total} nhé!`
    };
  } else if (mode === 1) {
    // Mode 1: Cấu tạo số có hai chữ số (Chục và đơn vị - Bài 22 SGK)
    const tensVal = Math.floor(Math.random() * 7) + 2; // 2 to 8
    const onesVal = Math.floor(Math.random() * 8) + 1; // 1 to 8
    const num = tensVal * 10 + onesVal;
    const correctStr = `${tensVal} chục và ${onesVal} đơn vị`;

    const wrong1 = `${onesVal} chục và ${tensVal} đơn vị`;
    const wrong2 = `${tensVal} chục và ${onesVal + 1} đơn vị`;
    const choices = [correctStr, wrong1, wrong2];
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 1,
      num,
      tensVal,
      onesVal,
      choices,
      correctAnswer: correctStr,
      promptText: `Số ${num} gồm mấy chục và mấy đơn vị?`,
      hintText: `Chữ số đứng trước là hàng chục (${tensVal}), chữ số đứng sau là hàng đơn vị (${onesVal}) nhé!`
    };
  } else if (mode === 2) {
    // Mode 2: Số liền trước và số liền sau (Bài 23 SGK)
    const num = Math.floor(Math.random() * 70) + 15; // 15 to 84
    const isNext = Math.random() > 0.5;
    const target = isNext ? num + 1 : num - 1;

    const choices = [target];
    while (choices.length < 3) {
      const dist = target + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 2,
      num,
      isNext,
      target,
      choices,
      correctAnswer: target,
      promptText: isNext
        ? `Số LIỀN SAU của số ${num} là số mấy?`
        : `Số LIỀN TRƯỚC của số ${num} là số mấy?`,
      hintText: isNext
        ? `Số liền sau hơn số đã cho 1 đơn vị (${num} + 1 = ${target})!`
        : `Số liền trước kém số đã cho 1 đơn vị (${num} - 1 = ${target})!`
    };
  } else if (mode === 3) {
    // Mode 3: Túi quả tròn chục (10, 20, 30... 90)
    const bags = Math.floor(Math.random() * 6) + 2; // 2 to 7 bags
    const total = bags * 10;

    const choices = [total];
    while (choices.length < 3) {
      const dist = Math.max(10, Math.min(90, (bags + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1)) * 10));
      if (!choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 3,
      bags,
      total,
      choices,
      correctAnswer: total,
      promptText: `Có ${bags} giỏ cà chua, mỗi giỏ có 10 quả (1 chục). Có tất cả bao nhiêu quả?`,
      hintText: `Đếm tròn chục: ${bags} chục là ${total} quả cà chua nè!`
    };
  } else {
    // Mode 4: Phép cộng trừ không nhớ trong phạm vi 100 (Bài 29 - 33 SGK)
    const isAdd = Math.random() > 0.5;
    const isTwoDigits = Math.random() > 0.4; // 2 chữ số + 2 chữ số

    let a, b, answer, promptText;

    if (isTwoDigits) {
      // 2 chữ số + 2 chữ số không nhớ (VD: 34 + 23 = 57 hoặc 68 - 25 = 43)
      if (isAdd) {
        const t1 = Math.floor(Math.random() * 4) + 1; // 1 to 4
        const t2 = Math.floor(Math.random() * (8 - t1)) + 1;
        const o1 = Math.floor(Math.random() * 4) + 1; // 1 to 4
        const o2 = Math.floor(Math.random() * (8 - o1)) + 1; // ensures o1+o2 <= 9 (no regroup)
        a = t1 * 10 + o1;
        b = t2 * 10 + o2;
        answer = a + b;
        promptText = `Tính: ${a} + ${b} = ?`;
      } else {
        const t1 = Math.floor(Math.random() * 5) + 4; // 4 to 8
        const t2 = Math.floor(Math.random() * (t1 - 1)) + 1;
        const o1 = Math.floor(Math.random() * 5) + 4; // 4 to 8
        const o2 = Math.floor(Math.random() * (o1 - 1)) + 1; // ensures o1 >= o2
        a = t1 * 10 + o1;
        b = t2 * 10 + o2;
        answer = a - b;
        promptText = `Tính: ${a} - ${b} = ?`;
      }
    } else {
      // 2 chữ số + 1 chữ số hoặc số tròn chục
      const tensBase = (Math.floor(Math.random() * 6) + 2) * 10;
      if (isAdd) {
        const onesA = Math.floor(Math.random() * 5) + 1;
        const onesB = Math.floor(Math.random() * (8 - onesA)) + 1;
        a = tensBase + onesA;
        b = onesB;
        answer = a + b;
        promptText = `Tính: ${a} + ${b} = ?`;
      } else {
        const onesA = Math.floor(Math.random() * 5) + 4;
        const onesB = Math.floor(Math.random() * (onesA - 1)) + 1;
        a = tensBase + onesA;
        b = onesB;
        answer = a - b;
        promptText = `Tính: ${a} - ${b} = ?`;
      }
    }

    const choices = [answer];
    while (choices.length < 3) {
      const dist = answer + (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? 1 : 10);
      if (dist > 0 && !choices.includes(dist)) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 4,
      a, b, answer,
      choices,
      correctAnswer: answer,
      promptText,
      hintText: `Bé cộng hoặc trừ hàng đơn vị trước, rồi đến hàng chục nhé!`
    };
  }
}

export function renderTensStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  const card = document.createElement('div');
  card.style.background = 'white';
  card.style.borderRadius = '24px';
  card.style.padding = '24px 30px';
  card.style.boxShadow = 'var(--shadow-md)';
  card.style.border = '3px solid #cbd5e1';
  card.style.margin = '16px 0';
  card.style.textAlign = 'center';
  card.style.maxWidth = '550px';

  if (question.mode === 0) {
    // 1 chục và X đơn vị
    card.innerHTML = `
      <div style="display: flex; gap: 16px; justify-content: center; align-items: center; margin-bottom: 12px;">
        <div style="background: #fef2f2; border: 2px solid #fca5a5; padding: 12px 18px; border-radius: 16px; font-weight: 700; color: #991b1b;">
          🍅 1 bó (10 quả = 1 chục)
        </div>
        <div style="font-size: 1.8rem; font-weight: 800; color: #64748b;">+</div>
        <div style="background: #fefce8; border: 2px solid #fde047; padding: 12px 18px; border-radius: 16px; font-weight: 700; color: #854d0e;">
          🍅 ${question.ones} quả lẻ
        </div>
      </div>
    `;
  } else if (question.mode === 1) {
    // Cấu tạo số
    card.innerHTML = `
      <div style="font-family: var(--font-heading); font-size: 3.5rem; font-weight: 900; color: #0284c7; margin-bottom: 8px;">
        ${question.num}
      </div>
      <div style="font-size: 1.1rem; color: #475569; font-weight: 600;">
        Phân tích số có 2 chữ số thành chục và đơn vị
      </div>
    `;
  } else if (question.mode === 2) {
    // Liền trước / liền sau
    card.innerHTML = `
      <div style="display: flex; gap: 14px; justify-content: center; align-items: center; margin-bottom: 10px;">
        <div style="background: ${!question.isNext ? '#fee2e2' : '#f1f5f9'}; border: 2px ${!question.isNext ? 'dashed #ef4444' : 'solid #cbd5e1'}; border-radius: 14px; padding: 10px 20px; font-size: 1.8rem; font-weight: 800; color: ${!question.isNext ? '#dc2626' : '#64748b'};">
          ${!question.isNext ? '?' : question.num - 1}
        </div>
        <div style="background: #0284c7; color: white; border-radius: 16px; padding: 12px 24px; font-size: 2.2rem; font-weight: 900; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
          ${question.num}
        </div>
        <div style="background: ${question.isNext ? '#fee2e2' : '#f1f5f9'}; border: 2px ${question.isNext ? 'dashed #ef4444' : 'solid #cbd5e1'}; border-radius: 14px; padding: 10px 20px; font-size: 1.8rem; font-weight: 800; color: ${question.isNext ? '#dc2626' : '#64748b'};">
          ${question.isNext ? '?' : question.num + 1}
        </div>
      </div>
    `;
  } else if (question.mode === 3) {
    // Túi tròn chục
    card.innerHTML = `
      <div style="font-size: 2.6rem; letter-spacing: 6px; margin-bottom: 8px;">
        ${'🛍️'.repeat(question.bags)}
      </div>
      <div style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: #15803d;">
        ${question.bags} giỏ tròn chục cà chua
      </div>
    `;
  } else {
    // Phép tính 2 chữ số
    card.innerHTML = `
      <div style="font-family: var(--font-heading); font-size: 2.8rem; font-weight: 900; color: #1e293b; margin-bottom: 6px;">
        ${question.promptText.replace('Tính: ', '')}
      </div>
      <div style="font-size: 1rem; color: #64748b; font-weight: 600;">
        Phép tính trong phạm vi 100
      </div>
    `;
  }

  container.appendChild(card);

  // Choices
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.fontSize = typeof val === 'string' && val.length > 5 ? '1.15rem' : '1.5rem';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.correctAnswer, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
