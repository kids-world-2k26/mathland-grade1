# 🌟 Vương Quốc Toán Lớp 1 (MathLand Adventure - Grade 1)

Ứng dụng web học Toán tương tác sinh động, vui nhộn bám sát 100% Chương trình SGK Toán Lớp 1 chuẩn ("Kết Nối Tri Thức Với Cuộc Sống" Tập 1 & Tập 2). Ứng dụng kết hợp phương pháp trực quan (khung 10 ô, tia số, khối hình học, đồng hồ, thước đo cm), hệ thống âm thanh tổng hợp (Web Audio API), **Giọng Nữ Miền Nam Việt Nam (Cô Hoài My)** đọc to, rõ, truyền cảm, cùng hiệu ứng pháo hoa, hoa bay rực rỡ và bộ sưu tập 12 nhãn dán phần thưởng hấp dẫn.

---

## ✨ Tính Năng Nổi Bật

1. **🎙️ Giọng Nữ Miền Nam Việt Nam (Cô Hoài My)**:
   - Giọng đọc nữ miền Nam tự nhiên, ngọt ngào, ấm áp, đọc to và đầy đủ.
   - Hơn 30+ câu khen ngợi biến hóa liên tục theo tên riêng của bé (ví dụ: *"Đúng rồi nè! Bé Teppy tính nhanh như chớp luôn ta ơi!"*, *"Hay dữ dằn luôn Teppy ơi! Điểm mười xuất sắc cho bé nha!"*).
   - Tự động chờ đọc hết câu trọn vẹn trước khi chuyển bài, không bao giờ bị ngắt quãng.

2. **🌸 Hiệu Ứng Pháo Hoa & Hoa Rực Rỡ**:
   - Khi bé hoàn thành bài tập, màn hình bùng nổ hiệu ứng pháo hoa Canvas đa sắc màu, hoa anh đào, hoa mai, hoa hướng dương bay lượn ngập tràn.

3. **📚 11 Đảo Thử Thách Bám Sát Chương Trình SGK**:
   - **⭐️ Đếm Số 0–10 & Khung 10 Ô**: Chạm đếm có tích xanh, khung 10 ô trực quan.
   - **➕ Thám Hiểm Phép Cộng**: Ếch nhảy trên tia số, phép cộng phạm vi 10.
   - **➖ Thử Thách Phép Trừ**: Bấm nổ bóng bay tính phép trừ.
   - **🧩 Sơ Đồ Tách - Gộp Số**: Mô hình Part-Part-Whole phát triển tư duy số học.
   - **🐊 Cá Sấu Háu Ăn**: Bạn cá sấu Allie ngoạm số lớn hơn (`>`, `<`, `=`).
   - **🔷 Hình Học & Quy Luật**: Hình vuông, tròn, tam giác, chữ nhật & đoàn tàu quy luật.
   - **📦 Khối Lập Phương & Vị Trí**: Phân biệt khối lập phương, khối hộp chữ nhật, vị trí Trên - Dưới, Trái - Phải (SGK Bài 14, 15).
   - **🍅 Các Số Đến 100 & Chục**: Khái niệm 1 chục = 10 quả cà chua, số 11–20, số tròn chục (SGK Bài 21, 22).
   - **📏 Đo Độ Dài & Xăng-ti-mét**: Dài hơn - ngắn hơn, thước đo cm chuẩn mực (SGK Bài 24, 26).
   - **⏰ Bé Xem Giờ Đúng & Giờ Rưỡi**: Xem đồng hồ kim mô phỏng giờ học tập và sinh hoạt (SGK Bài 28, 29).
   - **📖 Giải Toán Có Lời Văn**: Bài toán thực tế sinh động, minh họa sinh động.

4. **🦉 Bạn Đồng Hành & Phần Thưởng**:
   - Bạn Cú Vàng Pip trò chuyện, đọc to câu hỏi khi bấm vào chiếc loa.
   - Bảng vinh danh hồ sơ của bé, tích lũy sao và mở khóa 12 nhãn dán trong Album.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Trực Tiếp

### Cách 1: Chạy bằng máy chủ MathLand (Khuyên dùng - Có Giọng Nữ Miền Nam Hoài My)
```bash
# Mở terminal tại thư mục dự án và chạy:
python server.py 3000
```
Sau đó mở trình duyệt tại: **`http://localhost:3000`**

### Cách 2: Chạy bằng máy chủ tĩnh tiêu chuẩn
```bash
python -m http.server 3000
# hoặc
npx serve .
```

### Cách 3: Mở trực tiếp
Nhấp đúp chuột vào tệp `index.html` trong bất kỳ trình duyệt hiện đại nào (Edge, Chrome, Cốc Cốc, Firefox).

---

## 🛠 Cấu Trúc Mã Nguồn

```
├── index.html            # Giao diện chính ứng dụng
├── server.py             # Máy chủ tích hợp TTS Giọng Nữ Miền Nam (Hoài My)
├── audio/tts/            # Bộ nhớ đệm âm thanh giọng đọc tiếng Việt
├── css/
│   ├── main.css          # Giao diện tổng quan, bảng màu candy, font Fredoka/Quicksand
│   ├── components.css    # Header, profile, huy hiệu giọng đọc, modal nhãn dán
│   └── games.css         # Đấu trường trò chơi, khung 10 ô, tia số, đồng hồ, thước đo
└── js/
    ├── audio.js          # Web Audio synthesizer & Giọng Nữ Miền Nam Hoài My
    ├── state.js          # Lưu trữ sao, hồ sơ bé, bộ sưu tập nhãn dán LocalStorage
    ├── mascot.js         # Cú Vàng Pip & 30+ câu khen ngợi ngọt ngào miền Nam
    ├── rewards.js        # Hiệu ứng pháo hoa Canvas & bão hoa mừng chiến thắng
    ├── app.js            # Điều phối 11 đảo nhiệm vụ & tiến trình vòng chơi
    └── games/
        ├── counting.js   # Đếm số 0–10 & Khung 10 ô
        ├── addition.js   # Phép cộng & Tia số
        ├── subtraction.js# Phép trừ nổ bóng bay
        ├── bonds.js      # Sơ đồ tách - gộp số
        ├── compare.js    # Cá sấu so sánh
        ├── shapes.js     # Hình học & Đoàn tàu quy luật
        ├── spatial.js    # Khối lập phương & Vị trí không gian
        ├── tens.js       # Chục và các số đến 100
        ├── measurement.js# Đo độ dài & Xăng-ti-mét (cm)
        ├── clock.js      # Đồng hồ xem giờ đúng & giờ rưỡi
        └── wordproblems.js# Giải toán có lời văn
```
