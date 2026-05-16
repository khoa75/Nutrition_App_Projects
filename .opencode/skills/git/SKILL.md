---
name: git
description: Kỹ năng quản lý phiên bản, viết commit message chuẩn mực (Conventional Commits) và tối ưu lịch sử Git
license: Apache-2.0
compatibility: opencode
---
## 1. Tiêu chuẩn viết Commit Message (Conventional Commits)

Để lịch sử Git rõ ràng, chuyên nghiệp và dễ dàng cho việc tự động hóa (ví dụ tạo changelog), toàn bộ commit trong dự án cần tuân thủ cấu trúc sau:

```text
<type>(<scope>): <subject>

<body>

<footer>
```

### Các `type` (loại commit) tiêu chuẩn:
- `feat`: Thêm một tính năng mới.
- `fix`: Sửa một lỗi (bug).
- `docs`: Cập nhật tài liệu (README, Swagger, markdown...).
- `style`: Thay đổi định dạng code (khoảng trắng, thiếu dấu chấm phẩy, format code...) không làm thay đổi logic.
- `refactor`: Viết lại code nhưng không làm thay đổi logic (không fix bug, không thêm tính năng).
- `perf`: Tối ưu hóa hiệu năng, tốc độ xử lý.
- `test`: Thêm mới hoặc sửa các test cases.
- `build`: Thay đổi hệ thống build hoặc các dependency (maven, npm, uv, pub...).
- `ci`: Thay đổi cấu hình CI/CD (GitHub Actions, workflow files...).
- `chore`: Các công việc dọn dẹp, thay đổi công cụ hỗ trợ không thuộc các loại trên.

### 2. Quy tắc viết Subject (dòng tiêu đề)
- **Luôn gắn mã User Story hoặc Task ID (nếu có):** Ví dụ `feat(auth): US-01 add JWT login endpoint`.
- **Dùng tiếng Anh và viết ở thể mệnh lệnh:** Ví dụ `add` thay vì `added` hay `adds`, `fix` thay vì `fixed`.
- **Ngắn gọn:** Tối đa 50-72 ký tự để hiển thị tốt trên các công cụ dòng lệnh hoặc UI của GitHub.
- Không viết hoa chữ cái đầu (trừ trường hợp tên riêng/mã số).
- Không để dấu chấm ở cuối câu tiêu đề.

### 3. Quy tắc Body và Footer (tùy chọn)
- **Body:** Cách tiêu đề 1 dòng trống. Giải thích **tại sao** lại có thay đổi này (What and Why) thay vì miêu tả code làm gì (How). Dòng nên bẻ (wrap) ở khoảng 72 ký tự.
- **Footer:** Dùng để tham chiếu đến các ticket/issue (VD: `Closes #42`, `Fixes US-05`) hoặc đánh dấu Breaking Changes.

## 4. Các thực hành tốt (Best Practices) khi Commit
- **Atomic Commits (Commit nguyên tử):** Mỗi commit chỉ nên tập trung giải quyết 1 vấn đề/tác vụ duy nhất. Đừng gom chung việc fix lỗi CSS và tạo endpoint Backend vào cùng một commit.
- **Kiểm tra trước khi commit:** Luôn review kỹ các thay đổi đã stage (Staged changes) để đảm bảo không bị lọt code rác (như `console.log`, `print`, `TODO` tạm thời).
- **Hỏi trước khi làm:** (Dành cho AI Agent) Bất kỳ khi nào có một thay đổi nhỏ trên codebase, AI Agent phải chủ động hỏi xem người dùng có muốn commit lại tác vụ đó không để giữ lịch sử minh bạch.
