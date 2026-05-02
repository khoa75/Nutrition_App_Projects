# Màn Hình Admin Dashboard (Quản Trị Hệ Thống)

Khác với App dành cho người dùng cuối, Admin Dashboard là một ứng dụng Web (React.js) phục vụ việc quản trị dữ liệu lớn. Thiết kế ưu tiên tính **Professional, Clean, và Data-Dense (Hiển thị nhiều dữ liệu)** nhưng vẫn giữ được nét hiện đại (Premium vibe) thông qua màu sắc và chuyển động.

## 1. Bố Cục Tổng Quan (Web Layout)
- **Nền tảng**: Web Desktop.
- **Theme**: Sử dụng Dark Mode đồng bộ với App (`#0F172A`).
- **Sidebar (Trình đơn Trái)**:
  - Chiếm 15% chiều rộng màn hình.
  - Nền `#1E293B`, viền phải mỏng 1px `#334155`.
  - Các mục Menu (Dashboard, User Management, Audit Logs, Settings) có hiệu ứng Hover: Đổi nền sang `#334155` và vạch chỉ thị (indicator bar) màu Xanh Mint (`#10B981`) chạy dọc bên trái.
- **Header (Thanh công cụ Trên)**:
  - Chứa ô tìm kiếm toàn cục (Global Search) bo góc tròn dạng Pill.
  - Cụm Notification và Avatar Admin ở góc phải.

## 2. Khu Vực Bảng Dữ Liệu Quản Lý Người Dùng (Data Table)
Đây là màn hình chính khi Admin vào "User Management".

### Khung Bảng (Table Wrapper)
- **Background**: Card lớn bo góc 12px, nền `#1E293B`, đổ bóng (Drop shadow) rất nhẹ để tách biệt khỏi nền trang.
- **Thanh Công Cụ Bảng (Table Toolbar)**:
  - Trái: Input Search "Tìm kiếm theo Email/Tên..." (Icon kính lúp phát sáng nhẹ khi focus).
  - Phải: Bộ lọc (Filter) "Trạng thái: Tất cả / Active / Locked". Nút Export CSV màu Secondary.

### Cột & Hàng (Columns & Rows)
- **Header Cột**: Chữ in hoa nhỏ (Uppercase, Size 12px, Tracking wide), màu xám `#94A3B8`.
- **Dữ liệu Hàng (Row)**:
  - Khi chuột lướt qua (Hover), cả hàng sẽ sáng lên nhẹ (`#334155`) kèm hiệu ứng transition màu `0.2s ease`.
- **Avatar & Tên**: Mỗi User có một avatar tròn nhỏ cạnh Tên, tạo cảm giác trực quan.
- **Trạng Thái (Status Badge)**:
  - `Active`: Badge nền xanh lá nhạt (`rgba(16, 185, 129, 0.15)`), chữ Xanh Mint (`#10B981`), kèm một chấm tròn nhấp nháy nhẹ (Pulse animation) biểu thị đang online/active.
  - `Locked`: Badge nền đỏ nhạt (`rgba(225, 29, 72, 0.15)`), chữ Đỏ (`#E11D48`).

## 3. Hành Động & Trạng Thái (Actions & States)

### Nút Khóa/Mở Khóa Tài Khoản (Toggle Action)
- Không dùng nút text nhàm chán, sử dụng **Toggle Switch** (Nút gạt) giống thiết kế của iOS.
- **Hiệu ứng**: Khi Admin gạt công tắc khóa User:
  1. Thanh gạt chuyển từ Xanh sang Xám.
  2. Một hộp thoại xác nhận (Confirmation Modal) xuất hiện từ giữa màn hình (Scale up từ 0.8 lên 1, opacity fade in). Nền Modal là Glassmorphism.
  3. Sau khi xác nhận, hiện một **Toast Notification** nhỏ trượt từ góc trên bên phải xuống: "Đã khóa tài khoản thành công" (Có icon dấu Tick, nền xanh, tự động biến mất sau 3s).

### Trạng Thái Đang Tải (Loading State)
- Thay vì biểu tượng xoay (Spinner) tròn nhàm chán, sử dụng hiệu ứng **Skeleton Loading**.
- Khi chuyển trang hoặc đang gọi API, bảng dữ liệu biến thành các khối hình chữ nhật màu xám nhạt, có dải sáng lướt qua lướt lại liên tục (Shimmer effect), giúp người dùng không cảm thấy ứng dụng bị đơ (lag).
