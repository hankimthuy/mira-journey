// Gentle cartomancy readings for the playing-card deck. Each suit colours a
// part of life (Cơ: heart and relationships, Rô: work and money, Chuồn:
// action and learning, Bích: challenges and lessons); each rank a stage.
// Traditionally "dark" cards (Át Bích, 9 Bích…) are written as lessons, not omens.

import type { PlayingSuit } from "@/lib/playingCards";

export type PlayingReading = {
  keywords: string;
  message: string;
  reflect: string;
};

type Row = [keywords: string, message: string, reflect: string];

export const SUIT_THEME: Record<PlayingSuit, { theme: string; element: string }> = {
  hearts: { theme: "cảm xúc và các mối quan hệ", element: "Cơ" },
  diamonds: { theme: "công việc, tiền bạc và những điều thực tế", element: "Rô" },
  clubs: { theme: "hành động, ý tưởng và việc học", element: "Chuồn" },
  spades: { theme: "thử thách và những bài học", element: "Bích" },
};

// A, 2 … 10, J, Q, K
const ROWS: Record<PlayingSuit, Row[]> = {
  hearts: [
    ["khởi đầu của yêu thương", "Một cảm xúc mới đang nảy mầm, có thể là một người, một niềm vui, hay sự dịu dàng với chính mình.", "Mình đang muốn mở lòng với điều gì?"],
    ["kết nối, đồng điệu", "Một mối quan hệ đang có sự hiểu nhau. Hãy vun đắp nó bằng sự chân thành.", "Ai là người mình thấy dễ chịu khi ở cạnh?"],
    ["niềm vui chia sẻ", "Những khoảnh khắc vui cùng bạn bè hoặc gia đình. Hãy để mình tận hưởng.", "Lần gần nhất mình cười thật to là khi nào?"],
    ["ổn định, bình yên", "Cảm xúc đang ở trạng thái vững vàng. Một chút bình yên đáng để trân trọng.", "Điều gì giúp mình thấy an lòng?"],
    ["xao động, thay đổi", "Có chút xáo trộn trong cảm xúc. Đó là dấu hiệu mình đang lớn lên, không phải điều xấu.", "Cảm xúc nào đang muốn được mình để ý?"],
    ["kỷ niệm, lòng tốt", "Một ký ức ấm áp hoặc một cử chỉ tử tế đang tới. Hãy đón nhận nó.", "Ai đã từng tử tế với mình mà mình muốn cảm ơn?"],
    ["mơ mộng, lựa chọn", "Nhiều cảm xúc và mong muốn cùng lúc. Hãy nhẹ nhàng phân biệt điều mình thật sự cần.", "Điều nào trong lòng mình là thật nhất?"],
    ["được quan tâm", "Bạn có thể đang được nhiều người để ý và yêu quý hơn bạn nghĩ.", "Mình có đang cho phép người khác quan tâm mình không?"],
    ["điều ước", "Lá được gọi là lá điều ước. Một mong muốn của bạn đang có cơ hội thành hình.", "Nếu được ước một điều cho trái tim mình, đó là gì?"],
    ["trọn vẹn, hạnh phúc", "Một cảm giác đủ đầy trong các mối quan hệ. Hãy ghi nhận và trân trọng.", "Mình biết ơn ai nhất lúc này?"],
    ["tin vui, người trẻ", "Một tin nhắn hay một người mang năng lượng trong trẻo đang tới gần.", "Mình mong nhận tin từ ai?"],
    ["người dịu dàng", "Một người giàu cảm xúc, biết lắng nghe, có thể là bạn hoặc ai đó quanh bạn.", "Mình có thể dịu dàng với ai hôm nay, kể cả bản thân?"],
    ["người bao dung", "Một người rộng lượng, chín chắn về cảm xúc. Lá mời bạn bước vào vai trò đó.", "Nếu bao dung hơn một chút, mình sẽ nhìn chuyện này thế nào?"],
  ],
  diamonds: [
    ["cơ hội mới", "Một cơ hội về công việc hoặc tài chính đang mở ra. Hãy để ý những lời mời.", "Cơ hội nào mình muốn nắm lấy?"],
    ["trao đổi, hợp tác", "Một thoả thuận hay một cuộc trao đổi nhỏ. Rõ ràng từ đầu sẽ giúp mọi việc trơn tru.", "Mình cần nói rõ điều gì với người cùng làm?"],
    ["tiến bộ, tay nghề", "Công sức của bạn đang được thể hiện qua kết quả. Tiếp tục nhé.", "Mình đã tiến bộ ở điểm nào gần đây?"],
    ["giữ gìn, tích luỹ", "Lúc thích hợp để tiết kiệm và sắp xếp lại tài chính.", "Mình muốn dành dụm cho điều gì?"],
    ["điều chỉnh", "Có thể cần thay đổi một chút cách làm hoặc cách tiêu. Không sao, điều chỉnh là bình thường.", "Việc gì mình nên làm khác đi một chút?"],
    ["cho và nhận", "Sự trao đổi công bằng. Giúp người và nhận giúp đỡ đều đáng quý.", "Mình có thể giúp ai một việc nhỏ?"],
    ["kiên nhẫn", "Kết quả đang tới nhưng cần thêm thời gian. Đừng nhổ cây lên xem rễ.", "Điều gì mình cần kiên nhẫn thêm?"],
    ["học nghề, chăm chỉ", "Một giai đoạn tốt để luyện kỹ năng, từng chút một.", "Kỹ năng nào mình muốn giỏi hơn?"],
    ["tự chủ", "Bạn đang dần vững vàng hơn với sức mình. Hãy tự hào.", "Điều gì mình đã tự làm được?"],
    ["vững vàng, dư dả", "Nền tảng tài chính hoặc công việc đang ổn định. Tận hưởng nó.", "Mình muốn dùng sự dư dả này cho điều gì ý nghĩa?"],
    ["tin công việc", "Một tin tức hoặc một người trẻ mang đến cơ hội thực tế.", "Mình đang chờ đợi tin gì?"],
    ["người khéo léo", "Một người thực tế, tháo vát, biết lo toan. Có thể là bạn đấy.", "Mình có thể sắp xếp việc gì gọn gàng hơn?"],
    ["người có kinh nghiệm", "Một người vững vàng về công việc và tiền bạc, có thể cho bạn lời khuyên tốt.", "Mình muốn hỏi ý kiến ai?"],
  ],
  clubs: [
    ["ý tưởng mới", "Một ý tưởng hoặc dự định mới đang loé lên. Hãy ghi lại và bắt đầu.", "Ý tưởng nào đang làm mình háo hức?"],
    ["bàn bạc, lựa chọn", "Có hai hướng để đi. Trao đổi với ai đó sẽ giúp bạn rõ hơn.", "Mình nên hỏi ý kiến ai?"],
    ["mở rộng", "Kế hoạch đang có tiến triển. Hãy nghĩ xa hơn một chút.", "Bước tiếp theo của kế hoạch là gì?"],
    ["nền móng", "Một nền tảng tốt đang được xây. Giữ nhịp đều đặn.", "Mình đang xây điều gì từng ngày?"],
    ["va chạm ý kiến", "Có những góc nhìn khác nhau. Lắng nghe sẽ giúp tìm ra cách tốt hơn.", "Mình có thể học gì từ người không đồng ý với mình?"],
    ["tiến lên", "Bạn đang đi đúng hướng và được ghi nhận.", "Mình muốn tự khen mình điều gì?"],
    ["kiên định", "Giữ vững điều mình tin, dù có chút cản trở.", "Điều gì đáng để mình kiên trì?"],
    ["nhanh chóng", "Mọi thứ đang chuyển động nhanh. Sẵn sàng đón nhận những điều mới.", "Mình cần chuẩn bị gì cho nhịp nhanh này?"],
    ["bền bỉ", "Bạn đã đi một đoạn dài. Nghỉ một chút rồi đi tiếp.", "Mình cần gì để giữ sức?"],
    ["gánh vác", "Có thể bạn đang ôm nhiều việc. Chia bớt sẽ giúp bạn đi xa hơn.", "Việc nào mình có thể nhờ người khác?"],
    ["tò mò, học hỏi", "Một năng lượng trẻ trung muốn khám phá. Hãy học một điều mới.", "Mình muốn học điều gì?"],
    ["người truyền cảm hứng", "Một người nhiệt huyết, dễ tạo động lực cho người khác.", "Ai đang truyền cảm hứng cho mình?"],
    ["người dẫn dắt", "Một người có tầm nhìn và biết cách dẫn đường. Bạn cũng có phẩm chất đó.", "Nếu dẫn dắt chính mình, mình sẽ đi hướng nào?"],
  ],
  spades: [
    ["một chương mới, sự rõ ràng", "Lá này thường bị gọi là lá xấu, nhưng thật ra nó nói về một sự cắt đứt rõ ràng để bắt đầu lại. Có điều gì cần khép lại để mở ra?", "Điều gì mình đã sẵn sàng để khép lại?"],
    ["lưỡng lự", "Đang phân vân giữa hai điều. Không vội, nhưng đừng né tránh mãi.", "Mình sợ điều gì nếu chọn một bên?"],
    ["nỗi buồn cần được thấy", "Có một nỗi buồn cần được thừa nhận. Thừa nhận nó là bước đầu để nhẹ lòng.", "Mình có đang cho phép mình buồn không?"],
    ["nghỉ ngơi", "Một lời nhắc nghỉ ngơi. Tâm trí và cơ thể cần được hồi phục.", "Hôm nay mình có thể nghỉ bằng cách nào?"],
    ["buông bỏ tranh cãi", "Có những chuyện không cần phải thắng. Buông bỏ có thể nhẹ lòng hơn.", "Chuyện gì mình có thể thôi tranh luận?"],
    ["chuyển tiếp", "Bạn đang rời xa một giai đoạn khó khăn. Mọi thứ đang dần yên lại.", "Mình đang để lại điều gì phía sau?"],
    ["cẩn trọng", "Hãy cẩn thận với lời nói và các thoả thuận. Rõ ràng sẽ bảo vệ bạn.", "Có điều gì mình cần hỏi rõ hơn?"],
    ["tự gỡ rối", "Cảm giác bị mắc kẹt có thể đến từ suy nghĩ. Lối ra gần hơn bạn nghĩ.", "Niềm tin nào đang giới hạn mình?"],
    ["lo âu, cần được xoa dịu", "Lá này nói về những đêm nghĩ nhiều. Nỗi lo là thật, nhưng nó thường lớn hơn thực tế.", "Nếu kể nỗi lo này cho một người bạn, họ sẽ nói gì?"],
    ["khép lại, bắt đầu lại", "Một điều gì đó đã kết thúc. Từ đây, mọi thứ chỉ có thể đi lên.", "Mình có thể xây lại điều gì từ đây?"],
    ["cảnh giác, tò mò", "Một năng lượng quan sát, muốn hiểu rõ mọi thứ. Hãy đặt câu hỏi.", "Mình muốn hiểu rõ hơn về điều gì?"],
    ["người thẳng thắn", "Một người độc lập, nói thật. Sự thẳng thắn đi kèm tử tế sẽ rất quý.", "Mình cần nói thật điều gì một cách tử tế?"],
    ["người công tâm", "Một người lý trí, công bằng. Hãy nhìn vấn đề một cách khách quan.", "Nếu nhìn khách quan, mình nên làm gì?"],
  ],
};

const RANK_ORDER = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const JOKER: Record<string, PlayingReading> = {
  "joker-red": {
    keywords: "bất ngờ vui, tự do",
    message: "Một điều không nằm trong kế hoạch, theo hướng dễ chịu. Hãy để mình linh hoạt và vui tươi một chút.",
    reflect: "Nếu không cần kế hoạch, mình sẽ làm gì cho vui?",
  },
  "joker-black": {
    keywords: "bất ngờ, phá khuôn",
    message: "Một điều khác thường có thể xảy ra. Nó không tốt hay xấu, chỉ là mời bạn thoát khỏi khuôn cũ.",
    reflect: "Khuôn mẫu nào của mình đã đến lúc đổi?",
  },
};

export function playingReading(id: string, rank: string, suit: PlayingSuit | null): PlayingReading {
  if (!suit) return JOKER[id];
  const [keywords, message, reflect] = ROWS[suit][RANK_ORDER.indexOf(rank)];
  return { keywords, message, reflect };
}
