# Màn Hình Gợi Ý Bữa Ăn (Nutrition Recommendations)

Màn hình này cung cấp thực đơn gợi ý cá nhân hóa dựa trên mục tiêu TDEE. Giao diện được thiết kế để kích thích vị giác và tạo động lực, sử dụng bố cục hiện đại dạng thẻ cuộn (Carousel) hoặc danh sách trực quan.

## 1. Cấu Trúc Tổng Quan
- **Nền (Background)**: Dark Slate (`#0F172A`) tương tự Dashboard, đảm bảo tính đồng nhất.
- **Header**:
  - Nút Back ở góc trái.
  - Tiêu đề: "Kế Hoạch Dinh Dưỡng Hôm Nay" (Font `Outfit`, Size 24px, Bold, màu `#F8FAFC`).
  - Nút Filter/Settings ở góc phải (Để người dùng chỉnh sửa Goal: Giảm cân/Tăng cân).

## 2. Dải Thẻ Mục Tiêu (Goal Toggle & Summary)
- Ngay dưới Header là một thanh trượt ngang mượt mà (Segmented Control).
- **Trạng thái**: [Giảm Cân] | [Duy Trì] | [Tăng Cân].
- Khi chuyển đổi, có thanh trượt (slider indicator) lướt qua với hiệu ứng nảy (spring effect), làm nổi bật mục tiêu hiện tại bằng màu Primary Green (`#059669`).
- **Summary Box**: Một Card nhỏ áp dụng Glassmorphism hiển thị nhanh: "Mục tiêu: 1,800 Kcal / ngày".

## 3. Danh Sách Các Bữa Ăn (Meal Timeline / Carousel)
Các bữa ăn được chia theo dòng thời gian (Bữa sáng, Bữa trưa, Bữa tối, Ăn vặt).

### Thẻ Bữa Ăn (Meal Card)
Mỗi thẻ mang hiệu ứng 3D nổi và Parallax khi cuộn.
- **Kích thước**: Hình chữ nhật lớn, bo góc 20px, chiếm 90% chiều rộng màn hình.
- **Nền Thẻ**: Gradient tối từ `#1E293B` sang `#334155`, tạo chiều sâu.
- **Hình Ảnh (Thumbnail)**:
  - Nằm ở nửa trên hoặc cạnh trái của thẻ.
  - Hình ảnh đồ ăn chất lượng cao, có hiệu ứng Gradient Overlay đen từ dưới lên để làm nổi bật chữ.
- **Thông tin (Typography)**:
  - Tag phân loại: "Bữa Sáng" (Badge nhỏ nền Xanh Info `#3B82F6` opacity 20%, chữ Xanh Info).
  - Tên món: "Salad Cá Hồi Avocado" (Size 18px, SemiBold).
  - Lượng Calo: "450 Kcal" (Màu Xanh Mint `#10B981`, font to nổi bật).
- **Thẻ Macro (Macro Tags)**:
  - Các viên thuốc (Pill shape) nhỏ dưới tên món: `[Protein: 35g]` `[Carb: 20g]` `[Fat: 15g]`.
  - Viền mỏng 1px, nền xám trong suốt.

## 4. Hành Động & Hiệu Ứng Nút Bấm (Interactions & Micro-animations)
### Nút Thay Đổi Món (Swap Button)
- Góc phải của thẻ có nút "Đổi Món" (Icon mũi tên xoay tròn).
- **Animation**: Khi bấm vào, icon xoay 360 độ trong 300ms. Thẻ món ăn hiện tại sẽ nhòe đi (blur transition) và một dải sáng (Shimmer effect) lướt qua trước khi hiển thị món ăn thay thế mới.

### Nút Thêm Vào Nhật Ký (Eat This / Log Button)
- Nằm ở dưới cùng của thẻ. Nút rộng trải dài, chữ "Chọn món này".
- Khi bấm, nút nảy nhẹ (Scale down 0.95), đổi màu sang Primary Green và hiện dấu Tick `✓`, kèm theo hiệu ứng Confetti (pháo giấy) nhỏ xíu nổ ra xung quanh để thưởng cho người dùng (Gamification).
