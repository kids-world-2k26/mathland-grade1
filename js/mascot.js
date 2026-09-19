import { store } from './state.js';
import { sounds } from './audio.js';

export const PRAISE_CATEGORIES = {
  // 1. Trả lời chính xác (25 câu)
  CORRECT: [
    "Chuẩn luôn {name} ơi! Bé chọn đúng rồi này! 🎯",
    "Đúng rồi nè {name}! Giỏi quá đi mất!",
    "Ồ, chính xác luôn! {name} làm tốt lắm nha!",
    "Đúng y chóc luôn {name} ơi! Cô thưởng cho một tràng pháo tay nha! 👏",
    "Chính xác rồi! {name} nhìn phát biết ngay luôn!",
    "Bé {name} làm đúng rồi nè, cẩn thận từng chút một luôn!",
    "Hay quá {name} ơi, đúng ngay đáp án rồi!",
    "Chuẩn không cần chỉnh luôn {name}! Giỏi ghê!",
    "Đúng rồi nè! {name} tinh mắt quá đi!",
    "Chính xác! Hôm nay {name} làm bài phong độ quá ta! ⭐",
    "Đúng boong luôn nè {name}! Bé tính toán siêu chuẩn!",
    "Quá chuẩn luôn {name} ơi, không lệch đi đâu được!",
    "Hay dữ ta! Đáp án hoàn toàn chính xác nha bé {name}!",
    "Trúng phóc rồi {name} ơi! Cô cộng cho bé một điểm mười!",
    "Đúng chuẩn bài luôn nè {name}! Cô rất khen bé nghen!",
    "Tuyệt cú mèo! {name} chọn chuẩn xác 100% luôn nè!",
    "Đúng rồi nè {name}, vừa làm xong là thấy ngay đáp án đúng!",
    "Chính xác từng li luôn {name} ơi! Bé cưng giỏi quá!",
    "Bé {name} tài năng ghê nha, câu này đúng ngon lành!",
    "Chuẩn xác luôn rồi! Bé {name} làm cô vui quá nè!",
    "Ồ zê! Đáp án của {name} chính xác không chê vào đâu được!",
    "Đúng rồi nghen {name}! Tinh tường dữ dội luôn hà!",
    "Giỏi ơi là giỏi! {name} làm câu này chuẩn khỏi bàn!",
    "Chính xác tuyệt đối luôn nè {name} yêu dấu ơi! 🌟",
    "Đúng tinh tươm luôn! Cứ giữ vững phong độ nha {name}!"
  ],

  // 2. Tư duy thông minh (20 câu)
  SMART_THINKING: [
    "Trời ơi, {name} nghĩ ra cách này hay thế! Cô thích nha!",
    "Bé {name} suy luận thông minh ghê chưa!",
    "Đầu óc {name} hôm nay nảy số nhanh dữ ta! 🧠",
    "Cách làm của {name} siêu sáng tạo luôn!",
    "Mắt {name} tinh ghê, phát hiện ra quy luật này luôn!",
    "A ha! {name} bắt đúng bản chất câu hỏi rồi nè!",
    "Cô thích cách {name} chịu khó suy nghĩ trước khi chọn nè!",
    "Ý tưởng này hay quá {name} ơi! Nhanh trí ghê!",
    "Thông minh quá ta! {name} gỡ được nút thắt câu này rồi!",
    "Nhỏ mà có võ nha! {name} nghĩ ra góc này đỉnh thật! 🚀",
    "Bé {name} quan sát tỉ mỉ ghê, nhận ra ngay chi tiết quan trọng!",
    "Tư duy logic của {name} hôm nay đỉnh chóp luôn đó!",
    "Bé {name} biết cách ghép nối các gợi ý lại với nhau, thông minh lắm!",
    "Trí thông minh tuyệt đỉnh! {name} làm cô bất ngờ luôn nè!",
    "Óc phán đoán của bé {name} chuẩn xác như một nhà toán học nhí!",
    "Hay xuất sắc {name} ơi! Bé nắm quy tắc toán học quá chắc tay!",
    "Cô chấm cho tư duy nhạy bén của bé {name} mười điểm tròn!",
    "Phát hiện tài tình quá {name} ơi! Nhìn ra đáp án trong chớp mắt!",
    "Tư duy sáng láng ghê chưa nè {name}! Cô tự hào về bé lắm!",
    "Đúng là bộ não thần đồng nhí! Bé {name} suy nghĩ sắc sảo quá!"
  ],

  // 3. Làm nhanh và chính xác (20 câu)
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
    "Siêu nhanh siêu chuẩn! Đúng là cao thủ {name}!",
    "Bé {name} lướt ngón tay thoăn thoắt luôn ta ơi!",
    "Tốc độ ánh sáng luôn nè {name}! Tính nhanh dữ dội!",
    "Chưa đầy ba giây mà {name} đã chốt đơn đáp án đúng rồi!",
    "Quá nhanh quá nguy hiểm luôn bé {name} ơi! ⚡",
    "Vừa ra đề là {name} bấm ngay đáp án chuẩn, nể bé ghê!",
    "Nhanh như một cơn lốc! Bé {name} làm bài cừ khôi thật sự!",
    "Tốc độ phi thường luôn {name}! Đúng bon không cần suy nghĩ lâu!",
    "Phản xạ thần tốc nha bé {name}! Đúng chuẩn tay đua toán học!",
    "Vèo cái xong bài! Bé {name} làm siêu cấp nhanh luôn!",
    "Nhanh gọn lẹ mà lại cực kỳ chuẩn xác, tuyệt vời bé {name} ơi!"
  ],

  // 4. Nỗ lực & động viên khi thử lại (20 câu)
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
    "Cố gắng tuyệt vời! Cô tin {name} thế nào cũng làm được!",
    "Không sao cả bé {name} ơi, bình tĩnh quan sát lại hình nhé!",
    "Sai một xíu là mẹ thành công thôi nè {name}, làm lại nha!",
    "Cô luôn ở đây đồng hành cùng bé {name}, thử thêm lần nữa nào!",
    "Hít một hơi thật sâu nào {name}, nhìn kỹ lại số nhé bé yêu!",
    "Bé {name} kiên trì lắm nè, cô tin bé sẽ tìm ra đáp án ngay thôi!",
    "Đừng nản lòng nghen {name}! Các nhà khoa học cũng từng thử nhiều lần mà!",
    "Tập trung thêm một xíu nữa nào {name}, sắp chạm tới đáp án rồi!",
    "Cô thương bé {name} chịu khó suy nghĩ từng bước một nè!",
    "Mỗi bước thử là một bước tiến bộ, cố lên nha bé {name}!",
    "Tự tin lên nào bé {name}! Thử lại phát ăn ngay nha!"
  ],

  // 5. Kiên trì sau khi thử lại đúng (20 câu)
  PERSISTENCE: [
    "Thấy chưa! Kiên trì chút là {name} làm được liền!",
    "Thử lại cái làm được luôn! {name} đỉnh quá! 🎉",
    "Không nản lòng là {name} thắng chắc rồi!",
    "Mày mò hồi lâu cũng ra rồi nè! Giỏi quá {name} ơi!",
    "Cô nể tinh thần quyết làm bằng được của {name} luôn đó!",
    "Sai xíu có sao đâu, quan trọng là {name} chịu làm lại nè!",
    "Càng kiên trì là {name} càng giỏi ra đó nha!",
    "Cuối cùng cũng hạ gục câu này rồi! Tự hào về {name} quá!",
    "Bền bỉ như vậy thì bài nào làm khó được {name} chứ!",
    "Chiến thắng ngọt ngào đã đến với bé {name} kiên trì rồi!",
    "Tuyệt vời! Bé {name} không bỏ cuộc và đã gặt hái kết quả đúng!",
    "Đấy, cứ kiên nhẫn là bài nào bé {name} cũng giải quyết ngon ơ!",
    "Cô khen ngợi tinh thần vượt khó của bé {name} nha! Xuất sắc!",
    "Tự mình tìm ra lỗi và sửa đúng, bé {name} quá bản lĩnh!",
    "Một tràng pháo tay cho sự kiên trì không lùi bước của bé {name}!",
    "Hạ gục bài toán khó bằng sự bền bỉ, bé {name} cừ khôi ghê!",
    "Khó khăn qua rồi, bé {name} đã chinh phục thành công câu này!",
    "Cảm giác vượt qua thử thách thật là đã đúng không bé {name} ơi!",
    "Đó chính là đức tính của nhà vô địch! Bé {name} giỏi lắm!",
    "Kiên nhẫn là chìa khóa vàng, và bé {name} đã mở khóa thành công!"
  ],

  // 6. Tiến bộ vượt bậc (20 câu)
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
    "Đà này là {name} sắp thành ngôi sao học tập rồi đó!",
    "Tay nghề làm toán của bé {name} lên một tầm cao mới rồi nè!",
    "Cô ngạc nhiên với bước nhảy vọt của bé {name} luôn đó nghen!",
    "Càng chơi bé {name} càng lanh lẹ và chuẩn xác hơn bội phần!",
    "Tiến bộ rõ rệt luôn nha {name}! Nhìn bé làm bài thích mắt ghê!",
    "Bé {name} đã chinh phục được nhiều kiến thức mới toanh rồi nè!",
    "Cứ chăm chỉ như thế này, bé {name} sẽ đứng đầu lớp cho mà xem!",
    "Những con số bây giờ đã trở thành bạn thân của bé {name} rồi!",
    "Hôm nay phong độ của bé {name} sáng rực rỡ luôn đó!",
    "Tiến bộ không ngừng nghỉ! Bé {name} làm cô nở mày nở mặt luôn!",
    "Quá đỗi tuyệt vời! Sự tiến bộ của bé {name} là món quà lớn nhất cho cô!"
  ],

  // 7. Củng cố tự tin (20 câu)
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
    "Quá tuyệt! {name} hoàn toàn có quyền tự hào về mình!",
    "Bé {name} thấy chưa, mình đâu có sợ bài toán nào đâu nè!",
    "Tự tin tỏa sáng đi bé {name}, con là một bạn nhỏ rất thông minh!",
    "Cứ mỉm cười tự tin và tiến lên nhé {name} yêu dấu!",
    "Cô luôn đứng sau cổ vũ cho bé {name} tự tin thể hiện tài năng!",
    "Hãy tự vỗ tay khen mình một cái thật kêu nào bé {name} ơi! 👏",
    "Bé {name} có đầy đủ phẩm chất của một tài năng toán học nhí!",
    "Không gì làm khó được bé {name} một khi bé đã vững tin!",
    "Tự tin là sức mạnh, và bé {name} đang nắm giữ sức mạnh đó!",
    "Bé {name} làm bài với phong thái đỉnh cao tự tin tuyệt đối!",
    "Tuyệt vời ông mặt trời! Bé {name} hãy luôn tự hào về chính mình nhé!"
  ],

  // 8. Thành tích xuất sắc (20 câu)
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
    "Đỉnh kịch trần luôn {name} ơi! Quá xịn!",
    "Điểm mười chói lọi dành riêng cho bé {name} yêu dấu! 🏆",
    "Màn thể hiện đẳng cấp số một luôn bé {name} ơi!",
    "Thành tích vàng rực rỡ! Bé {name} quả là ngôi sao sáng chói!",
    "Cô muốn trao ngay cúp vô địch cho bé {name} luôn rồi nè!",
    "Xuất sắc ngoài mong đợi! Bé {name} làm cô thán phục thật sự!",
    "Không có đối thủ luôn {name} ơi! Làm bài đỉnh của chóp!",
    "Trí tuệ tuyệt vời của bé {name} đã chinh phục trọn vẹn thử thách!",
    "Phong độ hoàng kim! Bé {name} đúng là niềm tự hào to bự!",
    "Chuỗi trả lời đúng quá ấn tượng! Hoan hô bé {name} xuất chúng!",
    "Điểm số tuyệt đối! Bé {name} tỏa sáng rực rỡ như mặt trời ban mai!"
  ],

  // 9. Vui vẻ, hân hoan (20 câu)
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
    "Ghi điểm đẹp mắt quá {name} ơi! 🏆",
    "Vui ơi là vui! Bé {name} làm đúng cô vui như mở cờ trong bụng!",
    "Nhạc tưng bừng ăn mừng cho bé {name} thông thái nào! 🎵",
    "Ôi chao sướng rơn người! Bé {name} giải toán thích mắt ghê!",
    "Đúng boong rồi! Bé {name} có muốn nhảy một điệu ăn mừng không nè? 💃",
    "Ting tong! Tài khoản ngôi sao của {name} lại tăng vèo vèo rồi!",
    "Thú vị quá ta! Học toán với bé {name} vui như đi công viên nước!",
    "Cười tươi như hoa nhé {name}! Bé làm chuẩn không trượt phát nào!",
    "Trúng tủ luôn rồi đúng không bé {name} cưng? Quá đã!",
    "Học toán vui ơi là vui cùng với bé {name} cừ khôi!",
    "Yê yê! Lại một ngôi sao lấp lánh bay thẳng vào túi bé {name}!"
  ],

  // 10. Khuyến khích tiếp tục (20 câu)
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
    "Thẳng tiến về đích thôi {name} ơi, câu tiếp theo đang chờ!",
    "Đang vào cầu rồi {name} ơi, mở cánh cửa bài tiếp theo nào!",
    "Hăng say tiến bước nhé bé {name}, đỉnh vinh quang đang đón chờ!",
    "Tiếp chiêu câu tiếp theo nào nhà vô địch nhí {name}!",
    "Bé {name} đang băng băng về đích, không gì cản nổi bước chân bé!",
    "Tuyệt cú mèo! Cùng cô khám phá điều bí mật ở câu tiếp theo nha {name}!",
    "Tay làm bài đang mượt mà, sẵn sàng đón nhận câu đố mới chưa bé {name}?",
    "Bé {name} tràn đầy năng lượng, xông pha vào bài kế tiếp nào!",
    "Càng đi sâu càng thú vị, bé {name} theo chân cô nhé!",
    "Vượt ải ngọt ngào, thẳng tiến tới màn tiếp theo thôi {name} ơi!",
    "Hành trình kỳ diệu vẫn còn tiếp diễn, bé {name} tiến lên nào! 🌈"
  ],

  // 11. Chuỗi đúng siêu phàm - SUPER_STREAK (12 câu mới)
  SUPER_STREAK: [
    "Không thể tin được! {name} đã trả lời đúng liên tiếp 5 câu rồi! Thần đồng toán học đây rồi! 🌟⚡",
    "Kỷ lục mới toanh! Bé {name} lập chuỗi đúng siêu phàm không một vết xước!",
    "Bé {name} bật chế độ vô song rồi! Đúng liên tù tì luôn ta ơi! 🔥",
    "Ôi trời đất ơi! {name} làm đúng liên tiếp đỉnh nóc kịch trần luôn rồi! 👑",
    "Chuỗi chiến thắng ngoạn mục của bé {name}! Đúng là tay đua bất bại!",
    "Siêu cấp vô địch! {name} quét sạch mọi câu hỏi với chuỗi đúng dài ngoằng!",
    "Cả bầu trời sao lấp lánh đang chúc mừng chuỗi đúng thần thánh của {name}!",
    "Mắt nhìn thấy, tay bấm trúng liên hoàn! Bé {name} quá dữ dằn luôn hà!",
    "Thần tốc và hoàn hảo! Chuỗi đúng của {name} xứng đáng ghi vào bảng vàng!",
    "Trời ơi bé {name} của cô ơi! Chuỗi đúng dài thế này thì ai làm lại bé nữa! 🥇",
    "Đẳng cấp thượng thừa! Bé {name} bắn phát nào trúng phát nấy liên tiếp!",
    "Chuỗi 5 câu đúng trọn vẹn! Pháo hoa bay rực rỡ tặng riêng cho bé {name} nè! 🎆"
  ],

  // 12. Sửa sai ngoạn mục - COMEBACK (10 câu mới)
  COMEBACK: [
    "Cú lội ngược dòng quá xuất sắc {name} ơi! Thử lại là đúng ngay bon! 🔄✨",
    "Đấy thấy chưa! Rút kinh nghiệm một cái là {name} làm chuẩn đét liền!",
    "Sửa sai ngoạn mục luôn bé {name}! Bản lĩnh của nhà vô địch là đây chứ đâu!",
    "Cô nể bé {name} ghê nha! Bình tĩnh quan sát lại là tìm ra chân tướng liền!",
    "Tuyệt vời quá {name} ơi! Càng khó khăn bé lại càng tỏa sáng mạnh mẽ!",
    "Vấp ngã đứng dậy đi tiếp và thành công! Bé {name} quá cừ khôi luôn!",
    "Chiến thắng này mới thực sự ngọt ngào nè {name}! Giỏi dữ dằn luôn nghen!",
    "Không chịu đầu hàng và cái kết ngọt lịm! Cô vỗ tay khen ngợi {name} nha! 👏",
    "Một pha xử lý cực kỳ khéo léo sau lần thử trước! Quá đỉnh {name} ơi!",
    "Vượt chướng ngại vật thành công mỹ mãn! Bé {name} ngày càng bản lĩnh rồi!"
  ],

  // Lời chào & Kết thúc vòng
  welcome: [
    "Chào bé {name} nha! Hôm nay cùng cô khám phá vương quốc toán học nghen!",
    "Bé {name} ơi, chọn một hòn đảo kỳ diệu để tụi mình cùng chơi nào!",
    "Cùng đếm số và rinh thật nhiều ngôi sao lấp lánh nha bé {name}!",
    "Chào mừng bé cưng {name} đến với vùng đất toán học diệu kỳ!",
    "Hôm nay cô trò mình sẽ thu thập thật nhiều nhãn dán xinh xắn nha {name}!"
  ],
  roundWin: [
    "Hoan hô! Bé {name} đã hoàn thành bài tập xuất sắc dữ luôn! Rinh 3 ngôi sao nghen! 🎆",
    "Chúc mừng {name} nha! Mở quà xem nhãn dán mới toanh nè! 🎁",
    "Tuyệt vời quá {name} ơi! Càng chơi bé càng thông minh xuất sắc! 🌸",
    "Màn trình diễn đỉnh cao của bé {name}! Pháo hoa nở rực rỡ chúc mừng bé yêu nè! 🏆"
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
          `Hôm nay bé ${name} làm bài rất là tuyệt vời đó nghen!`,
          `Bé ${name} thích nhãn dán nào nhất trong bộ sưu tập 12 nhãn dán nè?`
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

    // 1. Chuỗi đúng liên tiếp đạt từ 5 trở lên: Khen ngợi siêu phàm SUPER_STREAK
    if (context.streak >= 5) {
      return 'SUPER_STREAK';
    }

    // 2. Lội ngược dòng thành công sau khi đã sai câu trước hoặc attemptNumber > 1
    if (context.attemptNumber > 1) {
      return Math.random() < 0.65 ? 'COMEBACK' : 'PERSISTENCE';
    }

    // 3. Chuỗi đúng 4 câu liên tiếp: Thành tích xuất sắc EXCELLENT
    if (context.streak >= 4) {
      return 'EXCELLENT';
    }

    // 4. Phản xạ siêu nhanh (responseTime < 2800ms ở lần bấm đầu tiên)
    if (context.responseTimeMs && context.responseTimeMs < 2800) {
      return 'FAST';
    }

    // 5. Tư duy thông minh ở các chủ đề suy luận logic, hình học, tách gộp, lời văn, đấu trường, sắp xếp
    const logicZones = ['bonds', 'shapes', 'spatial', 'wordproblems', 'clock', 'arena', 'ordering', 'memory'];
    if (logicZones.includes(context.zoneId) && Math.random() < 0.6) {
      return 'SMART_THINKING';
    }

    // 6. Tiến bộ (streak 2 hoặc 3)
    if (context.streak === 2 || context.streak === 3) {
      if (Math.random() < 0.5) return 'PROGRESS';
    }

    // 7. Củng cố tự tin sau khi đắn đo suy nghĩ lâu (> 4500ms)
    if (context.responseTimeMs && context.responseTimeMs > 4500) {
      return 'CONFIDENCE';
    }

    // 8. Mặc định: Luân phiên giữa Trả lời chính xác và Niềm vui
    return Math.random() < 0.5 ? 'CORRECT' : 'FUN';
  }

  // Khen ngợi theo ngữ cảnh kết quả và hành vi
  sayPraise(context = {}, autoRead = true, onEndCallback = null) {
    const category = this.selectCategory(context);
    return this.sayRandom(category, autoRead, onEndCallback);
  }

  // Chuẩn hóa phát âm câu khen ngợi cho giọng cô giáo miền Nam
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

  // Chọn câu khen ngợi ngẫu nhiên trong danh mục, không lặp lại 20 câu gần nhất
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
    if (this.usedPraisesHistory.length > 20) {
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
