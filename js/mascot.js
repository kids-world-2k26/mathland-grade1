import { store } from './state.js';
import { sounds } from './audio.js';

export const PRAISE_CATEGORIES = {
  // 1. Trả lời chính xác
  CORRECT: [
    "Chuẩn luôn {name} ơi! Bé chọn đúng rồi này! 🎯",
    "Đúng rồi nè {name}! Giỏi quá đi mất!",
    "Ồ, chính xác luôn! {name} làm tốt lắm nha!",
    "Đúng y chóc luôn {name} ơi! Cô thưởng cho một vỗ tay nha! 👏",
    "Chính xác rồi! {name} nhìn phát biết ngay luôn!",
    "Bé {name} làm đúng rồi nè, cẩn thận từng chút một luôn!",
    "Hay quá {name} ơi, đúng ngay đáp án rồi!",
    "Chuẩn không cần chỉnh luôn {name}! Giỏi ghê!",
    "Đúng rồi nè! {name} tinh mắt quá đi!",
    "Chính xác! Hôm nay {name} làm bài phong độ quá ta! ⭐"
  ],

  // 2. Tư duy thông minh (suy luận, quy luật, bài toán đố)
  SMART_THINKING: [
    "Trời ơi, {name} nghĩ ra cách này hay thế! Cô thích nha!",
    "Bé {name} suy luận thông minh ghê chưa!",
    "Đầu óc {name} hôm nay nảy số nhanh dữ ta! 🧠",
    "Cách làm của {name} siêu sáng tạo luôn!",
    "Mắt {name} tinh ghê, phát hiện ra chi tiết này luôn!",
    "A ha! {name} bắt đúng bản chất vấn đề rồi nè!",
    "Cô thích cách {name} chịu khó suy nghĩ trước khi chọn nè!",
    "Ý tưởng này hay quá {name} ơi! Nhanh trí ghê!",
    "Thông minh quá ta! {name} gỡ được nút thắt câu này rồi!",
    "Nhỏ mà có võ nha! {name} nghĩ ra góc này đỉnh thật! 🚀"
  ],

  // 3. Làm nhanh và chính xác
  FAST: [
    "Ủa {name}, sao bé làm nhanh như chớp vậy! ⚡",
    "Vừa nhanh vừa đúng! {name} siêu quá đi!",
    "Vèo một cái là xong! {name} làm cô bất ngờ luôn đó!",
    "Nhanh khủng khiếp! Cô còn chưa kịp nhìn xong đề nữa {name} ơi!",
    "Tay nhanh hơn chớp luôn {name}! Đúng rồi nè!",
    "Tốc độ tên lửa luôn {name} ơi! 🚀",
    "Làm vèo vèo mà vẫn đúng bon, đỉnh thiệt chứ!",
    "Hôm nay {name} bật chế độ siêu tốc rồi hả?",
    "Chớp mắt cái xong liền! {name} cừ quá!",
    "Siêu nhanh siêu chuẩn! Đúng là cao thủ {name}!"
  ],

  // 4. Nỗ lực (động viên khi làm sai hoặc bài khó)
  EFFORT: [
    "Cô thấy {name} cố gắng hết sức luôn rồi nè, thương quá!",
    "Câu này hơi hóc xíu nhưng {name} không bỏ cuộc là tuyệt rồi!",
    "Cố lên {name}! Tinh thần của bé đáng khen lắm đó! 💪",
    "Nhìn {name} tập trung làm bài cô thích quá chừng luôn!",
    "Cứ nỗ lực thế này thì {name} sợ gì bài khó nữa nè!",
    "Hơi khó tẹo thôi, {name} thử thêm xíu nữa xem sao nha!",
    "Cô thích nhất cái tính chịu khó mày mò của {name} đó!",
    "Mỗi lần {name} cố gắng là lại giỏi hơn một chút rồi nè!",
    "Dũng cảm lắm {name}! Không sợ bài khó tí nào!",
    "Cố gắng tuyệt vời! Cô tin {name} thế nào cũng làm được!"
  ],

  // 5. Kiên trì (khi thử lại nhiều lần và làm đúng)
  PERSISTENCE: [
    "Thấy chưa! Kiên trì chút là {name} làm được liền!",
    "Thử lại cái làm được luôn! {name} đỉnh quá! 🎉",
    "Không nản lòng là {name} thắng chắc rồi!",
    "Mày mò hồi lâu cũng ra rồi nè! Giỏi quá {name} ơi!",
    "Cô nể tinh thần quyết làm bằng được của {name} luôn đó!",
    "Sai xíu có sao đâu, quan trọng là {name} chịu làm lại nè!",
    "Càng kiên trì là {name} càng giỏi ra đó nha!",
    "Cuối cùng cũng hạ gục câu này rồi! Tự hào về {name} quá!",
    "Lì ngợm dữ ta! Khó mấy {name} cũng không chịu hàng luôn!",
    "Bền bỉ như vậy thì bài nào làm khó được {name} chứ!"
  ],

  // 6. Tiến bộ
  PROGRESS: [
    "Chà, {name} dạo này tiến bộ vượt bậc luôn nha!",
    "Hôm nay {name} làm tốt hơn hôm qua nhiều luôn đó!",
    "Mỗi ngày giỏi lên một chút, tuyệt lắm {name} ơi!",
    "Càng ngày {name} làm bài càng mượt nha!",
    "Cô thấy rõ sự tiến bộ của {name} luôn rồi nè!",
    "Nhìn {name} học giỏi lên từng ngày cô vui hết sức!",
    "Dạo này {name} tự tin hẳn lên nha!",
    "Cố gắng của {name} bắt đầu có quả ngọt rồi nè!",
    "Mấy câu hồi trước làm khó {name}, giờ nhẹ nhàng vượt qua luôn!",
    "Đà này là {name} sắp thành ngôi sao học tập rồi đó!"
  ],

  // 7. Tự tin (củng cố niềm tin)
  CONFIDENCE: [
    "Thấy chưa, {name} cứ tự tin lên là làm được hết!",
    "Cô biết thừa là {name} cân được câu này mà!",
    "Tự tin lên nha, {name} giỏi hơn bé nghĩ nhiều đó!",
    "Làm được rồi nè! Thấy mình xịn chưa {name}?",
    "Câu này khó thế mà {name} làm ngọt xớt, tự tin lên nha!",
    "Cứ vững tin vào bản thân nhé {name}, bé làm tốt lắm!",
    "Cô luôn tin là {name} sẽ làm tốt mà!",
    "Đấy, {name} chứng minh cho mọi người thấy năng lực rồi nha!",
    "Bộ não của {name} siêu xịn, nhớ tin tưởng nó nha!",
    "Quá tuyệt! {name} hoàn toàn có quyền tự hào về mình!"
  ],

  // 8. Thành tích nổi bật (chuỗi đúng dài, điểm cao)
  EXCELLENT: [
    "Xuất sắc luôn {name} ơi! Tỏa sáng nhất hôm nay rồi! 🌟",
    "Đỉnh của đỉnh! Màn thể hiện quá mượt mà {name} ơi!",
    "Kiểu này phải trao bằng khen danh dự cho {name} ngay thôi! 🥇",
    "Phong độ đỉnh cao quá {name} ơi! Giữ nguyên phong độ nha!",
    "Kết quả xuất sắc! Cô tự hào về {name} lắm đó!",
    "Hôm nay {name} gánh team được luôn rồi đó nha! ⭐",
    "Không còn từ gì để chê! {name} quá đỉnh!",
    "Màn trình diễn điểm 10 chất lượng từ vị trí {name}!",
    "Chinh phục bài tập xuất sắc quá {name} ơi!",
    "Đỉnh kịch trần luôn {name} ơi! Quá xịn!"
  ],

  // 9. Tạo niềm vui
  FUN: [
    "Yeahhh! Quá đã {name} ơi! 🎉",
    "Bingo! Thêm một câu bị {name} thu phục!",
    "Vui quá xá! {name} lại làm đúng nữa rồi!",
    "Tuyệt vời quá chừng luôn {name}! Ăn mừng thôi! 🥳",
    "Yay! Đáp án chuẩn đét đã thuộc về {name}!",
    "Hoan hô! {name} cộng thêm 1 điểm uy tín nha!",
    "Ting ting! Bỏ túi thêm một câu đúng rồi {name} ơi! ⭐",
    "Đã tay quá! {name} lại vượt qua thêm cửa nữa rồi!",
    "Aha! Bắt bài câu này dễ ợt đúng không {name}?",
    "Ghi điểm đẹp mắt quá {name} ơi! 🏆"
  ],

  // 10. Khuyến khích làm tiếp
  NEXT_CHALLENGE: [
    "Mượt quá {name} ơi! Sang câu tiếp theo chiến tiếp nào! 🚀",
    "Hạ gục câu này rồi, thừa thắng xông lên nha {name}!",
    "Đang trên đà thắng lợi, thử câu tiếp theo luôn {name} ơi!",
    "Phong độ đang cao, thừa thắng xông lên thôi {name}! 🌟",
    "Hay quá! Cùng xem câu tiếp theo có làm khó được {name} không nha!",
    "Càng làm càng hăng, tiến lên câu tiếp theo nào {name}!",
    "Một chiến thắng nữa rồi! Qua câu mới thôi {name}!",
    "Đang tiện tay làm đúng, mình quất luôn câu tiếp theo nhé {name}!",
    "Sẵn sàng cho thử thách mới chưa {name}? Thử sức thôi nào!",
    "Thẳng tiến về đích thôi {name} ơi, câu tiếp theo đang chờ!"
  ],

  // Lời chào & Kết thúc vòng
  welcome: [
    "Chào bé {name} nha! Hôm nay cùng cô khám phá vương quốc toán học nghen!",
    "Bé {name} ơi, chọn một hòn đảo kỳ diệu để tụi mình cùng chơi nào!",
    "Cùng đếm số và rinh thật nhiều ngôi sao lấp lánh nha bé {name}!"
  ],
  roundWin: [
    "Hoan hô! Bé {name} đã hoàn thành bài tập xuất sắc dữ luôn! Rinh 3 ngôi sao nghen!",
    "Chúc mừng {name} nha! Mở quà xem nhãn dán mới toanh nè!",
    "Tuyệt vời quá {name} ơi! Càng chơi bé càng thông minh xuất sắc!"
  ]
};

