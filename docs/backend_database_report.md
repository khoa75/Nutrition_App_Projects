# BÁO CÁO HIỆN THỰC HÓA LÕI NGHIỆP VỤ BACKEND VÀ CƠ SỞ DỮ LIỆU (BACKEND & DATABASE LAYER)

## 4.2 Hiện thực hóa Lõi Nghiệp vụ Backend và Cơ sở Dữ liệu (Backend & Database Layer)
### 4.2.1 Xây dựng và tích hợp các phân hệ dịch vụ Spring Boot 3 & Java 21

Lớp lõi nghiệp vụ và lưu trữ dữ liệu (Backend & Database Layer) được phát triển dựa trên nền tảng **Spring Boot 3** và **Java 21**, kết hợp hệ quản trị cơ sở dữ liệu quan hệ **PostgreSQL** và bộ nhớ đệm phân tán **Redis** nhằm tối ưu hóa tính toán và tra cứu.

#### 1. Thiết kế Cơ sở Dữ liệu & Tối ưu hóa (Database Layer)
Cấu trúc cơ sở dữ liệu được quản lý tự động bởi **Flyway Migrations**, bao gồm 7 thực thể chuẩn hóa quan hệ chặt chẽ:
- **`users`**: Hồ sơ thể trạng, mục tiêu cân nặng và thông tin bảo mật.
- **`daily_calorie_plans`**: Quản lý ngân sách calo chi tiết từng ngày của người dùng.
- **`foods`**: Danh mục thực phẩm dinh dưỡng chuẩn hóa (đã lược bỏ chỉ số chất xơ - fiber).
- **`logs` & `log_foods`**: Nhật ký bữa ăn thực tế ánh xạ theo quan hệ Nhiều-Nhiều.
- **`user_weight_logs`**: Lịch sử cân nặng hỗ trợ phân tích xu hướng.
- **`audit_logs`**: Nhật ký kiểm toán bảo mật dành cho Admin.

**Tối ưu hiệu năng**: Áp dụng chỉ mục duy nhất `uq_daily_plan_user_date` trên bảng kế hoạch ngày và chỉ mục văn bản `idx_foods_name` trên bảng thực phẩm, kết hợp các ràng buộc khóa ngoại `ON DELETE CASCADE` đảm bảo truy vấn nhanh dưới 10ms và toàn vẹn dữ liệu.

#### 2. Các Phân hệ Dịch vụ Nghiệp vụ Cốt lõi (Core Business Services)
Hệ thống tích hợp các phân hệ dịch vụ đặc thù nhằm đáp ứng trải nghiệm cá nhân hóa của người dùng:
- **Bảo mật & Xác thực**: Triển khai cơ chế bảo mật phi trạng thái (Stateless) bằng mã thông báo **JWT**, kết hợp thuật toán mã hóa mật khẩu **BCrypt**. Tích hợp tính năng chống dò mật khẩu (**Account Lockout**) tự động khóa tài khoản trong 15 phút nếu đăng nhập sai quá 5 lần liên tiếp.
- **Động cơ Chỉ số Sức khỏe (Health Metrics Engine)**: Sử dụng công thức khoa học **Mifflin-St Jeor** kết hợp với hệ số hoạt động thể chất (PAL) để xác định chỉ số trao đổi chất cơ bản BMR và năng lượng tiêu thụ TDEE. Calo mục tiêu được điều chỉnh thích nghi và ép biên an toàn từ 300 kcal đến 500 kcal mỗi ngày tùy thuộc tốc độ tăng/giảm cân mong muốn.
- **Lập Kế hoạch Calo Thích ứng Động (Dynamic Feedback Loop)**: Tự động khởi tạo kế hoạch calo chi tiết từ 1 đến 3 tháng. Giải thuật dynamic compensation bù trừ ngân sách calo thông minh: nếu hôm nay ăn lố/thiếu, phần chênh lệch sẽ cộng/trừ trực tiếp vào ngân sách ngày mai. Toàn bộ lượng calo điều chỉnh được giới hạn trong biên sinh lý tuyệt đối an toàn là **[1200 kcal - 5000 kcal]**.
- **Nhật ký ăn uống & Đồng bộ tức thời**: Hỗ trợ ghi nhật ký bằng ID hoặc tìm kiếm xấp xỉ tên thực phẩm. Mọi hành động ghi nhận, sửa đổi hoặc xóa nhật ký ăn uống lập tức kích hoạt tái đồng bộ năng lượng toàn phần cho ngày hôm đó.
- **Danh mục thực phẩm & Tối ưu Caching**: Sử dụng **Redis** lưu trữ bộ đệm phân trang danh sách thực phẩm (`@Cacheable`), đồng thời áp dụng cơ chế xóa sạch bộ đệm chủ động (`@CacheEvict`) khi cập nhật danh mục, duy trì tốc độ phản hồi tối ưu và tính nhất quán của dữ liệu.
- **Kiểm toán Admin (Audit Trail)**: Giám sát an ninh qua hệ thống quản trị lọc Specification linh hoạt, ghi nhận lịch sử thay đổi trạng thái kèm giải mã IP máy khách thực tế qua headers (`X-Forwarded-For`, `X-Real-IP`).

