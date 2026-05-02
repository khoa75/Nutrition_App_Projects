# Coding Styles & Best Practices

Tài liệu này định nghĩa các quy chuẩn viết code bắt buộc cho dự án **Nutrition App** dựa trên hệ thống C# (ASP.NET Core), ReactJS và kiến trúc Clean Architecture.

## 1. Quy Chuẩn Backend (C# & ASP.NET Core)

### 1.1. Phiên bản & Tính năng ngôn ngữ
- Đảm bảo mã nguồn tương thích với **C# 7.3** (Không sử dụng các tính năng của C# 8.0 trở lên trừ khi hệ thống được nâng cấp).
- **Luôn sử dụng `async/await`** cho các I/O operations (Database, Network, File System).
  - Khuyến nghị thêm hậu tố `Async` vào tên method (VD: `GetUserByIdAsync()`).
  - Tránh tuyệt đối việc dùng `.Result` hoặc `.Wait()` gây block thread (deadlock).

### 1.2. Đặt tên (Naming Conventions)
- **Classes, Interfaces, Records, Structs**: Sử dụng `PascalCase`.
  - Interface phải bắt đầu bằng chữ `I` (VD: `IUserService`).
- **Methods**: Sử dụng `PascalCase` (VD: `CalculateBMI()`).
- **Local Variables, Parameters**: Sử dụng `camelCase` (VD: `userId`, `userWeight`).
- **Private Fields**: Bắt đầu bằng dấu gạch dưới `_` và dùng `camelCase` (VD: `_userRepository`).
- **Constants**: Sử dụng `PascalCase` (VD: `MaxRetryCount`).

### 1.3. Clean Architecture & Layering
- **Tuân thủ quy tắc luồng dữ liệu**: `Controller` → `Service` → `Repository`.
- **Controllers**:
  - Tuyệt đối **không chứa Business Logic** trong Controller.
  - Controller chỉ chịu trách nhiệm nhận Request, Validate cơ bản (FluentValidation/Data Annotations), gọi Service và trả về Response (HTTP Status Codes chuẩn).
- **Services**:
  - Chứa toàn bộ Business Logic (Tính toán BMI, Recommendation).
- **Repositories**:
  - Chuyên xử lý các truy vấn thao tác với **SQL Server** thông qua Entity Framework Core hoặc Dapper.

## 2. Quy Chuẩn Frontend (ReactJS)

### 2.1. Đặt tên (Naming Conventions)
- **Components & Files**: Sử dụng `PascalCase` (VD: `DashboardCard.jsx`, `UserProfile.jsx`).
- **Functions, Hooks, Variables**: Sử dụng `camelCase` (VD: `useAuth()`, `fetchData()`).
- **Constants/Enums**: Sử dụng `UPPER_SNAKE_CASE` (VD: `API_BASE_URL`).

### 2.2. Best Practices
- Sử dụng **Functional Components** và **React Hooks**.
- Phân tách UI (Presentational Components) và Logic (Container Components/Custom Hooks).
- Xử lý State an toàn, tránh side effects bên ngoài `useEffect`.
- Code sạch, chia nhỏ Component nếu file quá dài (> 200 dòng).

## 3. Quy Chuẩn Chung & Giải thích Logic

### 3.1. Clean & Maintainable Code
- Giữ các method ngắn gọn, tập trung vào 1 chức năng (Single Responsibility Principle).
- Xóa bỏ các đoạn code dư thừa (Dead code), imports không dùng.

### 3.2. Chú thích & Giải thích (Documentation)
- **Luôn để lại comment giải thích (Explain reasoning)** cho những đoạn logic phức tạp (VD: Toán học, Thuật toán AI, Logic gợi ý dinh dưỡng).
- Dùng XML comments (`///`) cho các Public API/Interfaces trong C# để hỗ trợ Swagger.
- Dùng JSDoc (`/** ... */`) cho các custom hooks/utils phức tạp trong React.
