// The 78-card structure of The Modern Witch Tarot (Lisa Sterle), which
// follows the classic Rider–Waite layout: 22 Major Arcana + 4 suits × 14.
// Only names and short keywords live here — the faces are drawn in-house
// (components/cards/TarotFace.tsx); no artwork from the deck is used.

export type TarotSuit = "wands" | "cups" | "swords" | "pentacles";

export type TarotCard = {
  id: string;
  arcana: "major" | "minor";
  suit: TarotSuit | null;
  number: number; // 0–21 for Major; 1–14 for Minor (11 Page … 14 King)
  name: string; // English, as printed on the deck
  nameVi: string;
  upright: string;
  reversed: string;
};

type Meaning = [name: string, nameVi: string, upright: string, reversed: string];

const MAJOR: Meaning[] = [
  ["The Fool", "Kẻ Khờ", "khởi đầu mới, tự do, dám nhảy", "liều lĩnh, do dự, chưa sẵn sàng"],
  ["The Magician", "Nhà Ảo Thuật", "ý chí, kỹ năng, biến ý tưởng thành thật", "phân tán, thao túng, tài năng bị bỏ phí"],
  ["The High Priestess", "Nữ Tư Tế", "trực giác, điều ẩn giấu, lắng nghe bên trong", "phớt lờ trực giác, bí mật, mất kết nối"],
  ["The Empress", "Nữ Hoàng", "nuôi dưỡng, sáng tạo, sung túc", "cạn năng lượng, phụ thuộc, bỏ bê bản thân"],
  ["The Emperor", "Hoàng Đế", "cấu trúc, kỷ luật, làm chủ", "cứng nhắc, kiểm soát, thiếu kỷ luật"],
  ["The Hierophant", "Giáo Hoàng", "truyền thống, người dẫn dắt, học hỏi", "phá lệ, tự tìm con đường riêng"],
  ["The Lovers", "Tình Nhân", "kết nối, lựa chọn từ trái tim, hài hoà", "mất cân bằng, lựa chọn lệch giá trị"],
  ["The Chariot", "Cỗ Xe", "quyết tâm, tiến lên, chiến thắng", "mất phương hướng, thiếu kiểm soát"],
  ["Strength", "Sức Mạnh", "can đảm dịu dàng, kiên nhẫn, tự tin", "tự nghi ngờ, yếu lòng, nóng nảy"],
  ["The Hermit", "Ẩn Sĩ", "chiêm nghiệm, tìm câu trả lời bên trong", "cô lập, trốn tránh, lạc lối"],
  ["Wheel of Fortune", "Bánh Xe Số Phận", "bước ngoặt, vận may, chu kỳ", "trì trệ, kháng cự thay đổi"],
  ["Justice", "Công Lý", "công bằng, sự thật, nhân quả", "thiếu trung thực, né trách nhiệm"],
  ["The Hanged Man", "Người Treo Ngược", "buông bỏ, nhìn từ góc khác, tạm dừng", "trì hoãn, hy sinh vô ích"],
  ["Death", "Cái Chết", "kết thúc để bắt đầu, chuyển hoá", "níu kéo, sợ thay đổi"],
  ["Temperance", "Tiết Chế", "cân bằng, kiên nhẫn, hoà hợp", "thái quá, lệch nhịp"],
  ["The Devil", "Ác Quỷ", "ràng buộc, cám dỗ, thói quen", "thoát ra, lấy lại quyền kiểm soát"],
  ["The Tower", "Toà Tháp", "đổ vỡ bất ngờ, thức tỉnh", "né tránh khủng hoảng, sợ đổi thay"],
  ["The Star", "Ngôi Sao", "hy vọng, chữa lành, cảm hứng", "mất niềm tin, nản lòng"],
  ["The Moon", "Mặt Trăng", "mơ hồ, tiềm thức, trực giác", "sáng tỏ dần, bớt sợ hãi"],
  ["The Sun", "Mặt Trời", "niềm vui, thành công, rạng rỡ", "niềm vui bị che, lạc quan quá mức"],
  ["Judgement", "Phán Xét", "thức tỉnh, tiếng gọi, nhìn lại", "tự phán xét, bỏ lỡ tiếng gọi"],
  ["The World", "Thế Giới", "hoàn thành, trọn vẹn, một vòng khép lại", "dang dở, thiếu một bước cuối"],
];

const SUITS: { suit: TarotSuit; en: string; vi: string }[] = [
  { suit: "wands", en: "Wands", vi: "Gậy" },
  { suit: "cups", en: "Cups", vi: "Cốc" },
  { suit: "swords", en: "Swords", vi: "Kiếm" },
  { suit: "pentacles", en: "Pentacles", vi: "Tiền" },
];

