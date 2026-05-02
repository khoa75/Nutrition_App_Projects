# Frontend Skill: Form Patterns

Tài liệu này định nghĩa các mẫu thiết kế biểu mẫu (Forms), nhập liệu và tương tác của người dùng trong ứng dụng ReactJS (Nutrition App).

## 1. Input Fields (Trường nhập liệu)
Mọi input đều phải tuân thủ phong cách Dark Theme và nổi bật khi được tương tác (Focus state).

**Nguyên tắc thiết kế:**
- **Nền Input**: Trong suốt hoặc màu cực tối (`#1E293B`).
- **Viền (Border)**: Xám nhạt (`#334155`), góc bo `12px`.
- **Trạng thái Focus**: Viền sáng lên màu Primary Green (`#10B981`) kèm hiệu ứng Glow (Box-shadow). Không dùng viền xanh dương mặc định của trình duyệt.
- **Label**: Nằm phía trên input, màu chữ Text Secondary (`#94A3B8`).

## 2. Validation & Error Handling (Xử lý lỗi nhập liệu)
- Lỗi phải được báo ngay (Inline validation) ngay khi người dùng nhập sai (thay vì đợi bấm Submit).
- Khi có lỗi:
  - Đổi màu viền Input sang Đỏ Danger (`#E11D48`).
  - Text lỗi màu Đỏ xuất hiện ngay dưới Input, kích thước nhỏ (`12px`), kèm theo một icon tam giác cảnh báo nhỏ.

## 3. Call To Action (CTAs / Buttons)
Nút bấm Submit hoặc hành động chính phải mang lại cảm giác phản hồi tốt (Satisfying).

**Glow Button Pattern:**
- Hình dáng: Hình chữ nhật bo tròn góc (Pill shape hoặc radius 12px).
- Nền: Gradient từ Xanh Mint sang Xanh Emerald.
- **Interaction (Hover/Tap)**:
  - Khi Hover: Nổi bật bóng đổ phát sáng (Glow) `box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4)`.
  - Khi Active (Click): Nút co lại nhẹ `transform: scale(0.95)` với `transition: all 0.2s ease`.
  
## 4. Toggle Switches (Nút gạt)
Thay vì sử dụng Checkbox cho các tùy chọn Bật/Tắt (VD: Khóa tài khoản Admin), hãy sử dụng Nút gạt (Switch) mang phong cách iOS.
- **On**: Nền xanh lá.
- **Off**: Nền xám tối.
- Có animation mượt mà khi cục gạt di chuyển ngang.
