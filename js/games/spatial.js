// Spatial & 3D Shapes Module (Khối Lập Phương, Khối Hộp Chữ Nhật & Vị Trí Không Gian)
// Theo Bài 14 & 15 - SGK Toán 1 Kết Nối Tri Thức Với Cuộc Sống
import { sounds } from '../audio.js';

export function generateSpatialQuestion() {
  const mode = Math.floor(Math.random() * 3);

  if (mode === 0) {
    // Mode 0: Khối lập phương vs Khối hộp chữ nhật (Bài 14 SGK)
    const isCube = Math.random() > 0.5;
    const items = isCube
      ? [
          { name: 'Viên xúc xắc (xí ngầu)', emoji: '🎲', type: 'Khối lập phương' },
          { name: 'Khối rubik vuông vắn', emoji: '🧊', type: 'Khối lập phương' },
          { name: 'Hộp quà vuông vức', emoji: '🎁', type: 'Khối lập phương' },
          { name: 'Thùng gỗ vuông', emoji: '🪵', type: 'Khối lập phương' }
        ]
      : [
          { name: 'Hộp sữa chua / sữa tươi', emoji: '🧃', type: 'Khối hộp chữ nhật' },
          { name: 'Bao diêm / hộp bút', emoji: '📦', type: 'Khối hộp chữ nhật' },
          { name: 'Viên gạch xây nhà', emoji: '🧱', type: 'Khối hộp chữ nhật' },
          { name: 'Tủ lạnh mini', emoji: '🚪', type: 'Khối hộp chữ nhật' }
        ];

    const item = items[Math.floor(Math.random() * items.length)];

    return {
      mode: '3d_shapes',
      item,
      choices: ['Khối lập phương', 'Khối hộp chữ nhật'],
      correctAnswer: item.type,
      promptText: `${item.name} ${item.emoji} có dạng khối gì?`,
      hintText: item.type === 'Khối lập phương'
        ? `Tất cả các mặt đều là hình vuông bằng nhau!`
        : `Có các mặt dài hơn, dạng hình chữ nhật nè!`
    };
  } else if (mode === 1) {
    // Mode 1: Vị trí "Ở GIỮA" (Bài 15 SGK)
    const scenarios = [
      { left: '🧸 Gấu bông', mid: '⚽️ Quả bóng', right: '🐰 Chú thỏ', target: 'Quả bóng' },
      { left: '🍎 Quả táo', mid: '⭐️ Ngôi sao', right: '🍊 Quả cam', target: 'Ngôi sao' },
      { left: '🚗 Ô tô', mid: '🚀 Tên lửa', right: '🚲 Xe đạp', target: 'Tên lửa' }
    ];
    const sc = scenarios[Math.floor(Math.random() * scenarios.length)];
    const choices = [sc.left.split(' ')[1], sc.mid.split(' ')[1], sc.right.split(' ')[1]];
    const correctAnswer = sc.target;

    return {
      mode: 'in_between',
      sc,
      choices,
      correctAnswer,
      promptText: `Vật nào đang nằm Ở GIỮA?`,
      hintText: `Nằm ở giữa là đứng ngăn cách giữa bên trái và bên phải nè bé!`
    };
  } else {
    // Mode 2: Vị trí Trên/Dưới, Trước/Sau, Trái/Phải (Bài 15 SGK)
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
        ask: 'PHÍA TRƯỚC',
        opp: 'PHÍA SAU',
        text: 'Chú cún con 🐶 đang đứng ở PHÍA TRƯỚC hay PHÍA SAU ngôi nhà 🏡?',
        correct: 'PHÍA TRƯỚC',
        choices: ['PHÍA TRƯỚC', 'PHÍA SAU'],
        scene: '🏡 ➡️ 🐶',
        hint: 'Chú cún đứng ngay trước cửa ra vào của ngôi nhà nè!'
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
      mode: 'position',
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

  const sceneBox = document.createElement('div');
  sceneBox.style.background = '#f8fafc';
  sceneBox.style.borderRadius = '24px';
  sceneBox.style.border = '3px solid #e2e8f0';
  sceneBox.style.padding = '24px 32px';
  sceneBox.style.margin = '16px 0';
  sceneBox.style.textAlign = 'center';
  sceneBox.style.maxWidth = '500px';

  if (question.mode === '3d_shapes') {
    sceneBox.innerHTML = `
      <div style="font-size: 5rem; margin-bottom: 8px;">${question.item.emoji}</div>
      <div style="font-family: var(--font-heading); font-size: 1.4rem; color: #1e293b; font-weight: 700;">
        ${question.item.name}
      </div>
    `;
  } else if (question.mode === 'in_between') {
    sceneBox.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; justify-content: center; font-size: 3rem; margin-bottom: 12px;">
        <div style="padding: 10px; background: white; border-radius: 16px; border: 2px solid #cbd5e1;">${question.sc.left.split(' ')[0]}</div>
        <div style="padding: 10px; background: #fef08a; border-radius: 16px; border: 3px dashed #ca8a04; transform: scale(1.15);">${question.sc.mid.split(' ')[0]}</div>
        <div style="padding: 10px; background: white; border-radius: 16px; border: 2px solid #cbd5e1;">${question.sc.right.split(' ')[0]}</div>
      </div>
      <div style="font-size: 1.1rem; color: #475569; font-weight: 600;">
        ${question.sc.left} — ${question.sc.mid} — ${question.sc.right}
      </div>
    `;
  } else {
    sceneBox.innerHTML = `
      <div style="font-size: 3.8rem; margin-bottom: 8px; letter-spacing: 12px;">
        ${question.pos.scene}
      </div>
      <div style="font-size: 1rem; color: #64748b; font-weight: 600;">
        Quan sát vị trí của hai vật trong hình nhé!
      </div>
    `;
  }

  container.appendChild(sceneBox);

  // Choices
  const choicesRow = document.createElement('div');
  choicesRow.className = 'choices-row';

  question.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.fontSize = '1.25rem';
    btn.textContent = choice;
    btn.addEventListener('click', () => {
      onAnswer(choice === question.correctAnswer, btn);
    });
    choicesRow.appendChild(btn);
  });

  container.appendChild(choicesRow);
  return container;
}
