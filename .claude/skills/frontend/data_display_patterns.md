# Frontend Skill: Data Display & Interaction Patterns

Tài liệu này định nghĩa cách hiển thị dữ liệu phức tạp và các tương tác UX trong ReactJS.

## 1. Bảng Dữ Liệu (Data Tables)
Dùng chủ yếu trong Admin Dashboard.
- Cột có Header nhỏ, màu xám chữ in hoa (Uppercase).
- **Hàng (Rows)**: Nền tối, sáng lên nhẹ khi chuột lướt qua (Hover row `background: #334155`).
- Phải có phân trang (Pagination) ở dưới cùng và thanh Tìm kiếm (Search Bar) ở trên cùng.

## 2. Trạng Thái Đang Tải (Loading States)
- **Tuyệt đối không dùng Loading Spinner xoay tròn mặc định.**
- Sử dụng **Skeleton Loading Pattern**:
  - Dựng các khối hình học (chữ nhật, hình tròn đại diện cho avatar) màu xám.
  - Phủ lên một dải Gradient sáng quét ngang liên tục (Shimmer effect `animation: shimmer 1.5s infinite`).
  - Đảm bảo khung Skeleton có kích thước gần bằng với nội dung thật để tránh hiện tượng giật màn hình (Layout Shift) khi dữ liệu render xong.

## 3. Thông Báo (Toast Notifications)
- Xuất hiện khi có hành động thành công/thất bại (VD: Lưu món ăn, Cập nhật cân nặng, Khóa tài khoản).
- Vị trí: Trượt xuống từ góc trên bên phải màn hình.
- Màu sắc: Nền xanh lá cho Success, Đỏ cho Error. Đi kèm Icon nổi bật.
- Tự động biến mất sau 3 giây (Auto-dismiss).

## 4. Modal & Bottom Sheet (Overlay Patterns)
- Dùng để hỏi xác nhận (Confirmation) hoặc cho các form nhập liệu nhanh.
- **Modal (Cho Desktop/Web)**: Xuất hiện giữa màn hình với animation phóng to (Scale up). Nền trang web phía dưới mờ đi (Backdrop blur).
- **Bottom Sheet (Ưu tiên cho Mobile View)**: Trượt từ dưới cùng màn hình lên. Giúp người dùng dễ dàng chạm bằng một tay. Cần có thanh gạt nhỏ (Drag handle bar) ở trên cùng để người dùng vuốt xuống đóng lại.

## 5. Tag Phân Loại (Macro / Status Badges)
- Các nhãn trạng thái (Active/Locked) hoặc Nhãn dinh dưỡng (Protein/Carb) sử dụng thiết kế Badge (Pill shape).
- **Pattern**: Chữ màu nổi bật trên nền có độ trong suốt (opacity 15% của màu chữ).
  - VD: Chữ đỏ `#E11D48`, nền `rgba(225, 29, 72, 0.15)`. Tránh dùng nền đặc dễ gây nhức mắt.
