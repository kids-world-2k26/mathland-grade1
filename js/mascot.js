// Mascot Companion "Pip the Owl" for MathLand Adventure
import { sounds } from './audio.js';

const MASCOT_MESSAGES = {
  welcome: [
    "Chào bạn nhỏ! Cùng khám phá vương quốc toán học nhé!",
    "Bé hãy chọn một hòn đảo kỳ diệu để bắt đầu nào!",
    "Cùng đếm số, làm toán và thu thập thật nhiều ngôi sao lấp lánh nào!"
  ],
  correct: [
    "Hoan hô! Bé trả lời đúng rồi! 🌟",
    "Tuyệt vời ông mặt trời! Bé thông minh quá!",
    "Chính xác luôn! Bé làm tốt lắm!",
    "Đỉnh chóp! Tiếp tục phát huy nào!",
    "Bé giỏi quá đi thôi! Hãy tỏa sáng nào!"
  ],
  tryAgain: [
    "Gần đúng rồi! Bé hãy bình tĩnh đếm lại nhé!",
    "Úi chà! Không sao cả, mình cùng thử lại nào!",
    "Cố lên bé ơi! Đếm từng cái một xem sao nhé!",
    "Bé làm được mà! Thử lại một lần nữa nhé!"
  ],
  roundWin: [
    "Bé đã hoàn thành xuất sắc! Nhận ngay 3 ngôi sao lấp lánh nào!",
    "Chúc mừng bé! Hãy xem nhãn dán mới toanh nhé!",
    "Tuyệt vời quá! Bé ngày càng thông thái hơn rồi đấy!"
  ]
};

class Mascot {
  constructor() {
    this.name = 'Cú Vàng Pip';
    this.currentText = '';
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
    const msg = list[Math.floor(Math.random() * list.length)];
    this.say(msg, autoRead);
  }
}

export const mascot = new Mascot();
