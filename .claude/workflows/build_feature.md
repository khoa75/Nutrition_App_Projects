# Workflow: Xây Dựng Tính Năng Mới (Build Feature)

Quy trình chuẩn để phát triển một tính năng mới trong dự án **Nutrition App**, từ lúc nhận yêu cầu đến lúc hoàn thành.

## 1. Chuẩn Bị (Preparation)
- Đọc kỹ **PRD.md** và `CLAUDE.md` để hiểu rõ yêu cầu tính năng (Feature Requirements) và các ràng buộc.
- Xác định phạm vi thay đổi: Backend (Spring Boot / FastAPI), Frontend (Flutter / React), hay Database (MongoDB).
- Tạo feature branch mới từ `main`: 
  ```bash
  git checkout main
  git pull origin main
  git checkout -b feature/tên-tính-năng
  ```

## 2. Phát Triển Backend (Modular Monolith)
- **Tạo Module/Package độc lập:** Tạo package mới (ví dụ `com.app.feature_name`) thay vì viết chung vào các thư mục layer global.
- **Thành phần Nội bộ:** Xây dựng Models, Controllers, Services và Repository riêng bên trong module đó.
  - *Lưu ý:* Hàm dùng `camelCase`, Class dùng `PascalCase`, Constants dùng `UPPER_SNAKE_CASE`.
- **Giao tiếp liên Module (Inter-module):** Nếu tính năng cần truy cập dữ liệu của module khác, tuyệt đối KHÔNG gọi thẳng Repository của module đó, mà phải inject Service Interface công khai của module kia.
- **Bảo mật & Error Handling:** Đảm bảo validate đầu vào, kiểm tra quyền bằng JWT và trả về HTTP status code phù hợp.

## 3. Phát Triển Frontend (Nếu có)
- **Mobile (Flutter):** 
  - Tạo các UI widgets mới sử dụng Flutter Material / Cupertino.
  - Quản lý state bằng Provider / Riverpod / BLoC tùy thuộc vào tính năng.
- **Admin Dashboard (React):**
  - Xây dựng component mới và tích hợp API.
  - Xử lý trạng thái loading và error state.

## 4. Tích hợp AI / ML (Nếu tính năng liên quan)
- Cập nhật **FastAPI** và **PyTorch** models.
- Đảm bảo tối ưu hóa ảnh đầu vào (compress) trước khi gọi qua Python backend.
- Xử lý timeout hoặc fallback khi nhận diện thất bại (độ chính xác yêu cầu > 85%).

## 5. Kiểm thử & Đóng gói (Testing & Review)
- Viết Unit Tests cho các hàm mới và Integration Tests cho API endpoints. (Mục tiêu độ phủ code > 80%).
- Chạy toàn bộ test suite để đảm bảo không phá vỡ tính năng cũ.
- Format lại code (Lint) trước khi commit.
- Tạo Commit có ý nghĩa.
- Tạo Pull Request (PR) đính kèm mô tả chi tiết và assign cho reviewer.

## 6. Dọn Dẹp (Cleanup)
- Sau khi PR được merge, xóa feature branch:
  ```bash
  git branch -d feature/tên-tính-năng
  ```
