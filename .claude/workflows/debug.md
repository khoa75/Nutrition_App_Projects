# Workflow: Sửa Lỗi (Debug)

Hướng dẫn từng bước để tiếp cận, phân tích và giải quyết các lỗi (bugs) trong dự án **Nutrition App**.

## 1. Tái Hiện Lỗi (Reproduce)
- Thu thập thông tin từ user report hoặc error logs.
- Cố gắng tái hiện lỗi ở môi trường local hoặc staging.
- Ghi nhận lại chính xác các bước dẫn đến lỗi (Steps to reproduce).

## 2. Phân Cập Lỗi (Isolate)
Xác định vị trí xảy ra lỗi nằm ở phần nào của hệ thống:
- **Frontend (Flutter / React):** Sử dụng Flutter DevTools hoặc React DevTools. Lỗi có phải do UI render sai hay logic state bị lỗi không?
- **Network/API:** Kiểm tra qua tab Network hoặc Postman. Frontend có gửi đúng payload không? API có trả về đúng dữ liệu không?
- **Backend (Spring Boot / FastAPI):** Kiểm tra terminal logs, stack traces. Có phải do NullPointerException, lỗi truy xuất Database (MongoDB), hay sai logic tính toán BMI/TDEE?
- **AI/ML Service:** Lỗi có phải do format ảnh không hợp lệ hay timeout khi gọi sang dịch vụ nhận diện?

## 3. Thực Hiện Sửa Lỗi (Fix)
- Tạo branch mới dành riêng cho sửa lỗi:
  ```bash
  git checkout -b fix/tên-lỗi
  ```
- **Viết Test trước:** Viết một unit test hoặc integration test thể hiện đúng cái lỗi đó (test sẽ fail).
- Tiến hành sửa code để fix lỗi. Tuân thủ `CLAUDE.md` về coding standards.
- Chạy lại bài test vừa viết. Đảm bảo bài test đã pass (màu xanh).

## 4. Kiểm Thử Hồi Quy (Regression Testing)
- Chạy lại toàn bộ test suite của project (`npm test` hoặc `flutter test` hoặc `mvn test`).
- Đảm bảo đoạn code sửa lỗi không tạo ra bất kỳ ảnh hưởng (side-effect) nào đến các tính năng đang hoạt động khác.

## 5. Review & Cập Nhật
- Commit code với nội dung mô tả rõ lỗi gì và cách giải quyết ra sao.
- Tạo Pull Request kèm theo hình ảnh/video (nếu là lỗi UI).
- Nếu lỗi do lỗ hổng logic nghiêm trọng, hãy note lại để đội ngũ cùng rút kinh nghiệm và bổ sung test cases vào bộ khung chuẩn.
