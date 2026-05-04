# Skill: Backend Development (Spring Boot)

Kỹ năng cốt lõi để xây dựng hệ thống server mạnh mẽ và có khả năng mở rộng.

## 1. Spring Boot 3 Best Practices
- **Dependency Management**: Tối ưu hóa `pom.xml` hoặc `build.gradle` để tránh xung đột thư viện.
- **Profiles**: Sử dụng `application-dev.yml`, `application-prod.yml` để quản lý cấu hình theo môi trường.
- **Error Handling**: Sử dụng `@ControllerAdvice` để xử lý lỗi tập trung và trả về lỗi chuẩn hóa.

## 2. MongoDB & Spring Data
- **Aggregations**: Sử dụng `Aggregation Pipeline` cho các truy vấn phức tạp như tính toán tổng calo theo tuần/tháng.
- **Data Consistency**: Đảm bảo tính toàn vẹn dữ liệu thông qua logic nghiệp vụ vì MongoDB không hỗ trợ quan hệ cứng (Foreign Keys).
- **Indexing**: Tạo `Text Indexes` hoặc `Compound Indexes` cho các trường tìm kiếm thường xuyên.

## 3. Security & Auth
- **JWT Implementation**: Xây dựng hệ thống token tự cấp lại (refresh token) và quản lý trạng thái đăng nhập.
- **Role-based Access Control (RBAC)**: Phân quyền rõ ràng giữa `USER` và `ADMIN`.