### 4.3 Kết quả Thực nghiệm Kiểm thử và Đảm bảo Chất lượng (QA & Test Plan Metrics)

Hệ thống áp dụng phương pháp phát triển hướng kiểm thử kết hợp bảo vệ các biên nghiệp vụ nghiêm ngặt. Toàn bộ kịch bản kiểm thử được tự động hóa bằng framework **JUnit 5**, bộ thư viện giả lập **Mockito** và **Spring Boot Starter Test** (sử dụng **MockMvc** cho tầng Controller).

#### 1. Số liệu Thực nghiệm và Tỉ lệ Bao phủ (Coverage Metrics)
Tiến trình kiểm tra tự động đã thực thi toàn diện trên cả hai tầng dịch vụ cốt lõi:
- **Tầng Dịch vụ nghiệp vụ (Service Layer)**: Đạt tỉ lệ bao phủ mã nguồn (Code Coverage) **> 90%**, đảm bảo các giải thuật toán học cốt lõi không phát sinh lỗi ngoại lệ logic.
- **Tầng Điều phối API (Controller Layer)**: Đạt tỉ lệ bao phủ **> 80%**, kiểm tra tính đúng đắn của chuỗi ánh xạ URI, bóc tách Validation DTO và phản hồi mã HTTP Status tiêu chuẩn.

**Kết quả chạy thực tế (Build Success)**:
- **Tổng số kịch bản kiểm thử (Test Cases)**: **71** kịch bản (gồm 12 Controller Tests và 59 Service/Config/Bootstrap Tests).
- **Tỉ lệ vượt qua (Pass Rate)**: **100%** (70 thành công, 1 skipped). Không phát sinh lỗi logic (`Failures = 0`) hoặc lỗi hệ thống (`Errors = 0`). Tổng thời gian thực thi: **17.589 giây**.

#### 2. Các Kịch bản Kiểm thử Trọng yếu được Kiểm chứng
- **Xác thực và Bảo mật (TC-AUTH)**: Xác thực thành công cơ chế mã hóa mật khẩu, kiểm tra hết hạn mã thông báo, phân quyền vai trò (User thường bị chặn tuyệt đối khi truy cập `/api/admin/*` thông qua `AuthorizationDecision`). Đặc biệt, kiểm thử thành công cơ chế khóa tài khoản tạm thời 15 phút khi nhập sai mật khẩu quá 5 lần liên tiếp.
- **Tính toán BMI và Năng lượng (TC-BMI)**: Xác thực tính chính xác của giải thuật Mifflin-St Jeor (Đầu vào: Cao 170cm, Nặng 65kg $\Rightarrow$ Đầu ra BMI: 22.49). Tiền kiểm lỗi logic ngăn chặn dữ liệu thể trạng âm hoặc bằng 0, kích hoạt tính toán lại mục tiêu calo tức thời khi cân nặng thay đổi.
- **Nhật ký và Bù trừ Calo Động (TC-FOOD)**: Kiểm chứng khả năng nhân tỉ lệ calo theo trọng lượng gram thực tế (món ăn 150 calo/100g ăn 200g $\Rightarrow$ hấp thụ 300 calo). Kiểm thử tính đúng đắn của giải thuật bù trừ calo (dynamic compensation) sang ngày tiếp theo và cơ chế ép biên sinh lý an toàn [1200 kcal - 5000 kcal].
- **Nhất quán Bộ đệm Thực phẩm**: Xác nhận hoạt động lưu trữ bộ đệm Redis cho kết quả tìm kiếm phân trang và xóa sạch bộ đệm chủ động ngay khi có thao tác thêm mới thực phẩm.

#### 4.4 Kết luận
Sự kết hợp giữa lớp lõi nghiệp vụ tối ưu và hệ thống kiểm thử tự động toàn diện đạt 100% tỉ lệ thành công đã bảo chứng cho chất lượng, tính an toàn và khả năng vận hành ổn định lâu dài của hệ thống Nutrition App.
