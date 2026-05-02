# Workflow: Viết Kiểm Thử (Write Tests)

Viết Test là bước bắt buộc trong dự án **Nutrition App** để đảm bảo độ tin cậy và khả năng scale lên hàng trăm ngàn người dùng. Mục tiêu chung là **Độ phủ code (Code Coverage) > 80%**.

## 1. Phân Loại Tests Yêu Cầu

### Unit Tests
- Áp dụng cho các hàm logic cốt lõi: Tính toán BMI, tính toán TDEE, phân loại mức độ béo phì.
- Tốc độ thực thi cực nhanh, không phụ thuộc vào Database hay Network.

### Integration Tests
- Áp dụng cho các API Endpoints.
- Kiểm tra luồng từ Controller -> Service -> Database.
- Đảm bảo HTTP Status codes (200, 400, 401, 500) được trả về chính xác trong các trường hợp.

### Mocking
- Bắt buộc phải **Mock external services**. Ví dụ: Dịch vụ Google Vision API để nhận diện ảnh cần được mock lại, không gọi thực tế trong lúc chạy test để tránh tốn phí và phụ thuộc mạng.

## 2. Công Cụ Đề Xuất
- **Spring Boot (Backend):** JUnit, Mockito cho Unit Test và MockMvc cho Integration Test.
- **FastAPI (AI/ML):** PyTest, HTTPX.
- **Flutter (Mobile):** Flutter Widget Tests, Unit tests cho State (Provider/BLoC).
- **React (Admin):** Jest, React Testing Library.

## 3. Quy Trình Viết Test
1. Xác định hàm/logic cần test.
2. Thiết lập dữ liệu giả (Setup/Mock data).
3. Viết test case cho trường hợp thành công (Happy path).
4. Viết test cases cho các trường hợp ngoại lệ (Edge cases, Error handling - vd: user nhập tuổi âm, nhập cân nặng quá giới hạn).
5. Thực thi và Verify kết quả.

## 4. Kiểm Tra Tự Động (CI/CD)
- Các bài test sẽ được tự động chạy thông qua GitHub Actions / Jenkins mỗi khi có Pull Request mới.
- Nếu test thất bại (Fail), PR sẽ không được phép merge vào `main`.

## 5. Cập Nhật Tests
- Bất cứ khi nào cập nhật logic của một tính năng (như công thức gợi ý thực đơn mới), hãy nhớ cập nhật lại các bộ test tương ứng trước khi commit.
