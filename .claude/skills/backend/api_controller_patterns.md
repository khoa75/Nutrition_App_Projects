# Backend Skill: API Controller Patterns

Tài liệu này định nghĩa các chuẩn thiết kế cho tầng Presentation (Controller) trong kiến trúc **Clean Architecture** sử dụng ASP.NET Core.

## 1. Fat Service - Thin Controller
- **Controller KHÔNG CHỨA logic nghiệp vụ (Business Logic).**
- Nhiệm vụ duy nhất của Controller:
  1. Nhận HTTP Request.
  2. Xác thực (Authorization/Authentication).
  3. Validate định dạng đầu vào cơ bản.
  4. Truyền dữ liệu xuống tầng Service.
  5. Đóng gói kết quả từ Service thành HTTP Response (200 OK, 400 Bad Request, 404 Not Found, v.v.).

## 2. Request & Response DTOs
- Tuyệt đối không dùng trực tiếp Entity (từ Database) làm tham số đầu vào hoặc kết quả trả về ở Controller.
- **Pattern**: Tạo các file record/class DTO riêng biệt (VD: `CreateUserRequest`, `UserResponse`).
- Validation: Áp dụng **FluentValidation** hoặc Data Annotations (`[Required]`, `[EmailAddress]`) trực tiếp lên DTO. Nếu dữ liệu không hợp lệ, ASP.NET Core tự động trả về lỗi 400 mà không cần code logic trong Controller.

## 3. Async/Await Standard
- Tất cả các Endpoint phải được đánh dấu là `async Task<IActionResult>`.
- Mọi lời gọi xuống Service phải dùng `await`.

## 4. Exception Mapping (Global Error Handling)
- Trong Controller, **không được dùng khối `try...catch` một cách bừa bãi** chỉ để ném lỗi HTTP.
- Sử dụng **Global Exception Middleware** (Hoặc Exception Filter) để tóm các lỗi (Exception) bắn ra từ Service.
  - VD: Service ném `NotFoundException` -> Middleware tự động map thành HTTP 404.
  - VD: Service ném `ValidationException` -> Middleware tự động map thành HTTP 400.
