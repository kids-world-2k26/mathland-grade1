import { store } from './state.js';
import { sounds } from './audio.js';

const MASCOT_MESSAGES = {
  welcome: [
    "Chào bé {name} nha! Hôm nay cùng cô khám phá vương quốc toán học nghen!",
    "Bé {name} ơi, chọn một hòn đảo kỳ diệu để tụi mình cùng chơi nào!",
    "Cùng đếm số và rinh thật nhiều ngôi sao lấp lánh nha bé {name}!"
  ],
  correct: [
    "Đúng rồi nè! Bé {name} tính nhanh như chớp luôn ta ơi! 🌟",
    "Chính xác một trăm phần trăm luôn! {name} của cô cừ ghê!",
    "Tuyệt vời quá chừng luôn {name} ơi! Quá đỉnh!",
    "Đúng y chóc luôn! Bé {name} giỏi quá trời quá đất nè!",
    "Hay dữ dằn luôn {name} ơi! Điểm mười xuất sắc cho bé nha!",
    "Hoan hô bé {name}! Trả lời trúng phóc luôn rồi nè!",
    "Bé {name} thông minh sáng dạ quá, cô khen bé nhiều nha!",
    "Ôi chu choa, bé {name} làm đúng nữa rồi nè, giỏi ghê chưa!",
    "Chính xác rồi nè! Bé {name} làm cô tự hào quá đi!",
    "Quá đã luôn {name} ơi! Làm đúng bon không sai một ly nào hết!",
    "Giỏi quá xá là giỏi luôn {name} ơi! Cứ thế mà phát huy nghen!",
    "Bé {name} đúng là nhà thông thái nhí của cô rồi nè!",
    "Chuẩn không cần chỉnh luôn {name} ơi! Tuyệt cú mèo!",
    "Bingo! Đúng nữa rồi! Bé {name} học giỏi dữ dội luôn!",
    "Bé {name} giải toán siêu đẳng ghê ta ơi! Tiếp tục nào!",
    "Đúng rồi nha! {name} trả lời vừa nhanh vừa chính xác luôn đó!",
    "Thật là xuất sắc! Cô tặng bé {name} một tràng pháo tay thật to nè!",
    "Bé {name} siêu sao toán học của cô ơi, đúng nữa rồi nè!",
    "Dữ dội quá ta! Bé {name} tính nhẩm đỉnh của chóp luôn!",
    "Chính xác tuyệt đối luôn! Bé {name} xứng đáng nhận cúp vàng nha!",
    "Mười điểm về chỗ nha {name} ơi! Làm đúng quá chừng luôn!",
    "Hổng chê vào đâu được luôn! Bé {name} thông minh số một nè!",
    "Đúng rồi nè cưng! Bé {name} làm bài cẩn thận và giỏi dữ ta!",
    "Tuyệt đỉnh luôn {name} ơi! Cô mê cách bé làm toán quá đi à!",
    "Trúng phóc luôn rồi! {name} thông minh như vậy là cô vui lắm đó!",
    "Hay quá xá luôn {name} ơi! Bé thông minh tài ba quá nè!",
    "Đúng bon luôn nè {name}! Giỏi giang hết phần thiên hạ luôn!",
    "Quá cừ khôi luôn! Bé {name} làm cô vỗ tay không ngớt luôn đó!"
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
    this.usedPraisesHistory = [];
  }

  init() {
    this.sayRandom('welcome');
    
    // Clicking the mascot triggers a cheerful greeting
    const avatarEl = document.getElementById('mascot-avatar');
    if (avatarEl) {
      avatarEl.addEventListener('click', () => {
        sounds.playPop();
        const name = store.getPlayerName();
        const greetings = [
          `Hu-hú! Tớ là Cú Vàng Pip đây! Tớ rất thích học toán cùng bé ${name}!`,
          `Bé ${name} có biết những con số là bạn thân của chúng mình không?`,
          `Bấm vào chiếc loa bất cứ lúc nào để nghe cô đọc câu hỏi to rõ nha bé ${name}!`,
          `Hôm nay bé ${name} làm bài rất là tuyệt vời đó nghen!`
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

  say(text, autoRead = false, onEndCallback = null) {
    this.currentText = text;
    const bubbleEl = document.getElementById('mascot-text');
    if (bubbleEl) {
      bubbleEl.textContent = text;
      bubbleEl.parentElement.classList.remove('pop-anim');
      void bubbleEl.parentElement.offsetWidth; // trigger reflow
      bubbleEl.parentElement.classList.add('pop-anim');
    }
    if (autoRead) {
      sounds.speak(text, onEndCallback);
    } else if (onEndCallback) {
      onEndCallback();
    }
  }

  sayRandom(category, autoRead = false, onEndCallback = null) {
    const list = MASCOT_MESSAGES[category] || MASCOT_MESSAGES.welcome;

    // Pick non-repeating message using a history filter
    const available = list.map((_, i) => i).filter(i => !this.usedPraisesHistory.includes(i));
    let chosenIdx;
    if (available.length > 0) {
      chosenIdx = available[Math.floor(Math.random() * available.length)];
    } else {
      chosenIdx = Math.floor(Math.random() * list.length);
      this.usedPraisesHistory = [];
    }

    this.usedPraisesHistory.push(chosenIdx);
    if (this.usedPraisesHistory.length > 15) {
      this.usedPraisesHistory.shift();
    }

    let msg = list[chosenIdx];
    const name = store.getPlayerName();
    msg = msg.replace(/\{name\}/g, name);

    this.say(msg, autoRead, onEndCallback);
    return msg;
  }
}

export const mascot = new Mascot();
