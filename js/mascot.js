import { store } from './state.js';
import { sounds } from './audio.js';

const MASCOT_MESSAGES = {
  welcome: [
    "Chào bé {name} nha! Hôm nay cùng cô khám phá vương quốc toán học nghen!",
    "Bé {name} ơi, chọn một hòn đảo kỳ diệu để tụi mình cùng chơi nào!",
    "Cùng đếm số và rinh thật nhiều ngôi sao lấp lánh nha bé {name}!"
  ],
  correct: [
    "Đúng rồi! Bé {name} giỏi quá ta! 🌟",
    "Chính xác! Bé {name} làm xuất sắc lắm nha!",
    "Tuyệt quá! {name} thông minh ghê luôn!",
    "Đúng rồi nè! {name} giỏi quá chừng!",
    "Bé {name} siêu quá ta ơi! Quá đỉnh luôn nè!",
    "Bingo! {name} tính nhanh như chớp vậy đó!",
    "Hay dữ ta! Bé {name} làm đúng nữa rồi!",
    "Giỏi quá trời quá đất! Điểm mười cho {name} nha!",
    "Hoan hô {name}! Bé làm cô vui quá nè!",
    "Chính xác luôn! {name} ơi, tiếp tục tỏa sáng nha!",
    "Bé {name} thông thái số một luôn ta ơi!",
    "Đúng rồi! Cô khen bé {name} làm nhanh xuất sắc nghen!"
  ],
  tryAgain: [
    "Gần đúng rồi nè {name} ơi! Bình tĩnh nhìn kỹ lại chút xíu nha!",
    "Úi chà! Không sao đâu bé {name}, mình cùng thử lại nghen!",
    "Cố lên nha {name}! Đếm chậm từng cái một xem sao nè!",
    "Bé {name} làm được mà! Thử lại một lần nữa là trúng liền nè!"
  ],
  roundWin: [
    "Hoan hô! Bé {name} đã hoàn thành bài tập xuất sắc dữ luôn! Rinh 3 ngôi sao nghen!",
    "Chúc mừng {name} nha! Mở quà xem nhãn dán mới toanh nè!",
    "Tuyệt vời quá {name} ơi! Càng chơi bé càng thông minh xuất sắc!"
  ]
};

class Mascot {
  constructor() {
    this.name = 'Cú Vàng Pip';
    this.currentText = '';
    this.lastPraiseIndex = -1;
  }

  init() {
    this.sayRandom('welcome');
    
    // Clicking the mascot triggers a cheerful greeting
    const avatarEl = document.getElementById('mascot-avatar');
    if (avatarEl) {
      avatarEl.addEventListener('click', () => {
        sounds.playPop();
        const greetings = [
          "Hu-hú! Tớ là Cú Vàng Pip đây! Tớ rất mê toán học!",
          "Bé có biết những con số là bạn thân của chúng mình không?",
          "Bấm vào chiếc loa bất cứ lúc nào để nghe tớ đọc câu hỏi nhé!",
          "Hôm nay bé làm rất tuyệt vời đấy!"
        ];
        const msg = greetings[Math.floor(Math.random() * greetings.length)];
        this.say(msg, true);
      });
    }

    const speakBtn = document.getElementById('mascot-speak-btn');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        sounds.speak(this.currentText);
      });
    }
  }

  say(text, autoRead = false) {
    this.currentText = text;
    const bubbleEl = document.getElementById('mascot-text');
    if (bubbleEl) {
      bubbleEl.textContent = text;
      bubbleEl.parentElement.classList.remove('pop-anim');
      void bubbleEl.parentElement.offsetWidth; // trigger reflow
      bubbleEl.parentElement.classList.add('pop-anim');
    }
    if (autoRead) {
      sounds.speak(text);
    }
  }

  sayRandom(category, autoRead = false) {
    const list = MASCOT_MESSAGES[category] || MASCOT_MESSAGES.welcome;
    let chosenIdx = Math.floor(Math.random() * list.length);
    if (list.length > 1 && chosenIdx === this.lastPraiseIndex) {
      chosenIdx = (chosenIdx + 1) % list.length;
    }
    this.lastPraiseIndex = chosenIdx;

    let msg = list[chosenIdx];
    const name = store.getPlayerName();
    msg = msg.replace(/\{name\}/g, name);

    this.say(msg, autoRead);
  }
}

export const mascot = new Mascot();
