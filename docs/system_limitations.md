# BÁO CÁO HẠN CHẾ CỦA HỆ THỐNG (SYSTEM LIMITATIONS)

## 4.5 Hạn chế của Hệ thống

Mặc dù mang lại hiệu quả vượt trội về tốc độ phát triển và khả năng tự sửa lỗi (Self-healing Loop), hệ thống phát triển và vận hành của Nutrition App vẫn tồn tại một số hạn chế cốt lõi cần lưu ý:

---

### 1. Sự phụ thuộc vào độ chuẩn xác của ý đồ (Prompt Dependency)
* **Thách thức**: Chất lượng mã nguồn do các tác tử AI sinh ra tỷ lệ thuận với tính tường minh và chính xác của mô tả nghiệp vụ (PRD/SRS) và các tài liệu kỹ thuật đầu vào.
* **Hệ quả**: Bất kỳ sự thiếu sót hay mơ hồ nào trong đặc tả yêu cầu có thể dẫn đến việc sinh mã nguồn sai hướng, đòi hỏi lập trình viên phải có năng lực phân tích cao để đưa ra định hướng tinh chỉnh chuẩn xác.

---

### 2. Thách thức đối với nghiệp vụ có độ phức tạp cao (Complexity Barrier)
* **Thách thức**: Với các luồng logic đa tầng tích hợp sâu hoặc giao tiếp phức tạp với các hệ quản trị và hệ thống legacy bên ngoài.
* **Hệ quả**: Chu trình tự sửa lỗi (Self-healing Loop) của AI có thể phát sinh độ trễ lớn trong việc phân tích logs hoặc đôi khi sinh ra cấu trúc mã nguồn chưa tối ưu hoàn toàn về mặt hiệu năng xử lý luồng dữ liệu tải lớn.

---

### 3. Thiếu tính kiểm thử trực quan tự động (Visual Loop Constraints)
* **Thách thức**: Quy trình kiểm thử tự động (automated test suites) hiện tại tập trung chủ yếu vào tính đúng đắn ở mức dữ liệu (tầng API Controllers và Services thông qua JUnit/Mockito).
* **Hệ quả**: Hệ thống chưa có cơ chế tự động đánh giá và phản hồi trực quan về tính thẩm mỹ giao diện, độ mượt mà của hiệu ứng (micro-animations) cũng như trải nghiệm người dùng (UX) thực tế trên thiết bị di động mà vẫn phụ thuộc hoàn toàn vào sự kiểm duyệt thủ công của con người.
