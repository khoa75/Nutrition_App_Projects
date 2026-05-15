# Prompt Mẫu: Sinh Release Notes / Changelog
**Tác vụ**: Đọc lịch sử Git bằng câu lệnh `git log` và tự động tạo file `CHANGELOG.md` dựa trên Conventional Commits.

**Hướng dẫn dành cho AI Agent (`docs_writer` / `devops_engineer`)**:
1. Sử dụng công cụ chạy lệnh terminal để lấy danh sách commit. 
   - Lệnh ví dụ: `git log --pretty=format:"%h - %s (%an, %ad)" --since="v[phiên_bản_trước]"` (hoặc đọc toàn bộ nếu là bản release đầu tiên).
2. Phân loại các commit theo loại (type):
   - **`feat`**: Tính năng mới (New Features)
   - **`fix`**: Sửa lỗi (Bug Fixes)
   - **`perf`**: Cải thiện hiệu năng (Performance Improvements)
   - *Bỏ qua* các commit thuộc loại `chore`, `docs`, `style` (ngoại trừ trường hợp những commit này có ảnh hưởng trực tiếp đến người dùng cuối).
3. Biên soạn nội dung theo định dạng Markdown chuẩn:
   ```markdown
   ## [Tên_Phiên_bản] - YYYY-MM-DD
   
   ### ✨ Tính năng mới (New Features)
   - Lọc và liệt kê các mô tả từ commit `feat`...
   
   ### 🐛 Sửa lỗi (Bug Fixes)
   - Lọc và liệt kê các mô tả từ commit `fix`...
   ```
4. Cuối cùng, tự động ghi (append) hoặc tạo mới nội dung vào file `CHANGELOG.md` ở thư mục gốc của dự án.
