// The "read more" layer for each tarot card: a gentle two-sentence reading,
// a question to sit with, and how to read the card reversed. Written as an
// invitation to reflect, never a verdict — heavy cards (Death, the Tower,
// the painful Swords) are framed around what they help release or rebuild.
// Reversed is read as the same energy turned inward or blocked, not as bad luck.

export type TarotReading = {
  message: string;
  reflect: string;
  blocked: string;
};

export const TAROT_READINGS: Record<string, TarotReading> = {
  // ---------- Major Arcana ----------
  "major-0": {
    message: "Có một cánh cửa mới đang mở, và bạn không cần biết hết mọi thứ mới được bước qua. Sự nhẹ nhõm của người mới bắt đầu cũng là một món quà.",
    reflect: "Nếu không sợ sai, bạn sẽ thử điều gì trước tiên?",
    blocked: "Có thể bạn đang muốn nhảy nhưng chân còn ngập ngừng, hoặc đang nhảy mà chưa nhìn đường. Chậm một nhịp để chuẩn bị cũng là một cách can đảm.",
  },
  "major-1": {
    message: "Bạn đang có trong tay nhiều hơn bạn nghĩ: kỹ năng, ý tưởng, người giúp. Lá này mời bạn gom chúng lại và bắt tay làm một việc cụ thể.",
    reflect: "Mình đã có sẵn những gì để bắt đầu ngay hôm nay?",
    blocked: "Năng lượng có thể đang bị chia năm xẻ bảy cho quá nhiều hướng. Chọn một việc thôi, làm cho tới.",
  },
  "major-2": {
    message: "Câu trả lời có thể không nằm ngoài kia mà ở trong sự tĩnh lặng của bạn. Đây là lúc lắng nghe nhiều hơn nói.",
    reflect: "Nếu tắt hết tiếng ồn xung quanh, trực giác của mình đang thì thầm điều gì?",
    blocked: "Có lẽ bạn đang ồn ào quá nên không nghe được chính mình. Một chút yên lặng sẽ giúp.",
  },
  "major-3": {
    message: "Lá bài của sự nuôi dưỡng: điều gì được chăm bằng sự dịu dàng sẽ lớn lên. Đừng quên, chính bạn cũng cần được chăm như vậy.",
    reflect: "Hôm nay mình có thể tự chăm sóc bản thân bằng một việc nhỏ nào?",
    blocked: "Bạn có thể đang cho đi nhiều mà quên nạp lại. Hãy để mình được nghỉ và được nhận.",
  },
  "major-4": {
    message: "Một chút cấu trúc sẽ giúp mọi thứ vững hơn. Đặt ra khung, ranh giới, lịch trình không làm bạn cứng nhắc, nó giúp bạn tự do hơn.",
    reflect: "Một quy tắc nhỏ nào sẽ giúp cuộc sống mình gọn gàng hơn?",
    blocked: "Có thể bạn đang siết quá chặt, hoặc ngược lại, đang thiếu một điểm tựa. Tìm mức vừa đủ cho mình.",
  },
  "major-5": {
    message: "Có những bài học đi trước để lại, và việc học từ người đi trước không làm bạn kém độc lập. Hãy tìm người hoặc truyền thống giúp mình hiểu sâu hơn.",
    reflect: "Ai hoặc điều gì mình có thể học hỏi lúc này?",
    blocked: "Có lẽ bạn đang cần đi con đường riêng, khác với khuôn mẫu. Điều đó cũng hoàn toàn ổn.",
  },
  "major-6": {
    message: "Lá này nói về sự kết nối và những lựa chọn xuất phát từ giá trị thật của bạn. Không chỉ là tình yêu, mà là việc chọn điều khiến bạn thấy đúng là mình.",
    reflect: "Lựa chọn nào đang thật sự khớp với con người mình?",
    blocked: "Có thể có một chút lệch nhịp giữa điều bạn muốn và điều bạn đang chọn. Nhìn lại giá trị của mình trước khi quyết.",
  },
  "major-7": {
    message: "Bạn có đủ sức để tiến lên, miễn là biết mình đang hướng về đâu. Tập trung và giữ tay lái, mọi thứ sẽ dần theo.",
    reflect: "Điểm đến mình thật sự muốn là gì?",
    blocked: "Có lẽ bạn đang bị kéo về nhiều phía. Dừng lại chọn hướng trước, rồi mới tăng tốc.",
  },
  "major-8": {
    message: "Sức mạnh ở đây không phải là cứng rắn mà là sự kiên nhẫn dịu dàng. Bạn có thể đối diện điều khó mà vẫn tử tế với chính mình.",
    reflect: "Mình có thể dịu dàng với nỗi sợ của mình thế nào?",
    blocked: "Bạn có thể đang nghi ngờ bản thân nhiều hơn mức cần thiết. Sức mạnh vẫn ở đó, chỉ cần một chút tin.",
  },
  "major-9": {
    message: "Một khoảng lùi để suy ngẫm có thể mang lại nhiều sáng tỏ hơn là cố tìm câu trả lời bên ngoài. Ở một mình không có nghĩa là cô đơn.",
    reflect: "Mình cần dành chút thời gian riêng để hiểu điều gì?",
    blocked: "Có lẽ bạn đã thu mình hơi lâu. Một cuộc trò chuyện với người tin cậy có thể soi thêm đường.",
  },
  "major-10": {
    message: "Mọi thứ đều có chu kỳ, và bánh xe đang chuyển. Điều đang diễn ra không cố định mãi, hãy để mình linh hoạt theo nhịp.",
    reflect: "Mình đang ở pha nào của một vòng lặp quen thuộc?",
    blocked: "Có thể bạn đang cố giữ mọi thứ đứng yên. Đôi khi buông tay lái một chút lại dễ đi hơn.",
  },
  "major-11": {
    message: "Lá này mời bạn nhìn mọi việc một cách công bằng, kể cả với chính mình. Sự thật có thể không dễ nghe, nhưng nó giúp bạn đứng vững.",
    reflect: "Nếu nhìn thật công bằng, phần trách nhiệm của mình ở đây là gì, và phần nào không phải của mình?",
    blocked: "Có thể bạn đang quá khắt khe với mình, hoặc đang tránh một sự thật. Hãy hỏi lại: điều gì là đúng và đủ?",
  },
  "major-12": {
    message: "Đôi khi dừng lại và nhìn từ một góc khác lại mở ra lối đi. Việc tạm chờ không phải là thua, mà là để thấy rõ hơn.",
    reflect: "Nếu lật ngược góc nhìn, chuyện này trông ra sao?",
    blocked: "Có lẽ bạn đã chờ đủ lâu rồi. Có thể đến lúc bước tiếp, dù chưa chắc chắn hoàn toàn.",
  },
  "major-13": {
    message: "Lá này hiếm khi nói về cái chết thật. Nó nói về một giai đoạn khép lại để chỗ trống cho điều mới lớn lên, như lá rụng để cây ra chồi.",
    reflect: "Điều gì mình đã sẵn sàng để nó kết thúc nhẹ nhàng?",
    blocked: "Có thể bạn đang níu một điều đã hết vai trò. Buông ra từ từ cũng được, không cần vội.",
  },
  "major-14": {
    message: "Sự cân bằng không đến từ cực đoan mà từ việc pha trộn vừa đủ. Chậm lại một chút, mọi thứ sẽ tự tìm nhịp.",
    reflect: "Mình đang thừa và thiếu điều gì trong nhịp sống hiện tại?",
    blocked: "Có lẽ nhịp đang bị lệch về một phía. Một điều chỉnh nhỏ sẽ đủ, không cần đảo lộn.",
  },
  "major-15": {
    message: "Lá này chỉ ra những thói quen hay ràng buộc mà bạn có thể đã quen đến mức không nhận ra. Nhận ra là bước đầu tiên để tự do.",
    reflect: "Điều gì đang giữ chân mình, và thật ra mình có chìa khoá không?",
    blocked: "Bạn đang dần tháo gỡ một ràng buộc cũ. Hãy ghi nhận chính mình vì điều đó.",
  },
  "major-16": {
    message: "Có những thứ sụp xuống vì nó vốn không vững. Dù bất ngờ, sự đổ vỡ này mở ra chỗ để bạn xây lại trên nền thật hơn.",
    reflect: "Điều gì trong mình đã biết từ lâu là cần thay đổi?",
    blocked: "Có thể bạn đang né một thay đổi mà trong lòng đã thấy trước. Đối diện sớm thường nhẹ hơn là chờ nó tự đến.",
  },
  "major-17": {
    message: "Sau những ngày mệt mỏi, lá bài mang đến hy vọng và sự chữa lành. Bạn được phép tin rằng mọi thứ sẽ ổn dần.",
    reflect: "Điều gì đang cho mình chút hy vọng, dù nhỏ?",
    blocked: "Có thể niềm tin của bạn đang hơi cạn. Hãy bắt đầu từ một điều nhỏ khiến bạn thấy dễ chịu.",
  },
  "major-18": {
    message: "Không phải mọi thứ đều rõ ràng ngay, và điều đó không sao. Cảm xúc và giấc mơ có thể đang nói với bạn điều mà lý trí chưa nắm được.",
    reflect: "Nỗi lo nào của mình là thật, và nỗi lo nào chỉ là bóng?",
    blocked: "Sương mù đang tan dần. Điều từng mơ hồ sắp trở nên dễ hiểu hơn.",
  },
  "major-19": {
    message: "Một lá bài ấm áp: niềm vui, sự rõ ràng, được là chính mình. Hãy cho phép mình tận hưởng những điều tốt đẹp đang có.",
    reflect: "Điều gì làm mình thấy vui một cách giản dị?",
    blocked: "Niềm vui vẫn ở đó, chỉ bị mây che một chút. Nhìn lại những điều nhỏ đang ổn.",
  },
  "major-20": {
    message: "Có một tiếng gọi bên trong đang rõ dần, mời bạn nhìn lại và bước sang giai đoạn mới. Bạn không cần hoàn hảo để trả lời nó.",
    reflect: "Mình đang được gọi để trở thành phiên bản nào của mình?",
    blocked: "Có thể bạn đang tự phán xét quá nặng. Hãy nhìn lại với sự bao dung như với một người bạn.",
  },
  "major-21": {
    message: "Một vòng đang khép lại trọn vẹn. Hãy dành chút thời gian ghi nhận những gì bạn đã đi qua trước khi bắt đầu hành trình mới.",
    reflect: "Mình tự hào về điều gì trong chặng đường vừa qua?",
    blocked: "Có lẽ còn một bước nhỏ nữa để khép lại. Đừng vội, cứ hoàn tất nó.",
  },

  // ---------- Wands (Lửa: đam mê, hành động, sáng tạo) ----------
  "wands-1": {
    message: "Một tia cảm hứng mới đang loé lên. Đây là lúc tốt để bắt đầu một ý tưởng khiến bạn hào hứng.",
    reflect: "Ý tưởng nào làm mình thấy tim đập nhanh hơn?",
    blocked: "Tia lửa vẫn có, chỉ là chưa đúng lúc bùng lên. Cứ ghi lại ý tưởng và giữ ấm nó.",
  },
  "wands-2": {
    message: "Bạn đang đứng trước nhiều khả năng và cần lên kế hoạch cho bước tiếp theo. Nhìn xa một chút sẽ giúp bạn chọn đúng hướng.",
    reflect: "Một năm nữa, mình muốn đang ở đâu?",
    blocked: "Có thể bạn ngại bước ra khỏi vùng quen thuộc. Một bước nhỏ cũng đủ để bắt đầu.",
  },
  "wands-3": {
    message: "Những gì bạn gieo đang bắt đầu có kết quả, và chân trời đang mở rộng. Hãy kiên nhẫn chờ thuyền về.",
    reflect: "Mình đang chờ đợi điều gì, và có thể chuẩn bị gì trong lúc chờ?",
    blocked: "Có thể có chậm trễ, nhưng không có nghĩa là thất bại. Điều chỉnh kế hoạch một chút là đủ.",
  },
  "wands-4": {
    message: "Một lá của niềm vui và cột mốc. Hãy ăn mừng những gì đã đạt được, cùng những người thân yêu.",
    reflect: "Mình muốn ăn mừng điều gì, với ai?",
    blocked: "Nơi mình thuộc về có thể đang hơi chông chênh. Hãy tìm lại cảm giác an toàn từ những người gần gũi.",
  },
  "wands-5": {
    message: "Có những ý kiến va chạm nhau, nhưng đó cũng là cách mọi thứ được mài giũa. Xem đây là trao đổi hơn là chiến đấu.",
    reflect: "Nếu lắng nghe người kia thật sự, mình sẽ học được gì?",
    blocked: "Căng thẳng đang dịu dần. Có thể đã đến lúc tìm tiếng nói chung.",
  },
  "wands-6": {
    message: "Nỗ lực của bạn đang được nhìn thấy. Hãy nhận lời khen một cách thoải mái, bạn xứng đáng với nó.",
    reflect: "Mình đã làm tốt điều gì mà chưa tự ghi nhận?",
    blocked: "Có thể bạn đang chờ người khác công nhận. Hãy tự ghi nhận mình trước.",
  },
  "wands-7": {
    message: "Bạn có quyền giữ vững điều mình tin. Đứng vững không có nghĩa là phải gồng, chỉ cần rõ ràng.",
    reflect: "Điều gì đáng để mình giữ vững, và điều gì có thể thả ra?",
    blocked: "Có thể bạn đang mệt vì phải phòng thủ quá lâu. Được nghỉ cũng là một lựa chọn.",
  },
  "wands-8": {
    message: "Mọi thứ đang chuyển động nhanh, tin tức và cơ hội có thể đến dồn dập. Hãy sẵn sàng đón nhận.",
    reflect: "Mình cần chuẩn bị gì để bắt kịp nhịp này?",
    blocked: "Có thể mọi thứ đang chậm lại hoặc đang vội quá. Tìm nhịp của riêng mình.",
  },
  "wands-9": {
    message: "Bạn đã đi một chặng dài và đang gần tới đích. Mệt là thật, nhưng sức bền của bạn cũng là thật.",
    reflect: "Mình cần gì để đi nốt quãng cuối?",
    blocked: "Có lẽ bạn đang kiệt sức. Được phép dừng lại nghỉ trước khi đi tiếp.",
  },
  "wands-10": {
    message: "Bạn đang mang nhiều hơn mức cần thiết. Lá này không trách, chỉ nhắc rằng bạn có thể đặt bớt xuống.",
    reflect: "Việc nào mình có thể nhờ người khác, hoặc bỏ bớt?",
    blocked: "Bạn đang bắt đầu buông bớt gánh nặng. Hãy tiếp tục, nhẹ đi là tốt.",
  },
  "wands-11": {
    message: "Một năng lượng tò mò, háo hức muốn khám phá. Hãy thử điều mới như một người học trò vui vẻ.",
    reflect: "Mình tò mò muốn thử điều gì?",
    blocked: "Có thể nhiều ý tưởng nhưng chưa biết bắt đầu từ đâu. Chọn một cái nhỏ nhất.",
  },
  "wands-12": {
    message: "Năng lượng hành động mạnh mẽ, sẵn sàng lên đường. Sự nhiệt huyết này có thể đưa bạn đi xa.",
    reflect: "Mình đang muốn lao về phía nào?",
    blocked: "Có thể bạn đang vội quá. Một chút kế hoạch sẽ giúp nhiệt huyết không bị cháy hết.",
  },
  "wands-13": {
    message: "Sự tự tin ấm áp, cuốn hút. Bạn có thể truyền cảm hứng cho người khác chỉ bằng việc là chính mình.",
    reflect: "Điều gì khiến mình thấy tự tin nhất?",
    blocked: "Có lẽ bạn đang so sánh mình với người khác. Ánh sáng của bạn không cần giống ai.",
  },
  "wands-14": {
    message: "Tầm nhìn rõ ràng và khả năng dẫn dắt bằng cảm hứng. Đây là lúc nghĩ lớn và hành động có định hướng.",
    reflect: "Tầm nhìn lớn nhất của mình lúc này là gì?",
    blocked: "Có thể kỳ vọng đang hơi cao, cho mình hoặc cho người khác. Nới ra một chút sẽ dễ thở hơn.",
  },

  // ---------- Cups (Nước: cảm xúc, các mối quan hệ) ----------
  "cups-1": {
    message: "Một khởi đầu mới về cảm xúc: tình yêu, tình bạn, hay lòng trắc ẩn với chính mình. Hãy mở lòng đón nhận.",
    reflect: "Mình muốn cho phép bản thân cảm nhận điều gì nhiều hơn?",
    blocked: "Cảm xúc có thể đang bị giữ lại bên trong. Viết ra hoặc kể với ai đó có thể giúp.",
  },
  "cups-2": {
    message: "Một kết nối đồng điệu, nơi hai bên cùng tôn trọng nhau. Có thể là một mối quan hệ, cũng có thể là sự hoà hợp với chính mình.",
    reflect: "Mối quan hệ nào đang nuôi dưỡng mình?",
    blocked: "Có thể đang có chút lệch nhịp trong một mối quan hệ. Một cuộc trò chuyện thật lòng có thể giúp.",
  },
  "cups-3": {
    message: "Niềm vui của tình bạn và sự sum vầy. Hãy dành thời gian cho những người khiến bạn cười.",
    reflect: "Mình muốn gặp ai gần đây?",
    blocked: "Có lẽ bạn đang cần thời gian riêng hơn là tụ tập. Cả hai đều ổn.",
  },
  "cups-4": {
    message: "Bạn có thể đang thấy hơi chán hoặc lơ đãng. Lá này mời bạn để ý những điều tốt đang được đưa tới mà mình chưa nhìn thấy.",
    reflect: "Có cơ hội nào mình đang bỏ qua không?",
    blocked: "Bạn đang dần mở mắt ra với những khả năng mới. Hãy đón nhận nó.",
  },
  "cups-5": {
    message: "Có một nỗi buồn hay tiếc nuối cần được thừa nhận. Nhưng hãy nhìn lại, vẫn còn những chiếc cốc đứng vững phía sau bạn.",
    reflect: "Mình vẫn còn những điều gì quý giá?",
    blocked: "Bạn đang dần chấp nhận và bước tiếp. Hãy nhẹ nhàng với mình trong quá trình này.",
  },
  "cups-6": {
    message: "Ký ức ngọt ngào và sự ngây thơ. Một kỷ niệm cũ có thể mang lại sự ấm áp hoặc một bài học cho hiện tại.",
    reflect: "Kỷ niệm nào đang gợi cho mình điều gì?",
    blocked: "Có thể bạn đang sống hơi nhiều trong quá khứ. Hiện tại cũng có những điều đáng yêu.",
  },
  "cups-7": {
    message: "Có nhiều lựa chọn và giấc mơ trước mắt. Mơ là tốt, nhưng hãy xem đâu là điều thật sự khả thi.",
    reflect: "Trong những điều mình mơ, điều nào mình sẵn sàng làm thật?",
    blocked: "Mọi thứ đang rõ ràng hơn. Bạn sắp biết mình thật sự muốn gì.",
  },
  "cups-8": {
    message: "Đôi khi phải rời đi để tìm điều có ý nghĩa hơn. Rời bỏ không có nghĩa là thất bại, mà là đi tìm điều đúng với mình.",
    reflect: "Điều gì mình đang muốn rời xa, và mình đang muốn tìm điều gì?",
    blocked: "Có thể bạn còn lưỡng lự giữa ở và đi. Không cần quyết ngay, hãy lắng nghe thêm.",
  },
  "cups-9": {
    message: "Lá của điều ước thành hiện thực và sự mãn nguyện. Hãy tận hưởng cảm giác đủ đầy.",
    reflect: "Mình đã có những gì mà ngày xưa từng mơ ước?",
    blocked: "Có thể bạn vẫn thấy thiếu dù đã có nhiều. Hãy tự hỏi điều thật sự làm mình thoả mãn.",
  },
  "cups-10": {
    message: "Sự hài hoà và hạnh phúc bên những người thân yêu. Một cảm giác được thuộc về.",
    reflect: "Mình cảm thấy được là chính mình nhất khi ở bên ai?",
    blocked: "Có thể có chút lệch nhịp trong gia đình hay nhóm bạn. Sự kiên nhẫn và lắng nghe sẽ giúp.",
  },
  "cups-11": {
    message: "Một tin vui nhỏ hoặc một cảm xúc mới mẻ. Hãy để mình tò mò và dịu dàng với cảm xúc.",
    reflect: "Cảm xúc nào mới đang nhen nhóm trong mình?",
    blocked: "Cảm xúc có thể đang hơi thất thường. Hãy cho mình thời gian để hiểu nó.",
  },
  "cups-12": {
    message: "Một lời mời lãng mạn, hoặc lời mời đi theo trái tim. Hãy để cảm xúc dẫn đường, nhưng đừng quên nhìn đường.",
    reflect: "Trái tim mình đang muốn đi đâu?",
    blocked: "Có thể bạn đang mơ mộng hơi nhiều. Cân bằng giữa lãng mạn và thực tế sẽ giúp.",
  },
  "cups-13": {
    message: "Sự thấu cảm và dịu dàng. Bạn có khả năng lắng nghe người khác sâu sắc, và cũng cần lắng nghe chính mình như vậy.",
    reflect: "Mình đang cần được lắng nghe về điều gì?",
    blocked: "Có lẽ bạn đang cạn năng lượng cảm xúc vì chăm lo cho người khác. Hãy lấp đầy lại mình.",
  },
  "cups-14": {
    message: "Cân bằng giữa cảm xúc và lý trí. Bạn có thể bình tĩnh trước sóng gió mà vẫn giữ được sự ấm áp.",
    reflect: "Mình giữ bình tĩnh như thế nào khi cảm xúc dâng cao?",
    blocked: "Có thể bạn đang kìm nén cảm xúc để tỏ ra ổn. Được phép không ổn một chút.",
  },

  // ---------- Swords (Khí: suy nghĩ, lời nói, sự thật) ----------
  "swords-1": {
    message: "Một sự sáng suốt mới đang đến. Bạn có thể nhìn rõ vấn đề và nói ra điều mình nghĩ.",
    reflect: "Điều gì mình đã hiểu ra gần đây?",
    blocked: "Suy nghĩ có thể đang hơi rối. Viết ra giấy sẽ giúp gỡ từng sợi một.",
  },
  "swords-2": {
    message: "Bạn đang đứng giữa hai lựa chọn và chưa muốn quyết. Đôi khi cần thêm thông tin, đôi khi cần can đảm mở mắt nhìn.",
    reflect: "Mình đang né tránh nhìn thẳng vào điều gì?",
    blocked: "Có thể có quá nhiều thông tin khiến bạn thấy ngợp. Hãy thu hẹp lại những gì quan trọng nhất.",
  },
  "swords-3": {
    message: "Có một nỗi đau cần được thừa nhận, và điều đó không làm bạn yếu đuối. Nhìn thẳng vào nó là bước đầu của chữa lành.",
    reflect: "Mình đang cần cho phép mình buồn về điều gì?",
    blocked: "Vết thương đang dần lành. Hãy tiếp tục chăm sóc bản thân nhẹ nhàng.",
  },
  "swords-4": {
    message: "Một lời mời nghỉ ngơi. Tâm trí cần được im lặng để hồi phục, không phải lúc nào cũng phải làm.",
    reflect: "Mình có thể cho phép bản thân nghỉ ngơi như thế nào hôm nay?",
    blocked: "Có thể bạn đang bồn chồn không nghỉ được. Hãy thử một việc nhỏ giúp tâm trí lắng xuống.",
  },
  "swords-5": {
    message: "Có những cuộc tranh luận mà thắng cũng không vui. Lá này mời bạn cân nhắc điều gì thật sự đáng để tranh giành.",
    reflect: "Mình muốn thắng, hay muốn được hiểu?",
    blocked: "Có cơ hội để hoà giải và bỏ qua. Buông bỏ có thể nhẹ hơn nhiều.",
  },
  "swords-6": {
    message: "Bạn đang rời xa sóng gió, đi về vùng nước yên hơn. Quá trình chuyển tiếp có thể chậm, nhưng bạn đang đi đúng hướng.",
    reflect: "Mình đang để lại điều gì phía sau?",
    blocked: "Có thể bạn vẫn mang theo hành lý cũ. Thử đặt xuống một thứ không cần nữa.",
  },
  "swords-7": {
    message: "Lá này nói về chiến lược và sự khéo léo, nhưng cũng nhắc về sự thẳng thắn. Hãy tự hỏi mình có đang minh bạch không.",
    reflect: "Có điều gì mình đang giữ kín mà nên nói ra?",
    blocked: "Sự thật có thể đang được đưa ra ánh sáng. Điều đó có thể nhẹ nhõm hơn bạn nghĩ.",
  },
  "swords-8": {
    message: "Cảm giác bị mắc kẹt đôi khi đến từ suy nghĩ hơn là từ hoàn cảnh. Nhìn kỹ lại, lối ra có thể gần hơn bạn tưởng.",
    reflect: "Niềm tin nào đang giới hạn mình?",
    blocked: "Bạn đang bắt đầu tự tháo gỡ. Hãy tiếp tục từng bước một.",
  },
  "swords-9": {
    message: "Lo âu có thể làm mọi thứ trông tệ hơn thực tế, nhất là vào ban đêm. Nỗi lo là thật, nhưng không phải nỗi lo nào cũng xảy ra.",
    reflect: "Nếu nói nỗi lo này ra với một người bạn, họ sẽ nói gì với mình?",
    blocked: "Bạn đang dần vượt qua nỗi sợ. Ánh sáng đang trở lại.",
  },
  "swords-10": {
    message: "Một điều gì đó đã chạm đáy và kết thúc. Nghe thì nặng, nhưng chạm đáy cũng có nghĩa là từ đây chỉ có thể đi lên.",
    reflect: "Điều gì mình có thể xây lại, từ những gì còn lại?",
    blocked: "Điều tệ nhất đã qua. Bạn đang hồi phục, dù chậm.",
  },
  "swords-11": {
    message: "Sự tò mò và ham học hỏi. Đặt câu hỏi và tìm hiểu mọi thứ sẽ mở ra nhiều hiểu biết mới.",
    reflect: "Mình muốn tìm hiểu thêm về điều gì?",
    blocked: "Có thể bạn đang nói nhiều mà làm ít. Chọn một điều để hành động.",
  },
  "swords-12": {
    message: "Năng lượng quyết liệt, muốn lao tới. Sự rõ ràng này mạnh mẽ, chỉ cần nhớ nhìn xem mình đang lao về đâu.",
    reflect: "Mình có đang vội vàng không, hay đây đúng là lúc?",
    blocked: "Có thể bạn đang hấp tấp. Dừng một chút để suy xét sẽ giúp tránh vấp.",
  },
  "swords-13": {
    message: "Sự thẳng thắn và độc lập, được rèn qua trải nghiệm. Bạn có thể nói thật mà vẫn tử tế.",
    reflect: "Mình cần nói thật điều gì, và nói thế nào cho tử tế?",
    blocked: "Có lẽ bạn đang hơi cứng rắn với mình hoặc người khác. Thêm chút mềm mại sẽ tốt hơn.",
  },
  "swords-14": {
    message: "Lý trí rõ ràng và sự công tâm. Đây là lúc tốt để quyết định dựa trên sự thật hơn là cảm xúc nhất thời.",
    reflect: "Nếu nhìn khách quan, mình nên làm gì?",
    blocked: "Có thể bạn đang dùng lý trí để né cảm xúc. Cả hai đều cần được lắng nghe.",
  },

  // ---------- Pentacles (Đất: tiền bạc, công việc, cơ thể) ----------
  "pentacles-1": {
    message: "Một cơ hội mới về công việc, tiền bạc hay sức khoẻ. Như một hạt giống, nó cần được gieo và chăm sóc.",
    reflect: "Hạt giống nào mình muốn gieo lúc này?",
    blocked: "Có thể một cơ hội vừa trôi qua. Đừng lo, sẽ còn những cơ hội khác.",
  },
  "pentacles-2": {
    message: "Bạn đang xoay xở nhiều việc cùng lúc. Sự linh hoạt là điểm mạnh, miễn là bạn biết điều gì cần ưu tiên.",
    reflect: "Việc nào quan trọng nhất trong tuần này?",
    blocked: "Có thể bạn đang ôm quá nhiều. Hãy bỏ bớt một quả bóng xuống.",
  },
  "pentacles-3": {
    message: "Sự hợp tác và tay nghề. Làm việc cùng người khác, mỗi người góp một phần, sẽ tạo ra điều tốt hơn.",
    reflect: "Ai có thể giúp mình làm việc này tốt hơn?",
    blocked: "Có thể nhóm đang lệch pha một chút. Nói rõ vai trò sẽ giúp.",
  },
  "pentacles-4": {
    message: "Sự an toàn và giữ gìn. Tiết kiệm là tốt, nhưng hãy chú ý đừng giữ chặt đến mức không còn chỗ cho điều mới.",
    reflect: "Mình đang giữ chặt điều gì vì sợ mất?",
    blocked: "Bạn có thể đang học cách nới lỏng. Cho đi một chút cũng là cách để nhận lại.",
  },
  "pentacles-5": {
    message: "Có thể bạn đang trải qua khó khăn hoặc thấy mình bị bỏ ngoài. Nhưng hãy nhìn quanh, sự giúp đỡ có thể ở gần hơn bạn nghĩ.",
    reflect: "Mình có thể nhờ ai giúp lúc này?",
    blocked: "Mọi thứ đang dần khá lên. Bạn đang tìm lại được chỗ đứng.",
  },
  "pentacles-6": {
    message: "Sự cho và nhận cân bằng. Hãy hào phóng khi có thể, và cũng cho phép mình nhận khi cần.",
    reflect: "Mình dễ cho hơn hay dễ nhận hơn?",
    blocked: "Có thể sự cho nhận đang không cân bằng. Hãy xem lại những điều kiện đi kèm.",
  },
  "pentacles-7": {
    message: "Bạn đã đầu tư công sức và đang chờ kết quả. Kiên nhẫn một chút, cây cần thời gian để ra trái.",
    reflect: "Mình đang đầu tư vào điều gì lâu dài?",
    blocked: "Có thể bạn đang sốt ruột hoặc đầu tư chưa đúng chỗ. Hãy đánh giá lại nhẹ nhàng.",
  },
  "pentacles-8": {
    message: "Sự chăm chỉ và mài giũa. Từng chút một, bạn đang trở nên giỏi hơn trong việc mình làm.",
    reflect: "Kỹ năng nào mình đang muốn luyện?",
    blocked: "Có thể bạn đang cầu toàn quá mức hoặc thấy nhàm chán. Nhớ lại lý do mình bắt đầu.",
  },
  "pentacles-9": {
    message: "Sự tự chủ và tận hưởng thành quả. Bạn đã tạo ra cuộc sống của mình, hãy cho phép mình tận hưởng nó.",
    reflect: "Mình có thể tận hưởng điều gì mình đã tạo ra?",
    blocked: "Có thể bạn đang phụ thuộc hơi nhiều, hoặc chi tiêu quá tay. Tìm lại sự cân bằng.",
  },
  "pentacles-10": {
    message: "Sự bền vững và di sản. Những gì bạn xây hôm nay có thể là nền tảng cho nhiều người sau này.",
    reflect: "Mình muốn để lại điều gì cho những người thân yêu?",
    blocked: "Có thể có chút căng thẳng về tài chính gia đình. Một cuộc trò chuyện cởi mở có thể giúp.",
  },
  "pentacles-11": {
    message: "Sự ham học và một kế hoạch thực tế. Bắt đầu nhỏ, học từ từ, rồi mọi thứ sẽ vững.",
    reflect: "Mình muốn học thêm điều gì thực tế?",
    blocked: "Có thể tiến độ đang chậm. Chia nhỏ mục tiêu sẽ giúp.",
  },
  "pentacles-12": {
    message: "Sự đều đặn và đáng tin cậy. Đi chậm mà chắc, bạn sẽ tới nơi.",
    reflect: "Thói quen nhỏ nào mình muốn duy trì mỗi ngày?",
    blocked: "Có thể bạn đang thấy trì trệ. Thử thay đổi một điều nhỏ trong thói quen.",
  },
  "pentacles-13": {
    message: "Sự chu đáo, thực tế và ấm cúng. Bạn biết cách chăm sóc người khác và tạo nên một không gian dễ chịu.",
    reflect: "Mình có thể làm cho không gian sống của mình dễ chịu hơn thế nào?",
    blocked: "Có lẽ bạn đang bỏ bê bản thân khi chăm lo cho người khác. Hãy nhớ đến mình.",
  },
  "pentacles-14": {
    message: "Sự thịnh vượng và vững vàng. Bạn đã xây dựng được nền tảng tốt, hãy tự tin vào nó.",
    reflect: "Mình tự hào về nền tảng nào mình đã xây?",
    blocked: "Có thể bạn đang quá tập trung vào vật chất. Hãy nhớ đến những điều quý giá không đo được bằng tiền.",
  },
};
