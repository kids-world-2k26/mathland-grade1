// State Management & LocalStorage Persistence for MathLand Adventure

const STORAGE_KEY = 'mathland_adventure_save_v1';

export const ALL_STICKERS = [
  { id: 'stk_1', icon: '🌟', name: 'Ngôi Sao Sáng', req: 'Đạt 3 ngôi sao', condition: s => s.stars >= 3 },
  { id: 'stk_2', icon: '🍎', name: 'Táo Ngọt Ngào', req: 'Chơi đếm số 3 lần', condition: s => (s.zoneStats['counting'] || 0) >= 3 },
  { id: 'stk_3', icon: '🐸', name: 'Chú Ếch Vui Vẻ', req: 'Chơi phép cộng 3 lần', condition: s => (s.zoneStats['addition'] || 0) >= 3 },
  { id: 'stk_4', icon: '🎈', name: 'Bóng Bay Nổ', req: 'Chơi phép trừ 3 lần', condition: s => (s.zoneStats['subtraction'] || 0) >= 3 },
  { id: 'stk_5', icon: '🐊', name: 'Cá Sấu Háu Ăn', req: 'So sánh số 3 lần', condition: s => (s.zoneStats['compare'] || 0) >= 3 },
  { id: 'stk_6', icon: '🧩', name: 'Bậc Thầy Tách Gộp', req: 'Giải sơ đồ số 3 lần', condition: s => (s.zoneStats['bonds'] || 0) >= 3 },
  { id: 'stk_7', icon: '🔷', name: 'Nhà Hình Học', req: 'Đoán hình học 3 lần', condition: s => (s.zoneStats['shapes'] || 0) >= 3 },
  { id: 'stk_8', icon: '⏰', name: 'Đồng Hồ Tí Tắc', req: 'Xem giờ 3 lần', condition: s => (s.zoneStats['clock'] || 0) >= 3 },
  { id: 'stk_9', icon: '🚀', name: 'Phi Hành Gia', req: 'Đạt 15 ngôi sao', condition: s => s.stars >= 15 },
  { id: 'stk_10', icon: '🦄', name: 'Kỳ Lân Phép Thuật', req: 'Đạt 25 ngôi sao', condition: s => s.stars >= 25 },
  { id: 'stk_11', icon: '👑', name: 'Vua Toán Học', req: 'Đạt 40 ngôi sao', condition: s => s.stars >= 40 },
  { id: 'stk_12', icon: '🏆', name: 'Quán Quân Toàn Năng', req: 'Chơi đủ cả 7 thử thách', condition: s => Object.keys(s.zoneStats).length >= 7 }
];

class StateStore {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read state from localStorage', e);
    }
    return {
      stars: 0,
      unlockedStickers: [],
      zoneStats: {},
      currentStreak: 0,
      playerName: '',
      playerAvatar: '⭐️'
    };
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Could not save state to localStorage', e);
    }
  }

  getPlayerName() {
    return this.data.playerName || 'Bé Yêu';
  }

  hasCustomName() {
    return !!(this.data.playerName && this.data.playerName.trim().length > 0);
  }

  setPlayerName(name, avatar = '⭐️') {
    this.data.playerName = (name || '').trim();
    if (avatar) this.data.playerAvatar = avatar;
    this.save();
  }

  getPlayerAvatar() {
    return this.data.playerAvatar || '⭐️';
  }

  addStars(count = 1) {
    this.data.stars += count;
    this.data.currentStreak += 1;
    this.save();
    return this.checkNewStickers();
  }

  recordZonePlay(zoneId) {
    if (!this.data.zoneStats[zoneId]) {
      this.data.zoneStats[zoneId] = 0;
    }
    this.data.zoneStats[zoneId] += 1;
    this.save();
    return this.checkNewStickers();
  }

  checkNewStickers() {
    const newlyUnlocked = [];
    ALL_STICKERS.forEach(sticker => {
      if (!this.data.unlockedStickers.includes(sticker.id)) {
        if (sticker.condition(this.data)) {
          this.data.unlockedStickers.push(sticker.id);
          newlyUnlocked.push(sticker);
        }
      }
    });
    if (newlyUnlocked.length > 0) {
      this.save();
    }
    return newlyUnlocked;
  }

  getStars() {
    return this.data.stars;
  }

  getStickerCount() {
    return this.data.unlockedStickers.length;
  }

  isStickerUnlocked(id) {
    return this.data.unlockedStickers.includes(id);
  }

  resetProgress() {
    this.data = {
      stars: 0,
      unlockedStickers: [],
      zoneStats: {},
      currentStreak: 0,
      playerName: 'Math Explorer'
    };
    this.save();
  }
}

export const store = new StateStore();
