# Màn Hình Dashboard (Progress Tracking)

Đây là màn hình chính (Trang chủ) mà người dùng nhìn thấy mỗi ngày, được thiết kế để gây ấn tượng mạnh (WOW) bằng giao diện trực quan, sang trọng và giàu dữ liệu nhưng không rối mắt.

## 1. Cấu Trúc Tổng Quan (Layout)
Màn hình được cuộn dọc, nền sử dụng màu `#0F172A` (Dark Slate). Có một gradient mờ ảo tỏa ra từ góc trên bên phải màn hình (màu `#10B981` opacity 15%) tạo chiều sâu.

### Header (Phần đầu trang)
- Góc trái: Lời chào cá nhân hóa "Chào buổi sáng, Khoa! 👋" (Chữ Trắng `#F8FAFC`, font `Outfit` SemiBold 24px).
- Góc phải: Avatar người dùng hình tròn, viền mỏng màu Primary Green.

## 2. Thẻ Trọng Tâm: Vòng Tròn Calo (Calorie Ring Card)
Nằm ngay dưới Header, đây là điểm nhấn thị giác lớn nhất.
- **Background**: Card bo góc 24px, áp dụng hiệu ứng **Glassmorphism** (nền bán trong suốt, blur 12px, viền sáng 1px).
- **Trung tâm**: Một vòng tròn khuyết (Circular Progress) cỡ lớn.
  - Vòng nền: `#334155` (Slate 700).
  - Vòng tiến trình: Sử dụng dải Gradient từ `#10B981` (Mint) sang `#3B82F6` (Xanh dương).
  - **Animation**: Khi load, dải màu chạy từ 0 đến phần trăm tiêu thụ với hiệu ứng phát sáng nhẹ (Glow).
- **Text bên trong vòng tròn**:
  - Số lớn (Hiển thị nổi bật): "1,450" (font Bold 40px).
  - Label nhỏ phía dưới: "Kcal đã nạp".
- **Góc dưới Card**: Hiển thị text "Còn lại: 550 Kcal" màu Xanh mint.

## 3. Thẻ Dinh Dưỡng Đa Lượng (Macros Breakdown)
Nằm dưới vòng tròn Calo, hiển thị 3 chỉ số: Protein, Carbs, Fats.
- Bố cục: 3 cột nằm ngang (Row). Mỗi cột chứa:
  - Label (VD: "Protein").
  - Thanh Linear Progress nhỏ.
  - Số liệu (VD: "45g / 120g").
- **Màu sắc thanh tiến trình**:
  - Protein: Gradient Đỏ hồng (`#E11D48`).
  - Carbs: Gradient Cam (`#F59E0B`).
  - Fats: Gradient Tím (`#8B5CF6`).

## 4. Khu Vực Bữa Ăn Trong Ngày (Today's Meals)
Hiển thị dạng List theo chiều dọc.
- Tiêu đề: "Các bữa ăn hôm nay" (Size 20px, SemiBold). Nút "Xem tất cả" nhỏ bên phải.
- **Meal Card**:
  - Nền đen nhạt (`#1E293B`), bo góc 16px. Có hiệu ứng nhô lên nhẹ khi hover/tap.
  - Trái: Hình ảnh thu nhỏ (Thumbnail) của món ăn, bo tròn, có filter làm tối nhẹ góc ảnh.
  - Giữa: Tên món (VD: "Ức gà nướng áp chảo"), dưới là giờ ăn ("12:30 PM").
  - Phải: Tổng lượng Calo của món ("+350 kcal", màu Primary Green).

## 5. Nút Thêm Món Ăn (Floating Action Button - FAB)
- Vị trí: Cố định ở góc dưới cùng bên phải hoặc căn giữa màn hình (như nút Home của tabbar).
- Thiết kế: Hình tròn lớn, Gradient từ Xanh Mint sang Xanh Emerald.
- Box Shadow: Tỏa bóng màu xanh (Glow) `0px 10px 20px rgba(16, 185, 129, 0.4)` tạo cảm giác đang lơ lửng.
- Icon: Ký hiệu dấu CỘNG (`+`) màu trắng hoặc icon Camera. Khi nhấn vào, icon xoay 45 độ biến thành dấu `x` và kích hoạt hiệu ứng mờ phông nền (Backdrop filter) để mở menu chọn: "Chụp ảnh" hoặc "Nhập thủ công".
