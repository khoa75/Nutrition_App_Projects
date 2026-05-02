# Nutrition App - Development Guidelines (Index)

**Nutrition App** là ứng dụng quản lý sức khỏe, chế độ ăn uống, theo dõi cân nặng và phân tích calo bằng AI.

> **Lưu ý quan trọng**: File `CLAUDE.md` này hiện đóng vai trò là "Mục lục" (Index) điều hướng cho hệ thống tài liệu. Đừng cố gắng tìm mọi chi tiết kỹ thuật ở đây. Hãy đọc các tài liệu chuyên sâu được liên kết bên dưới trước khi bắt đầu code.

---

## 1. Cấu Trúc Tài Liệu (Documentation Structure)
Toàn bộ tài liệu quy chuẩn được phân bổ rõ ràng vào các thư mục:

### Yêu Cầu Sản Phẩm
- **[PRD.md](PRD.md)**: Product Requirements Document (User Stories, Metrics, Personas).

### Kiến Thức & Bối Cảnh (`.claude/context/`)
- `project_overview.md`: Mục tiêu cốt lõi và lộ trình chi tiết.
- `domain_knowledge.md`: Kiến thức y tế (Công thức BMI, BMR, TDEE, Macros).
- `tech_stack.md`: Cấu trúc kỹ thuật và hệ thống Backend/Frontend/AI.

### Quy Trình Chuẩn (`.claude/workflows/`)
- `build_feature.md`: Quy trình xây dựng tính năng mới.
- `refactor.md`: Quy trình tái cấu trúc code an toàn.
- `debug.md`: Các bước cô lập và sửa lỗi.
- `write_tests.md`: Tiêu chuẩn viết Unit & Integration Tests.

### Quy Tắc Bắt Buộc (`.claude/rules/`)
- `code_standards.md`: Tiêu chuẩn viết code (Naming, Package-by-feature).
- `security_and_error_handling.md`: Tiêu chuẩn bảo mật (JWT, BCrypt) và xử lý lỗi.
- `git_workflow.md`: Quy trình chia nhánh và tạo PR.
- `testing_guidelines.md`: Quy định về độ phủ code (>80%).

### Prompts Lập Trình (`.claude/prompts/`)
Sử dụng các prompt nguyên tử (atomic prompts) trong thư mục này để giao việc cho AI:
- `bmi_calculation.md`
- `nutrition_recommendation.md`
- `food_recognition.md`
- `dashboard_tracking.md`
- `admin_management.md`

### Lưu Trữ & Kỹ Năng
- `.claude/memory/`: Theo dõi tiến độ và trạng thái.
- `.claude/skills/`: Kỹ năng code chuyên biệt cho Spring Boot, Flutter, FastAPI, React.

---

## 2. Kiến Trúc Cốt Lõi (Architecture Strategy)
**Kiến trúc: Modular Monolith**
- Dự án tuyệt đối **KHÔNG sử dụng Microservices**.
- Backend (Spring Boot) tổ chức theo **Package-by-Feature**, các module (user, meals, nutrition, admin) chạy trong cùng một codebase.
- **Ranh giới module**: Giao tiếp giữa các module phải thông qua **Internal Service Interfaces**, nghiêm cấm truy cập chéo Database hoặc Repository của nhau.
- Phân tích AI được xử lý tách biệt qua **FastAPI + PyTorch**.

---

## 3. Lộ Trình Phát Triển Tóm Tắt (Roadmap)
- **Phase 1 (MVP)**: Auth, tính toán BMI, nhập liệu thủ công, UI Dashboard cơ bản.
- **Phase 2 (AI)**: Nhận diện ảnh món ăn (FastAPI), hệ thống gợi ý TDEE/Macro.
- **Phase 3 (Admin & Scale)**: Dashboard Admin (React), Audit Logs, tối ưu hiệu năng.
- **Phase 4 (Advanced)**: Tích hợp smartwatch, tính năng cộng đồng.

---

## 4. Ràng Buộc (Constraints)
- **Hiệu năng (Performance)**: Thời gian phản hồi của mọi API (API response) phải nhỏ hơn 2 giây (< 2s).
- **Khả năng mở rộng (Scalability)**: Hệ thống phải thiết kế để có thể chịu tải và mở rộng lên đến 100.000 người dùng (Scalable to 100K users).
- **Trí tuệ nhân tạo (AI)**: Độ chính xác của mô hình nhận diện món ăn (Food Recognition) phải đạt mức lớn hơn 80%.
- **Toàn vẹn kiến trúc (Architecture)**: Tuyệt đối không viết Business Logic bên trong Controller. Phải tuân thủ kiến trúc đã định (Modular Monolith / Clean Architecture).

## 5. Các Lệnh Thường Dùng (Useful Commands)
```bash
# Backend (Spring Boot)
./mvnw spring-boot:run
./mvnw test

# Frontend Mobile (Flutter)
flutter pub get
flutter run
flutter test

# Admin Dashboard (React)
npm install
npm run dev
```

## 6. Lưu ý Quan trọng (Important)
Luôn luôn:
- Tuân thủ kiến trúc phân lớp (layered architecture).
- Viết mã nguồn dễ bảo trì và dễ kiểm thử (maintainable, testable code).
- Giải thích rõ ràng tư duy/lý do khi tạo ra các đoạn logic phức tạp.

---
**Last Updated:** May 2026
**Maintained by:** Nutrition App Team
