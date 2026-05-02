# Workflow: Tái Cấu Trúc Mã Nguồn (Refactor)

Tái cấu trúc (Refactoring) là quá trình cải thiện cấu trúc mã nguồn bên trong mà không làm thay đổi hành vi hoạt động bên ngoài của nó. Điều này rất quan trọng để duy trì chất lượng dự án **Nutrition App** lâu dài.

## 1. Nguyên Tắc Cốt Lõi
- **Không thay đổi hành vi:** Nếu bạn đang refactor, tuyệt đối không thêm tính năng mới hay sửa lỗi.
- **Dựa vào Tests:** Chỉ thực hiện refactor khi module đó đã có Unit Tests/Integration Tests bao phủ (Target > 80% coverage) và tất cả tests đều đang pass.

## 2. Dấu Hiệu Cần Refactor (Code Smells)
- File quá dài, hàm xử lý quá nhiều logic (Ví dụ: Controller tự query DB và tự tính toán TDEE).
- Vi phạm Naming Conventions (không tuân thủ camelCase cho hàm, PascalCase cho class...).
- Trùng lặp code (Duplicate code) ở nhiều nơi.
- Thiếu comments giải thích cho các đoạn logic phức tạp (Ví dụ: logic gợi ý lộ trình dinh dưỡng).
- **Tight Coupling giữa các Module:** Dấu hiệu rõ nhất là Module A import trực tiếp Repository hoặc Entity của Module B thay vì gọi qua Public Service Interface của Module B.

## 3. Quy Trình Thực Hiện
1. **Tạo nhánh riêng:** 
   ```bash
   git checkout -b refactor/tên-module
   ```
2. **Kiểm tra Tests hiện tại:** Chạy toàn bộ tests để đảm bảo trạng thái xanh (Pass).
3. **Thực hiện thay đổi nhỏ:** 
   - Chia tách hàm/class nhỏ hơn (Keep functions small and focused).
   - Tách biệt các tầng bên trong module (Models, Controllers, Services). Đảm bảo tuân thủ nghiêm ngặt ranh giới (boundaries) không cho phép module này truy cập Database của module khác.
   - Bổ sung JSDoc comments.
4. **Kiểm chứng:** Chạy lại tests ngay sau mỗi thay đổi nhỏ để chắc chắn bạn chưa làm vỡ tính năng.
5. **Commit thường xuyên:** Commit các bước thay đổi nhỏ để dễ dàng rollback nếu cần.

## 4. Review & Merge
- Tạo Pull Request với nhãn (label) `refactor`.
- Liệt kê rõ những cải thiện đã làm trong mô tả PR.
- Yêu cầu code review và merge sau khi được approve.
