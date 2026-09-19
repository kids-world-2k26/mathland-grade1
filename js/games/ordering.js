// Number Train Ordering Module (Tàu Hỏa Sắp Xếp Dãy Số: Bé Đến Lớn / Lớn Đến Bé & Toa Tàu Mất Tích)
// Bám sát Bài 6, 17, 23 SGK Toán 1: Thứ tự số và số liền kề
import { sounds } from '../audio.js';

export function generateOrderingQuestion() {
  const mode = Math.floor(Math.random() * 2);

  if (mode === 0) {
    // Mode 0: Toa tàu mất tích trong dãy liên tiếp (ví dụ: 14, 15, ?, 17, 18)
    const start = Math.floor(Math.random() * 25) + 1; // 1 to 25
    const sequence = [start, start + 1, start + 2, start + 3, start + 4];
    const missingIdx = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3 (not edges)
    const missingVal = sequence[missingIdx];

    const choices = [missingVal];
    while (choices.length < 3) {
      const dist = missingVal + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
      if (!choices.includes(dist) && dist > 0) choices.push(dist);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'missing_wagon',
      sequence,
      missingIdx,
      missingVal,
      correctAnswer: missingVal,
      choices,
      promptText: `Toa tàu nào bị thiếu trên đường ray: ${sequence.map((n, i) => i === missingIdx ? '?' : n).join(' - ')}?`,
      hintText: `Quan sát dãy số tăng dần đều 1 đơn vị trên các toa tàu nhé!`
    };
  } else {
    // Mode 1: Sắp xếp theo thứ tự Từ Bé Đến Lớn hoặc Từ Lớn Đến Bé (SGK Bài 17 & 23)
    const isAsc = Math.random() > 0.5;
    const nums = [];
    while (nums.length < 3) {
      const n = Math.floor(Math.random() * 20) + 1;
      if (!nums.includes(n)) nums.push(n);
    }

    const sorted = [...nums].sort((a, b) => isAsc ? a - b : b - a);
    const correctOrderStr = sorted.join('  ➔  ');

    // Create wrong permutations
    const perm1 = [...sorted].reverse().join('  ➔  ');
    const shuffled = [...sorted].sort(() => Math.random() - 0.5);
    const perm2 = shuffled.join('  ➔  ');

    const choices = [correctOrderStr];
    if (perm1 !== correctOrderStr && !choices.includes(perm1)) choices.push(perm1);
    if (perm2 !== correctOrderStr && !choices.includes(perm2)) choices.push(perm2);
    while (choices.length < 3) {
      const p = [...nums].sort(() => Math.random() - 0.5).join('  ➔  ');
      if (!choices.includes(p)) choices.push(p);
    }
    choices.sort(() => Math.random() - 0.5);

    return {
      mode: 'sort_order',
      nums,
      isAsc,
      correctAnswer: correctOrderStr,
      choices,
      promptText: isAsc
        ? `Sắp xếp các số: ${nums.join(', ')} theo thứ tự TỪ BÉ ĐẾN LỚN:`
        : `Sắp xếp các số: ${nums.join(', ')} theo thứ tự TỪ LỚN ĐẾN BÉ:`,
      hintText: isAsc
        ? `Chọn dãy số đi từ số nhỏ nhất rồi lớn dần lên nhé!`
        : `Chọn dãy số đi từ số lớn nhất rồi giảm dần xuống nhé!`
    };
  }
}

export function renderOrderingStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  if (question.mode === 'missing_wagon') {
    const trackWrap = document.createElement('div');
    trackWrap.className = 'train-track-wrap';
    trackWrap.style.display = 'flex';
    trackWrap.style.alignItems = 'center';
    trackWrap.style.justifyContent = 'center';
    trackWrap.style.gap = '8px';
    trackWrap.style.margin = '20px 0';
    trackWrap.style.flexWrap = 'wrap';

    // Locomotive engine
    const engine = document.createElement('div');
    engine.style.background = '#ef4444';
    engine.style.color = 'white';
    engine.style.padding = '12px 16px';
    engine.style.borderRadius = '16px 8px 8px 16px';
    engine.style.fontFamily = 'var(--font-heading)';
    engine.style.fontWeight = '800';
    engine.style.fontSize = '1.6rem';
    engine.innerHTML = `🚂 Đầu tàu`;
    trackWrap.appendChild(engine);

    // Wagons
    question.sequence.forEach((num, idx) => {
      const wagon = document.createElement('div');
      const isMissing = idx === question.missingIdx;
      wagon.style.background = isMissing ? '#fef08a' : '#0284c7';
      wagon.style.color = isMissing ? '#ca8a04' : 'white';
      wagon.style.border = isMissing ? '3px dashed #eab308' : '2px solid #0369a1';
      wagon.style.padding = '12px 18px';
      wagon.style.borderRadius = '12px';
      wagon.style.fontFamily = 'var(--font-heading)';
      wagon.style.fontSize = '2rem';
      wagon.style.fontWeight = '900';
      wagon.style.boxShadow = 'var(--shadow-sm)';
      wagon.textContent = isMissing ? '?' : num;
      trackWrap.appendChild(wagon);
    });

    container.appendChild(trackWrap);
  } else {
    // Mode Sort Order
    const numbersWrap = document.createElement('div');
    numbersWrap.style.display = 'flex';
    numbersWrap.style.gap = '16px';
    numbersWrap.style.justifyContent = 'center';
    numbersWrap.style.margin = '20px 0';

    question.nums.forEach(n => {
      const card = document.createElement('div');
      card.style.background = 'white';
      card.style.border = '3px solid #6366f1';
      card.style.color = '#4338ca';
      card.style.fontFamily = 'var(--font-heading)';
      card.style.fontSize = '2.4rem';
      card.style.fontWeight = '800';
      card.style.padding = '14px 24px';
      card.style.borderRadius = '18px';
      card.style.boxShadow = 'var(--shadow-md)';
      card.textContent = n;
      numbersWrap.appendChild(card);
    });

    container.appendChild(numbersWrap);
  }

  // Choices
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.fontSize = typeof val === 'string' && val.length > 5 ? '1.25rem' : '1.8rem';
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