const RANK_EN = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"];
const RANK_VI = ["Át", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Tiểu Đồng", "Hiệp Sĩ", "Hoàng Hậu", "Vua"];

// [upright, reversed] per rank (Ace → King), per suit.
const MINOR: Record<TarotSuit, [string, string][]> = {
  wands: [
    ["tia cảm hứng, khởi đầu đầy lửa", "chần chừ, thiếu động lực"],
    ["lên kế hoạch, nhìn xa", "sợ bước ra, kế hoạch mơ hồ"],
    ["mở rộng, chờ thành quả", "trở ngại, chậm trễ"],
    ["ăn mừng, mái ấm, cột mốc", "bất ổn, chuyển tiếp"],
    ["cạnh tranh, va chạm ý kiến", "tránh xung đột, dịu lại"],
    ["được công nhận, chiến thắng", "tự cao, thiếu ghi nhận"],
    ["giữ vững lập trường", "kiệt sức, muốn bỏ cuộc"],
    ["tăng tốc, tin tức đến nhanh", "chờ đợi, vội vàng"],
    ["bền bỉ, gần tới đích", "mệt mỏi, phòng thủ"],
    ["gánh nặng, ôm quá nhiều", "buông bớt, chia sẻ việc"],
    ["tò mò, ý tưởng mới", "thiếu định hướng, nóng vội"],
    ["hành động, phiêu lưu, bốc lửa", "bốc đồng, dang dở"],
    ["tự tin, ấm áp, cuốn hút", "ghen tị, thiếu tự tin"],
    ["tầm nhìn, lãnh đạo bằng cảm hứng", "độc đoán, kỳ vọng quá cao"],
  ],
  cups: [
    ["cảm xúc mới, yêu thương tràn đầy", "cảm xúc bị dồn nén"],
    ["kết nối đôi, đồng điệu", "lệch nhịp, rạn nứt"],
    ["bạn bè, ăn mừng", "tiệc quá đà, xa cách"],
    ["thờ ơ, chiêm nghiệm", "nhận ra cơ hội mới"],
    ["mất mát, tiếc nuối", "chấp nhận, bước tiếp"],
    ["hoài niệm, ngây thơ", "sống mãi trong quá khứ"],
    ["nhiều lựa chọn, mơ mộng", "rõ ràng, chọn thực tế"],
    ["rời đi để tìm ý nghĩa", "sợ buông, quay lại"],
    ["mãn nguyện, điều ước thành", "tham lam, chưa thoả"],
    ["hạnh phúc, gia đình, hài hoà", "gia đình lệch nhịp"],
    ["tin vui, trực giác trẻ trung", "cảm xúc non nớt"],
    ["lãng mạn, lời mời", "thất thường, ảo tưởng"],
    ["thấu cảm, dịu dàng", "cạn cảm xúc, phụ thuộc"],
    ["cân bằng cảm xúc, bao dung", "thao túng cảm xúc"],
  ],
  swords: [
    ["sáng suốt, sự thật mới", "rối trí, hiểu lầm"],
    ["bế tắc, khó chọn", "quá tải thông tin"],
    ["đau lòng, tổn thương", "chữa lành, tha thứ"],
    ["nghỉ ngơi, hồi phục", "kiệt sức, bồn chồn"],
    ["xung đột, thắng mà mất", "hoà giải, bỏ qua"],
    ["chuyển tiếp, rời xa sóng gió", "mắc kẹt, hành lý cũ"],
    ["chiến lược, lén lút", "bị lộ, thú nhận"],
    ["tự giới hạn, cảm giác bị trói", "tự giải thoát"],
    ["lo âu, trằn trọc", "vượt qua nỗi sợ"],
    ["chạm đáy, kết thúc đau", "hồi sinh, tệ nhất đã qua"],
    ["tò mò, ham học", "nói nhiều làm ít"],
    ["quyết liệt, lao về phía trước", "hấp tấp, thiếu suy xét"],
    ["thẳng thắn, độc lập", "lạnh lùng, cay nghiệt"],
    ["lý trí, công tâm", "lạm quyền, cứng nhắc"],
  ],
  pentacles: [
    ["cơ hội vật chất, hạt giống mới", "cơ hội bị bỏ lỡ"],
    ["xoay xở, cân bằng nhiều việc", "quá tải, mất cân bằng"],
    ["hợp tác, tay nghề", "làm việc nhóm lệch pha"],
    ["giữ gìn, an toàn", "bủn xỉn, bám chặt"],
    ["khó khăn, thiếu thốn", "phục hồi, được giúp đỡ"],
    ["cho và nhận, hào phóng", "nợ nần, cho có điều kiện"],
    ["kiên nhẫn, đầu tư dài hạn", "sốt ruột, đầu tư sai chỗ"],
    ["chăm chỉ, mài giũa", "cầu toàn, nhàm chán"],
    ["tự chủ, tận hưởng thành quả", "phụ thuộc, tiêu quá tay"],
    ["di sản, bền vững", "rạn nứt tài chính gia đình"],
    ["ham học, kế hoạch thực tế", "thiếu tiến độ"],
    ["đều đặn, đáng tin", "trì trệ, bảo thủ"],
    ["chu đáo, thực tế, ấm cúng", "bỏ bê bản thân"],
    ["thịnh vượng, vững vàng", "tham vọng vật chất"],
  ],
};

const majors: TarotCard[] = MAJOR.map(([name, nameVi, upright, reversed], i) => ({
  id: `major-${i}`,
  arcana: "major",
  suit: null,
  number: i,
  name,
  nameVi,
  upright,
  reversed,
}));

const minors: TarotCard[] = SUITS.flatMap(({ suit, en, vi }) =>
  MINOR[suit].map(([upright, reversed], i) => ({
    id: `${suit}-${i + 1}`,
    arcana: "minor" as const,
    suit,
    number: i + 1,
    name: `${RANK_EN[i]} of ${en}`,
    nameVi: `${RANK_VI[i]} ${vi}`,
    upright,
    reversed,
  }))
);

export const TAROT_DECK: TarotCard[] = [...majors, ...minors];

const ROMAN = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];

// Top-of-card index: roman numeral for Major, rank for Minor.
export function tarotIndex(card: TarotCard): string {
  if (card.arcana === "major") return ROMAN[card.number];
  return ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "P", "Kn", "Q", "K"][card.number - 1];
}
