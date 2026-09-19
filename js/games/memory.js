// Memory Math Match Pairs Module (Trò Chơi Lật Thẻ Ghép Cặp Toán Học)
// Rèn luyện trí nhớ và sự liên tưởng toán học trực quan cho học sinh Lớp 1
import { sounds } from '../audio.js';

const PAIR_POOLS = [
  { val1: '3 + 2', val2: '5', label: 'Phép cộng 5' },
  { val1: '4 + 4', val2: '8', label: 'Phép cộng 8' },
  { val1: '7 - 3', val2: '4', label: 'Phép trừ 4' },
  { val1: '9 - 3', val2: '6', label: 'Phép trừ 6' },
  { val1: '1 chục', val2: '10', label: 'Một chục là 10' },
  { val1: '2 chục', val2: '20', label: 'Hai chục là 20' },
  { val1: '5 chục', val2: '50', label: 'Năm chục là 50' },
  { val1: '🔺', val2: 'Tam giác', label: 'Hình tam giác' },
  { val1: '🟦', val2: 'Hình vuông', label: 'Hình vuông' },
  { val1: '⚪️', val2: 'Hình tròn', label: 'Hình tròn' },
  { val1: '🟩', val2: 'Chữ nhật', label: 'Hình chữ nhật' },
  { val1: '2 + 1', val2: '3', label: 'Phép cộng 3' },
  { val1: '5 + 5', val2: '10', label: 'Bạn thân 10' },
  { val1: '6 + 3', val2: '9', label: 'Phép cộng 9' },
  { val1: '10 - 2', val2: '8', label: 'Phép trừ 8' }
];

export function generateMemoryQuestion() {
  // Pick 3 random distinct pairs (6 cards total for a quick and rewarding game round)
  const shuffledPool = [...PAIR_POOLS].sort(() => Math.random() - 0.5);
  const selectedPairs = shuffledPool.slice(0, 3);

  const cards = [];
  selectedPairs.forEach((pair, idx) => {
    cards.push({ id: `p${idx}_a`, pairId: idx, text: pair.val1 });
    cards.push({ id: `p${idx}_b`, pairId: idx, text: pair.val2 });
  });

  // Shuffle cards
  cards.sort(() => Math.random() - 0.5);

  return {
    pairsCount: 3,
    cards,
    promptText: `Lật các thẻ bài để tìm 3 cặp đôi toán học tương ứng nhé!`,
    hintText: `Bé lật từng thẻ để ghép phép tính với kết quả, hoặc hình học với tên gọi nè!`
  };
}

export function renderMemoryStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  const grid = document.createElement('div');
  grid.className = 'memory-grid';
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  grid.style.gap = '14px';
  grid.style.width = '100%';
  grid.style.maxWidth = '460px';
  grid.style.margin = '16px auto';

  let flippedCards = [];
  let matchedPairs = 0;
  let isChecking = false;

  question.cards.forEach(cardData => {
    const cardEl = document.createElement('div');
    cardEl.className = 'memory-card';
    cardEl.setAttribute('data-id', cardData.id);
    cardEl.setAttribute('data-pair-id', cardData.pairId);

    cardEl.style.height = '105px';
    cardEl.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
    cardEl.style.borderRadius = '18px';
    cardEl.style.boxShadow = 'var(--shadow-md)';
    cardEl.style.display = 'flex';
    cardEl.style.alignItems = 'center';
    cardEl.style.justifyContent = 'center';
    cardEl.style.cursor = 'pointer';
    cardEl.style.transition = 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
    cardEl.style.border = '3px solid #818cf8';
    cardEl.style.userSelect = 'none';

    // Face down indicator
    cardEl.innerHTML = `<span class="card-back-icon" style="font-size: 2.2rem;">🌟</span>`;

    cardEl.addEventListener('click', () => {
      if (isChecking || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) {
        return;
      }

      sounds.playPop();
      cardEl.classList.add('flipped');
      cardEl.style.background = 'white';
      cardEl.style.borderColor = '#6366f1';
      cardEl.style.transform = 'scale(1.05)';
      cardEl.innerHTML = `
        <span style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; color: #1e1b4b; text-align: center; padding: 4px 8px;">
          ${cardData.text}
        </span>
      `;

      flippedCards.push({ data: cardData, el: cardEl });

      if (flippedCards.length === 2) {
        isChecking = true;
        const [card1, card2] = flippedCards;

        if (card1.data.pairId === card2.data.pairId) {
          // Matched!
          sounds.playCorrect();
          matchedPairs++;
          card1.el.classList.add('matched');
          card2.el.classList.add('matched');
          card1.el.style.background = '#dcfce7';
          card1.el.style.borderColor = '#22c55e';
          card2.el.style.background = '#dcfce7';
          card2.el.style.borderColor = '#22c55e';

          flippedCards = [];
          isChecking = false;

          if (matchedPairs >= question.pairsCount) {
            // Victory for this round!
            setTimeout(() => {
              onAnswer(true, grid);
            }, 600);
          }
        } else {
          // Not matching
          sounds.playWrong();
          setTimeout(() => {
            card1.el.classList.remove('flipped');
            card1.el.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
            card1.el.style.borderColor = '#818cf8';
            card1.el.style.transform = 'none';
            card1.el.innerHTML = `<span class="card-back-icon" style="font-size: 2.2rem;">🌟</span>`;

            card2.el.classList.remove('flipped');
            card2.el.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
            card2.el.style.borderColor = '#818cf8';
            card2.el.style.transform = 'none';
            card2.el.innerHTML = `<span class="card-back-icon" style="font-size: 2.2rem;">🌟</span>`;

            flippedCards = [];
            isChecking = false;
          }, 900);
        }
      }
    });

    grid.appendChild(cardEl);
  });

  container.appendChild(grid);
  return container;
}