// Aliases
PRAISE_CATEGORIES.tryAgain = PRAISE_CATEGORIES.EFFORT;
PRAISE_CATEGORIES.correct = PRAISE_CATEGORIES.CORRECT;

class Mascot {
  constructor() {
    this.name = 'Cú Vàng Pip';
    this.currentText = '';
    this.usedPraisesHistory = [];
  }

  init() {
    this.sayRandom('welcome');

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
        sounds.speak(this.currentSpeechText || this.currentText);
      });
    }
  }

  say(text, autoRead = false, onEndCallback = null, speechText = null) {
    this.currentText = text;
    this.currentSpeechText = speechText || text;
    const bubbleEl = document.getElementById('mascot-text');
    if (bubbleEl) {
      bubbleEl.textContent = text;
      bubbleEl.parentElement.classList.remove('pop-anim');
      void bubbleEl.parentElement.offsetWidth; // trigger reflow
      bubbleEl.parentElement.classList.add('pop-anim');
    }
    if (autoRead) {
      sounds.speak(this.currentSpeechText, onEndCallback);
    } else if (onEndCallback) {
      onEndCallback();
    }
  }

  // Lựa chọn danh mục khen ngợi thông minh dựa trên ngữ cảnh hành vi của bé
  selectCategory(context = {}) {
    if (!context.correct) {
      return 'EFFORT';
    }

    // 1. Ưu tiên cao nhất: Kiên trì sau khi thử lại (attemptNumber > 1)
    if (context.attemptNumber > 1) {
      return 'PERSISTENCE';
    }

    // 2. Thành tích nổi bật khi có chuỗi đúng liên tiếp (streak >= 4)
    if (context.streak >= 4) {
      return 'EXCELLENT';
    }

    // 3. Phản xạ siêu nhanh (responseTime < 2800ms ở lần bấm đầu tiên)
    if (context.responseTimeMs && context.responseTimeMs < 2800) {
      return 'FAST';
    }

    // 4. Tư duy thông minh ở các chủ đề suy luận logic, hình học, tách gộp, lời văn
    const logicZones = ['bonds', 'shapes', 'spatial', 'wordproblems', 'clock'];
    if (logicZones.includes(context.zoneId) && Math.random() < 0.6) {
      return 'SMART_THINKING';
    }

    // 5. Tiến bộ (streak 2 hoặc 3)
    if (context.streak === 2 || context.streak === 3) {
      if (Math.random() < 0.5) return 'PROGRESS';
    }

    // 6. Củng cố tự tin sau khi đắn đo suy nghĩ lâu (> 4500ms)
    if (context.responseTimeMs && context.responseTimeMs > 4500) {
      return 'CONFIDENCE';
    }

    // 7. Mặc định: Luân phiên giữa Trả lời chính xác và Niềm vui
    return Math.random() < 0.5 ? 'CORRECT' : 'FUN';
  }

  // Khen ngợi theo ngữ cảnh kết quả và hành vi
  sayPraise(context = {}, autoRead = true, onEndCallback = null) {
    const category = this.selectCategory(context);
    return this.sayRandom(category, autoRead, onEndCallback);
  }

  // Chuẩn hóa phát âm câu khen ngợi cho giọng cô giáo miền Nam để khớp 100% manifest
  normalizeSpeech(template) {
    let t = template.replace(/\{name\} ơi/gi, 'bé ơi');
    t = t.replace(/\{name\} của cô/gi, 'bé của cô');
    t = t.replace(/Bé \{name\}/gi, 'Bé');
    t = t.replace(/\{name\}/gi, 'bé');
    t = t.replace(/vãi chưởng/gi, 'quá chừng');
    return t
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}]/gu, '')
      .replace(/[\{\}\[\]\*\#]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Chọn câu khen ngợi ngẫu nhiên trong danh mục, không lặp lại 15 câu gần nhất
  sayRandom(category, autoRead = false, onEndCallback = null) {
    const list = PRAISE_CATEGORIES[category] || PRAISE_CATEGORIES.CORRECT;

    // Lọc các câu chưa nói gần đây theo khóa định danh
    const available = list
      .map((text, idx) => ({ key: `${category}_${idx}`, text }))
      .filter(item => !this.usedPraisesHistory.includes(item.key));

    let chosen;
    if (available.length > 0) {
      chosen = available[Math.floor(Math.random() * available.length)];
    } else {
      const fallbackIdx = Math.floor(Math.random() * list.length);
      chosen = { key: `${category}_${fallbackIdx}`, text: list[fallbackIdx] };
      this.usedPraisesHistory = [];
    }

    this.usedPraisesHistory.push(chosen.key);
    if (this.usedPraisesHistory.length > 15) {
      this.usedPraisesHistory.shift();
    }

    let msg = chosen.text;
    const name = store.getPlayerName();
    msg = msg.replace(/\{name\}/g, name);

    const speechText = this.normalizeSpeech(chosen.text);
    this.say(msg, autoRead, onEndCallback, speechText);
    return msg;
  }
}

export const mascot = new Mascot();
