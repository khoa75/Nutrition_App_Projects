# Ngăn Xếp Công Nghệ (Tech Stack)

Dự án **Nutrition App** được xây dựng hoàn toàn với kiến trúc **Modular Monolith** (không sử dụng Microservices). Kiến trúc này giúp Backend quản lý logic nghiệp vụ tập trung tại một codebase duy nhất nhưng vẫn chia tách rõ ràng thành các modules nội bộ độc lập, đồng thời giao tiếp linh hoạt với AI Component và các Client (Mobile/Web).

## 1. Backend Core (Business Logic & API)
Đảm nhận việc quản lý người dùng, dữ liệu dinh dưỡng, và logic tính toán.
- **Framework:** Spring Boot (Java)
- **Database:** MongoDB (Sử dụng Spring Data MongoDB)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Spring Security, BCrypt (Mã hóa mật khẩu)
- **File Storage:** Cloudinary hoặc Amazon S3 (Lưu trữ ảnh avatar, ảnh món ăn)

## 2. AI / ML Service (Phân Tích & Nhận Diện)
Service độc lập chuyên xử lý các tác vụ liên quan đến trí tuệ nhân tạo.
- **Framework:** FastAPI (Python) - *Được chọn vì tốc độ phản hồi nhanh và tối ưu cho ML.*
- **Machine Learning:** PyTorch
- **Chức năng chính:** Nhận diện hình ảnh món ăn, phân tích ước lượng lượng calo.

## 3. Frontend Client
### Mobile App (Dành cho End User)
- **Framework:** Flutter (Hỗ trợ cross-platform iOS và Android)
- **State Management:** Provider / Riverpod / BLoC
- **UI Design:** Flutter Material & Cupertino
- **Data Visualization:** `fl_chart` (Vẽ biểu đồ cân nặng, calo)

### Web Admin Dashboard (Dành cho Admin)
- **Framework:** React.js
- **UI Library:** AdminLTE hoặc Ant Design Pro (Dành cho Admin Template)
- **Data Visualization:** D3.js, Chart.js, hoặc Recharts

## 4. DevOps & Cấu Hình Môi Trường
- **Cloud Hosting:** AWS, Azure hoặc GCP
- **Database Hosting:** MongoDB Atlas (Managed DB) hoặc self-hosted.
- **CI/CD:** GitHub Actions hoặc Jenkins (Tự động hóa testing và deployment)
- **Containerization (Khuyến nghị):** Docker để cô lập môi trường chạy Spring Boot và FastAPI.

## 5. Kiến Trúc Tương Tác
- Flutter App gọi API từ **Spring Boot Backend** để lấy dữ liệu người dùng, lưu lịch sử bữa ăn.
- Khi người dùng upload ảnh món ăn, Spring Boot sẽ đóng vai trò Proxy (hoặc Mobile gọi trực tiếp) tới **FastAPI Service** để lấy thông tin nhận diện.
- React Admin Dashboard giao tiếp trực tiếp với Spring Boot Backend thông qua các API bảo mật (yêu cầu Admin Role).
