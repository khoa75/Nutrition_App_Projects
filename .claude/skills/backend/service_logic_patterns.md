# Backend Skill: Service Logic Patterns

Tài liệu này định nghĩa cách triển khai tầng **Business Logic (Application/Service Layer)** trong Clean Architecture. Đây là trái tim của Nutrition App.

## 1. Single Responsibility Services
- Mỗi interface Service nên chịu trách nhiệm cho một miền (Domain) nghiệp vụ cực kỳ cụ thể.
- Đặt tên theo nghiệp vụ thay vì chung chung (VD: Dùng `IBmiCalculationService`, `IMealTrackingService` thay vì gom tất cả vào một file `IUserService` khổng lồ).

## 2. Dependency Injection (DI)
- Services giao tiếp với tầng Repository thông qua các **Interfaces** (`IUserRepository`, `IMealRepository`). Tuyệt đối không khởi tạo đối tượng trực tiếp bằng từ khóa `new`.
- Injection phải thông qua Constructor.
- Tần suất sống (Lifetime): Đa số các Service (chứa Logic, gọi DB) nên được đăng ký dưới dạng `AddScoped` trong ASP.NET Core.

## 3. Logic Độc Lập Khung Làm Việc (Framework-Agnostic)
- Lớp Service **KHÔNG ĐƯỢC BIẾT** bất cứ thứ gì về HTTP Context, JSON Serialization, hay Cookies.
- Nếu Service cần thông tin "User đang đăng nhập là ai", Controller phải trích xuất ID từ JWT Token và truyền vào hàm của Service dưới dạng tham số kiểu `Guid` hoặc `string`.

## 4. Fail-Fast (Báo lỗi sớm)
- Kiểm tra tính hợp lệ của logic nghiệp vụ ở ngay những dòng đầu tiên của hàm.
- Nếu phát hiện vi phạm nghiệp vụ (VD: Người dùng đang bị khóa không thể nạp thêm bữa ăn), ném Exception ngay lập tức (`throw new BusinessRuleException("Tài khoản đã bị khóa")`).
- Điều này kết hợp hoàn hảo với **Global Error Handling** đã định nghĩa ở tầng Controller.
