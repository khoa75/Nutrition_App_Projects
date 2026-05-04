# Project Architecture: Nutrition App

**Nutrition App** là một ứng dụng di động quản lý sức khỏe toàn diện, được thiết kế để giúp người dùng quản lý chế độ ăn uống và theo dõi tiến độ giảm/tăng cân. Ứng dụng tích hợp công nghệ AI để nhận diện hình ảnh món ăn, tự động phân tích calo, từ đó đưa ra các lộ trình dinh dưỡng được cá nhân hóa cao.

## 1. Mục Tiêu Cốt Lõi (Core Objectives)
- Cung cấp giải pháp theo dõi chế độ ăn uống hàng ngày một cách tiện lợi và chính xác.
- Đưa ra những khuyến nghị dinh dưỡng cá nhân hóa dựa trên chỉ số BMI và mục tiêu sức khỏe của từng cá nhân.
- Ứng dụng trí tuệ nhân tạo (AI/ML) để giảm thiểu thao tác nhập liệu thủ công (nhận diện món ăn và ước lượng calo qua hình ảnh).

## 2. Các Tính Năng Chính (Core Features)
1. **Hệ thống Tính toán BMI:** Tính toán, lưu trữ và theo dõi chỉ số BMI. Đưa ra phân loại thể trạng hiện tại.
2. **Gợi ý Lộ trình Dinh dưỡng:** Tạo kế hoạch ăn uống (ngày/tuần/tháng) dựa trên TDEE, cho phép thay thế món ăn linh hoạt.
3. **Nhận diện và Phân tích Calo (AI Powered):** Cho phép người dùng chụp ảnh món ăn; hệ thống tự động nhận diện tên món, thành phần và ước tính lượng calo. Hỗ trợ thêm tính năng nhập liệu thủ công.
4. **Dashboard & Theo dõi Quá trình:** Trực quan hóa dữ liệu calo tiêu thụ, biến động cân nặng, và tiến độ hoàn thành mục tiêu thông qua biểu đồ theo thời gian thực.
5. **Quản trị Người dùng (Admin):** Bảng điều khiển riêng biệt dành cho Admin để quản lý tài khoản, theo dõi hoạt động và phát hiện các hành vi bất thường.

## 3. Kiến Trúc Hệ Thống (Modular Monolith)
Dự án được xây dựng theo mô hình **Modular Monolith** nhằm đảm bảo tính cô lập giữa các module nghiệp vụ trong khi vẫn duy trì sự đơn giản của một codebase duy nhất cho Backend.
- **Backend (Spring Boot)**: Đóng vai trò trung tâm xử lý logic và điều phối dữ liệu.
- **AI Service (FastAPI)**: Chuyên trách các tác vụ nặng về tính toán và nhận diện hình ảnh.
- **Clients (Flutter & React)**: Cung cấp giao diện người dùng đa nền tảng.
