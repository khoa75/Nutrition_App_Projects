# Skill: System Design & Architecture

Kỹ năng thiết kế hệ thống tổng quát, đảm bảo tính bền vững và hiệu năng.

## 1. Modular Monolith Principles
- **Loose Coupling**: Các module giao tiếp qua Interface, không phụ thuộc trực tiếp vào Implementation.
- **Transactional Boundaries**: Quản lý giao dịch (Transaction) trong phạm vi từng module.
- **Shared Kernel**: Xác định rõ các thành phần dùng chung (Utils, Security, DTOs cơ bản) để tránh lặp lại code.

## 2. Scalability & Performance
- **Caching**: Sử dụng `Redis` (nếu cần mở rộng) để lưu trữ kết quả tính toán BMI hoặc TDEE thường xuyên.
- **Asynchronous Processing**: Đẩy các tác vụ nặng (như gửi email, xử lý ảnh) vào background task.
- **Load Balancing**: Thiết kế hệ thống sẵn sàng cho việc chạy nhiều instance sau Load Balancer.

## 3. Security Design
- **Data Encryption**: Mã hóa các dữ liệu nhạy cảm của người dùng (chiều cao, cân nặng, thông tin cá nhân).
- **Audit Logging**: Ghi lại mọi hành động quan trọng để phục vụ việc kiểm tra và bảo mật.
