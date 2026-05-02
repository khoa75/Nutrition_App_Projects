# Design System & Design Tokens

Tài liệu này định nghĩa ngôn ngữ thiết kế (Design Language) cho toàn bộ ứng dụng **Nutrition App**. Ứng dụng theo đuổi phong cách **Modern, Premium & Glassmorphism** (Hiện đại, Cao cấp và Hiệu ứng kính), tạo cảm giác mượt mà, sống động và kích thích người dùng tương tác.

## 1. Bảng Màu (Color Palette)
Hệ thống sử dụng hệ màu HSL/Hex với độ tương phản cao, mang lại cảm giác năng lượng nhưng không gây chói mắt.

### Primary Colors (Màu chủ đạo)
- **Primary Green (Brand)**: `#059669` (Emerald) - Tượng trưng cho sức khỏe, thiên nhiên và sự phát triển. Dùng cho nút bấm chính (Call to Action), thanh tiến trình đạt mục tiêu.
- **Primary Accent**: `#10B981` (Mint) - Dùng làm gradient kết hợp với Primary Green hoặc các trạng thái hover/active.

### Secondary/Semantic Colors (Màu ngữ nghĩa)
- **Warning (Cam)**: `#F59E0B` - Dùng khi lượng calo tiêu thụ sắp đạt giới hạn.
- **Danger (Đỏ/Hồng đậm)**: `#E11D48` - Dùng khi lượng calo vượt mức cho phép hoặc BMI ở mức Béo phì. Trạng thái lỗi.
- **Info (Xanh dương)**: `#3B82F6` - Dùng cho các chỉ số nước uống, giấc ngủ hoặc gợi ý (tips).

### Background & Surface (Nền)
Ứng dụng hỗ trợ Dark Mode là giao diện mặc định (Premium Dark), vì Dark Mode làm nổi bật hình ảnh món ăn và các dải màu gradient.
- **Main Background (Dark)**: `#0F172A` (Slate 900) - Màu nền chính của ứng dụng.
- **Surface/Card (Dark)**: `#1E293B` (Slate 800) - Nền của các Card, Modal.
- **Text Primary**: `#F8FAFC` (Slate 50) - Chữ chính.
- **Text Secondary**: `#94A3B8` (Slate 400) - Chữ phụ, mô tả nhỏ.

## 2. Nghệ thuật Chữ (Typography)
- **Font Family**: `Inter` hoặc `Outfit` (Google Fonts).
- **Heading (H1)**: Font weight 700 (Bold), Size 32px, Letter spacing -0.02em.
- **Subheading (H2)**: Font weight 600 (SemiBold), Size 24px.
- **Body Text**: Font weight 400 (Regular), Size 16px, Line height 1.5.
- **Caption**: Font weight 400, Size 12px, màu Text Secondary.

## 3. Hiệu ứng Hình ảnh (Visual Effects)

### Glassmorphism (Hiệu ứng kính)
Thay vì dùng nền Card đặc, ứng dụng sử dụng Glassmorphism cho các Overlay (như Bottom Sheet, Modal, hoặc thanh Header nổi).
- **Background**: `rgba(30, 41, 59, 0.7)`
- **Backdrop Filter**: `blur(12px)`
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`

### Drop Shadows & Glow
- Dùng hiệu ứng **Glow (Phát sáng)** thay vì bóng đổ đen truyền thống để tạo cảm giác Cyber/Premium.
- **Glow Button**: `box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4)` (Ánh sáng xanh ngọc tỏa ra từ nút bấm).

### Micro-Animations (Hoạt ảnh vi mô)
1. **Nút bấm (Buttons)**: Khi nhấn (Tap/Click), nút sẽ co lại nhẹ `scale(0.95)` và nảy lại nhanh (Spring animation).
2. **Tiến trình (Progress Bars)**: Khi mở màn hình, thanh tiến trình Calo sẽ chạy từ 0 đến giá trị hiện tại trong `800ms` với hiệu ứng `ease-out-cubic`.
3. **Chuyển trang (Page Transitions)**: Sử dụng hiệu ứng Fade-in và Slide-up nhẹ nhàng (`translateY` từ 10px về 0px, `opacity` từ 0 lên 1 trong `300ms`).
