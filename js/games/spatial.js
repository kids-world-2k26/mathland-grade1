// Spatial & 3D Shapes Module (Khối Lập Phương, Khối Hộp Chữ Nhật & Vị Trí Không Gian)
// Theo Bài 14 & 15 - SGK Toán 1 Kết Nối Tri Thức Với Cuộc Sống
import { sounds } from '../audio.js';

export function generateSpatialQuestion() {
  const is3DMode = Math.random() > 0.5;

  if (is3DMode) {
    // Mode 1: Khối lập phương vs Khối hộp chữ nhật
    const isCube = Math.random() > 0.5;
    const items = isCube
      ? [
          { name: 'Viên xúc xắc (xí ngầu)', emoji: '🎲', type: 'Khối lập phương' },
          { name: 'Khối rubik vuông', emoji: '🧊', type: 'Khối lập phương' },
          { name: 'Hộp quà vuông vắn', emoji: '🎁', type: 'Khối lập phương' }
        ]
      : [
          { name: 'Hộp sữa chua / sữa tươi', emoji: '🧃', type: 'Khối hộp chữ nhật' },
          { name: 'Bao diêm / hộp bút', emoji: '📦', type: 'Khối hộp chữ nhật' },
          { name: 'Viên gạch xây nhà', emoji: '🧱', type: 'Khối hộp chữ nhật' }
        ];

    const item = items[Math.floor(Math.random() * items.length)];

    return {
      is3DMode: true,
      item,
      choices: ['Khối lập phương', 'Khối hộp chữ nhật'],
      correctAnswer: item.type,
      promptText: `${item.name} ${item.emoji} có dạng khối gì?`,
      hintText: item.type === 'Khối lập phương'
        ? `Tất cả các mặt đều là hình vuông bằng nhau!`
        : `Có các mặt dài hơn, dạng hình chữ nhật nè!`
    };
  } else {
    // Mode 2: Vị trí trong không gian (Trên / Dưới, Trái / Phải, Trước / Sau)
    const positions = [
      {
        ask: 'TRÊN',
        opp: 'DƯỚI',
        text: 'Chú chim 🐦 đang ở TRÊN hay ở DƯỚI ngọn cây 🌳?',
        correct: 'Ở TRÊN',
        choices: ['Ở TRÊN', 'Ở DƯỚI'],
        scene: '🌳 ⬆️ 🐦',
        hint: 'Nhìn hướng mũi tên chỉ lên phía trên ngọn cây nhé!'
      },
      {
        ask: 'DƯỚI',
        opp: 'TRÊN',
        text: 'Chú cá heo 🐬 đang bơi ở DƯỚI hay ở TRÊN mặt nước 🌊?',
        correct: 'Ở DƯỚI',
        choices: ['Ở TRÊN', 'Ở DƯỚI'],
        scene: '🌊 ⬇️ 🐬',
        hint: 'Chú cá heo đang lặn sâu phía dưới làn nước biển xanh nè!'
      },
      {
        ask: 'BÊN TRÁI',
        opp: 'BÊN PHẢI',
        text: 'Quả táo đỏ 🍎 đang ở BÊN TRÁI hay BÊN PHẢI bạn gấu 🧸?',
        correct: 'BÊN TRÁI',
        choices: ['BÊN TRÁI', 'BÊN PHẢI'],
        scene: '🍎  🧸',
        hint: 'Bàn tay trái của bé chỉ về phía quả táo nè!'
      },
      {
        ask: 'BÊN PHẢI',
        opp: 'BÊN TRÁI',
        text: 'Ngôi sao vàng ⭐️ đang ở BÊN PHẢI hay BÊN TRÁI mặt trăng 🌙?',
        correct: 'BÊN PHẢI',
        choices: ['BÊN TRÁI', 'BÊN PHẢI'],
        scene: '🌙  ⭐️',
        hint: 'Bàn tay phải của bé chỉ về phía ngôi sao vàng lấp lánh nè!'
      }
    ];

    const pos = positions[Math.floor(Math.random() * positions.length)];

    return {
      is3DMode: false,
      pos,
      choices: pos.choices,
      correctAnswer: pos.correct,
      promptText: pos.text,
      hintText: pos.hint
    };
  }
}

export function renderSpatialStage(question, onAnswer) {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  // Visual Scene Container
  const sceneBox = document.createElement('div');
  sceneBox.style.background = '#f8fafc';
  sceneBox.style.borderRadius = '24px';
  sceneBox.style.border = '3px solid #e2e8f0';
  sceneBox.style.padding = '24px 32px';
  sceneBox.style.marginBottom = '20px';
  sceneBox.style.display = 'flex';
  sceneBox.style.alignItems = 'center';
  sceneBox.style.justifyContent = 'center';
  sceneBox.style.gap = '20px';
  sceneBox.style.fontSize = '3.8rem';
  sceneBox.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';

  if (question.is3DMode) {
    sceneBox.innerHTML = `<span>${question.item.emoji}</span>`;
  } else {
    sceneBox.innerHTML = `<span>${question.pos.scene}</span>`;
  }

  container.appendChild(sceneBox);

  // Choices Row
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.fontSize = '1.35rem';
    btn.style.minWidth = '160px';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      onAnswer(val === question.correctAnswer, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
