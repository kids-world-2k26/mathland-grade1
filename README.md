# 🌟 Vương Quốc Toán Lớp 1 (MathLand Adventure - Grade 1)

Ứng dụng web học Toán tương tác sinh động, vui nhộn dành cho học sinh Lớp 1 (6–7 tuổi). Ứng dụng kết hợp phương pháp trực quan (khung 10 ô, tia số, sơ đồ tách - gộp số), hệ thống âm thanh tổng hợp (Web Audio API), giọng đọc Tiếng Việt (Web Speech API) và bộ sưu tập 12 nhãn dán phần thưởng hấp dẫn.

---

## ✨ Tính Năng Nổi Bật

1. **⭐️ Đếm Số & Khung 10 Ô**:
   - Đếm các đồ vật đáng yêu (táo, ngôi sao, ô tô, vịt con) với tính năng chạm để đếm có đánh dấu tích.
   - Trực quan hóa số lượng từ 1 đến 10 với Khung 10 ô (Ten-Frame).

2. **➕ Thám Hiểm Phép Cộng**:
   - Gộp các nhóm số lượng trực quan.
   - Chú Ếch vui vẻ nhảy từng bước về phía trước trên Tia số (Number Line).

3. **➖ Thử Thách Phép Trừ**:
   - Trò chơi chạm để nổ bóng bay (Balloon Pop) kèm âm thanh rộn rã và đếm số bóng còn lại.

4. **🧩 Sơ Đồ Tách - Gộp Số**:
   - Mô hình Part-Part-Whole giúp bé rèn luyện tư duy số học và tính nhẩm linh hoạt.

5. **🐊 Cá Sấu Háu Ăn**:
   - Bạn cá sấu Allie há miệng ngoạm số lớn hơn giúp bé làm chủ các dấu `>`, `=`, `<`.

6. **🔷 Hình Học & Quy Luật**:
   - Nhận biết các hình 2D cơ bản: Hình tròn, hình vuông, hình tam giác, hình chữ nhật, hình thoi, hình ngôi sao.
   - Điền hình tiếp theo vào Đoàn tàu quy luật (chuỗi chu kỳ AB, AAB).

7. **⏰ Bé Xem Đồng Hồ**:
   - Đồng hồ kim mô phỏng trực quan xem giờ đúng (`:00`) và giờ rưỡi (`:30`).

8. **🦉 Bạn Đồng Hành & Phần Thưởng**:
   - Bạn Cú Vàng Pip trò chuyện, cổ vũ và đọc to câu hỏi khi bé chạm vào biểu tượng loa.
   - Tích lũy ngôi sao sau mỗi vòng để mở khóa 12 nhãn dán trong Bộ sưu tập.
   - Hiệu ứng pháo hoa ăn mừng rực rỡ khi hoàn thành nhiệm vụ.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Trực Tiếp

Ứng dụng được xây dựng hoàn toàn bằng **HTML5, CSS3 và Vanilla ES Modules**, không phụ thuộc thư viện nặng ngoài, chạy ngay lập tức.

### Cách 1: Chạy bằng máy chủ cục bộ (Python)
```bash
# Mở terminal tại thư mục dự án
python -m http.server 3000
```
Sau đó truy cập trình duyệt tại: `http://localhost:3000`

### Cách 2: Chạy bằng Node.js (npx serve)
```bash
npx serve .
```

### Cách 3: Mở trực tiếp
Nhấp đúp chuột vào tệp `index.html` để mở trong bất kỳ trình duyệt hiện đại nào (Chrome, Edge, Cốc Cốc, Safari, Firefox).

---

## 🛠 Cấu Trúc Mã Nguồn

```
├── index.html            # Giao diện chính ứng dụng
├── .gitignore            # Danh sách tệp loại trừ của Git
├── README.md             # Tài liệu giới thiệu dự án
├── css/
│   ├── main.css          # Hệ thống giao diện, màu sắc, font chữ Fredoka/Quicksand
│   ├── components.css    # Header, Mascot, Thẻ thử thách, Modal nhãn dán
│   └── games.css         # Đấu trường tương tác, khung 10 ô, tia số, đồng hồ
└── js/
    ├── audio.js          # Bộ tổng hợp âm thanh Web Audio API & Giọng đọc Tiếng Việt
    ├── state.js          # Quản lý sao, nhãn dán mở khóa và lưu trữ LocalStorage
    ├── mascot.js         # Bạn đồng hành Cú Vàng Pip (lời thoại, phản ứng)
    ├── rewards.js        # Hiệu ứng pháo hoa hạt Canvas & Bộ sưu tập nhãn dán
    ├── app.js            # Điều hướng vòng chơi và điều phối ứng dụng
    └── games/
        ├── counting.js   # Module Đếm số & Khung 10 ô
        ├── addition.js   # Module Phép cộng & Tia số chú ếch
        ├── subtraction.js# Module Phép trừ bóng bay
        ├── bonds.js      # Module Sơ đồ tách - gộp số
        ├── compare.js    # Module Cá sấu so sánh số
        ├── shapes.js     # Module Hình học & Đoàn tàu quy luật
        └── clock.js      # Module Bé xem đồng hồ kim
```
