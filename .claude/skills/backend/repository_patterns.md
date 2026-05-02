# Backend Skill: Repository & Data Access Patterns

Tài liệu này định nghĩa cách tầng **Infrastructure (Repository)** tương tác với SQL Server bằng C#.

## 1. The Repository Pattern
- Mọi tương tác với Database phải được trừu tượng hóa (abstracted) thành một interface (VD: `IUserRepository`).
- Lớp implementation (VD: `UserRepository`) sẽ tiêm (inject) `DbContext` của Entity Framework Core.
- **Quy tắc tuyệt đối**: Hàm trong Repository chỉ làm nhiệm vụ C-R-U-D. **Không được** chứa bất kỳ Business Logic nào (VD: Không viết logic tính BMI bên trong Repository, chỉ truy vấn lấy thông tin chiều cao/cân nặng ra ngoài).

## 2. Asynchronous Queries
- Mọi hàm gọi DB phải chạy bất đồng bộ (Asynchronous).
- Sử dụng các hàm async của Entity Framework Core: `ToListAsync()`, `FirstOrDefaultAsync()`, `SaveChangesAsync()`.

## 3. IQueryable vs IEnumerable (Tối ưu Hiệu năng)
Để đạt chuẩn ráng buộc "API response < 2s":
- Trả về `IQueryable<T>` khi muốn áp dụng phân trang (Pagination) hoặc bộ lọc (Where) *trước* khi SQL thực thi. Điều này đặc biệt quan trọng cho màn hình Admin Dashboard.
- Chỉ dùng `.ToList()` hoặc `.ToListAsync()` khi đã chốt danh sách hoặc số lượng dữ liệu, vì thao tác này sẽ kích hoạt việc tải dữ liệu từ RAM của SQL Server về RAM của Backend.

## 4. Unit of Work (Tùy chọn cho tính nhất quán)
- Đối với các thao tác ghi dữ liệu phức tạp trên nhiều bảng (VD: Khi hoàn thành một bữa ăn, vừa lưu `MealEntry`, vừa phải update lượng Calo trong `DailyProgress`), hãy triển khai **UnitOfWork Pattern** hoặc kiểm soát Transaction (TransactionScope) để đảm bảo tính Acid: Ghi thành công tất cả hoặc Rollback toàn bộ.
