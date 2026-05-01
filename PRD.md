# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Ứng Dụng Quản Lý Chế Độ Ăn Uống - Nutrition App

## 1. Overview (Tổng Quan)

**Tên dự án:** Nutrition App - Ứng Dụng Quản Lý Chế Độ Ăn Uống

**Mô tả:** Nutrition App là một ứng dụng quản lý sức khỏe toàn diện, giúp người dùng quản lý chế độ ăn uống và theo dõi tiến độ giảm/tăng cân thông qua công nghệ nhận diện hình ảnh, tính toán chỉ số BMI, và phân tích lượng calo. Ứng dụng cung cấp các khuyến nghị dinh dưỡng được cá nhân hóa dựa trên mục tiêu cân nặng và tình trạng sức khỏe của từng người dùng.

**Mục tiêu chính:**
- Giúp người dùng theo dõi và quản lý chế độ ăn uống hàng ngày
- Cung cấp khuyến nghị dinh dưỡng được cá nhân hóa dựa trên BMI và mục tiêu cân nặng
- Sử dụng AI/công nghệ nhận diện để dễ dàng ghi nhận thông tin dinh dưỡng
- Hỗ trợ người dùng đạt được mục tiêu sức khỏe một cách hiệu quả

---

## 2. Các Chức Năng Cốt Lõi (Core Features)

### 2.1 Hệ thống Tính toán BMI
Tính toán chỉ số khối cơ thể (BMI) và lưu trữ thông tin cá nhân người dùng.

### 2.2 Gợi ý Lộ trình Dinh dưỡng
Cung cấp các khuyến nghị thực đơn và kế hoạch ăn uống được cá nhân hóa.

### 2.3 Nhận diện và Phân tích Calo
Nhận diện hình ảnh món ăn và phân tích lượng calo tương ứng.

### 2.4 Dashboard và Theo dõi Quá trình
Hiển thị trực quan tiến độ ăn uống và biến động cân nặng theo thời gian.

### 2.5 Chức năng Quản trị Người dùng (Admin)
Quản lý toàn bộ tài khoản người dùng, lịch sử hoạt động và các hành vi bất thường.

---

## 3. Bối Cảnh Nghiệp Vụ (Business Context)

### 3.1 Hệ thống Tính toán BMI

**Quy trình nghiệp vụ:**
- Khi người dùng vừa đăng nhập/tạo tài khoản, họ nhập các thông tin cá nhân gồm:
  - Họ và tên
  - Ngày/tháng/năm sinh (hệ thống tính ra tuổi hiện tại)
  - Cân nặng (hỗ trợ kg và pound)
  - Chiều cao (hỗ trợ cm và feet)
  - Giới tính
  - Cường độ tập luyện thể thao (3 mức: thấp/bình thường/cao)
  - Mục tiêu cân nặng (giảm/tăng cân)
  - Mức cân nặng mục tiêu

**Xử lý dữ liệu:**
- Lưu trữ toàn bộ thông tin vào hệ thống
- Tính toán chỉ số BMI hiện tại dựa trên công thức: BMI = cân nặng (kg) / (chiều cao (m))²
- Sử dụng kết quả BMI làm cơ sở cho các khuyến nghị dinh dưỡng sau này

### 3.2 Gợi ý Lộ trình Dinh dưỡng

**Quy trình nghiệp vụ:**
- Dựa trên chỉ số BMI và mục tiêu cân nặng, hệ thống tạo kế hoạch ăn uống phù hợp
- Cho phép người dùng lựa chọn khung thời gian: ngày, tuần, tháng, hoặc năm
- Hệ thống gợi ý thực đơn dựa trên các tiêu chí cá nhân hóa

**Tính năng thay thế món ăn:**
- Nếu gợi ý không phù hợp, người dùng có thể tìm kiếm và thay thế bằng món ăn có lượng calo tương tự
- Nếu không tìm được, người dùng nhập thủ công - hệ thống tính calo và đánh giá tính phù hợp
- Hệ thống tiếp tục cập nhật kế hoạch dựa trên các điều chỉnh này

### 3.3 Nhận diện và Phân tích Calo của Món ăn

**Quy trình nhập liệu:**

*Phương thức 1: Nhận diện hình ảnh*
- Người dùng chụp ảnh món ăn
- Hệ thống sử dụng công nghệ nhận diện để xác định tên món ăn và các thành phần chính
- Tiến hành phân tích và ước tính calo cho từng thành phần cũng như tổng calo toàn bộ

*Phương thức 2: Nhập liệu thủ công*
- Khi kết quả nhận diện không chính xác hoặc món ăn không có trong cơ sở dữ liệu
- Người dùng chủ động nhập thủ công tên món ăn hoặc các thành phần
- Hệ thống tính toán và đưa ra ước lượng calo tương ứng
- Đánh giá mức độ phù hợp với mục tiêu dinh dưỡng đã thiết lập

### 3.4 Dashboard và Theo dõi Quá trình Ăn uống

**Chức năng hiển thị:**
- Người dùng cập nhật cân nặng hàng ngày
- Ghi nhận lượng calo tiêu thụ thực tế từ các bữa ăn trong ngày
- Hệ thống phân tích mối tương quan giữa lượng calo nạp vào và thay đổi cân nặng

**Visualize dữ liệu:**
- Hiển thị dưới dạng biểu đồ theo nhiều mốc thời gian: ngày, tuần, tháng
- Giúp người dùng nhận biết xu hướng và hiệu quả của chế độ ăn uống hiện tại

**Các chỉ số tổng quan trên Dashboard:**
- Tổng lượng calo tiêu thụ
- Mức chênh lệch so với mục tiêu
- Tiến độ đạt được mục tiêu cân nặng
- Cho phép người dùng chủ động điều chỉnh chế độ dinh dưỡng và thói quen sinh hoạt

### 3.5 Chức năng Quản trị Người dùng (Admin)

**Quyền hạn quản lý:**
- Xem danh sách tất cả người dùng đã đăng ký với thông tin: Họ tên, email, giới tính, tuổi, trạng thái tài khoản, mục tiêu cân nặng
- Tạo mới tài khoản người dùng
- Chỉnh sửa thông tin cá nhân người dùng
- Khóa/mở khóa tài khoản trong trường hợp phát hiện vi phạm
- Tìm kiếm và lọc danh sách người dùng theo: tên, email, trạng thái tài khoản, mục tiêu cân nặng

**Lịch sử hoạt động:**
- Theo dõi thời gian đăng nhập
- Cập nhật thông tin cá nhân
- Thay đổi cân nặng
- Lịch sử nhập dữ liệu dinh dưỡng
- Phát hiện các hành vi bất thường

---

## 4. Các Success Metrics (Chỉ số Đánh giá Thành công)

### Cho Người dùng:
1. **User Engagement:**
   - Tỷ lệ người dùng hoạt động hàng ngày (DAU)
   - Tỷ lệ người dùng hoạt động hàng tháng (MAU)
   - Số lần sử dụng các chức năng chính trên mỗi user mỗi tháng

2. **Behavior Metrics:**
   - Số bữa ăn được ghi nhận trên mỗi người dùng mỗi ngày (trung bình)
   - Tỷ lệ hoàn thành kế hoạch dinh dưỡng hàng tuần
   - Tỷ lệ người dùng cập nhật cân nặng hàng ngày
   - Tỷ lệ sử dụng nhận diện hình ảnh vs nhập liệu thủ công

3. **Health Outcomes:**
   - Tỷ lệ người dùng đạt được mục tiêu cân nặng trong 3 tháng
   - Trung bình độ thay đổi BMI sau 6 tháng sử dụng
   - Số lượng người dùng có xu hướng giảm/tăng cân ổn định

4. **Retention & Satisfaction:**
   - Tỷ lệ giữ chân người dùng sau 1 tuần, 1 tháng, 3 tháng
   - Net Promoter Score (NPS)
   - Tỷ lệ đánh giá ứng dụng trên App Store/Play Store

### Cho Hệ thống:
1. **Performance:**
   - Độ chính xác của nhận diện hình ảnh (>85%)
   - Thời gian phản hồi Dashboard < 2 giây
   - Uptime hệ thống ≥ 99.5%

2. **Data Quality:**
   - Tỷ lệ dữ liệu dinh dưỡng chính xác (dựa trên kiểm chứng của chuyên gia)
   - Tỷ lệ nhận diện thành công lần đầu

3. **Admin Metrics:**
   - Thời gian xử lý các yêu cầu quản trị (< 5 phút)
   - Tỷ lệ phát hiện các hành vi bất thường

---

## 5. Kế hoạch Phát triển (Development Roadmap)

### Phase 1: MVP (Tháng 1-2)
**Mục tiêu:** Xây dựng các chức năng cốt lõi

- [x] Hệ thống tính toán BMI
- [x] Dashboard cơ bản với hiển thị calo
- [x] Chức năng nhập liệu thủ công
- [x] Quản lý tài khoản người dùng

**Deliverable:** 
- Ứng dụng có thể chạy được trên iOS và Android
- Có thể đăng ký, đăng nhập, nhập thông tin cá nhân
- Ghi nhận calo từ những bữa ăn

### Phase 2: Enhancement (Tháng 3-4)
**Mục tiêu:** Thêm tính năng AI và cải thiện UX

- [x] Tích hợp công nghệ nhận diện hình ảnh
- [x] Gợi ý lộ trình dinh dưỡng cá nhân hóa
- [x] Dashboard nâng cao với biểu đồ chi tiết
- [x] Tính năng thay thế món ăn gợi ý

**Deliverable:**
- Chức năng chụp ảnh và nhận diện hình ảnh 
- Kế hoạch ăn uống được cá nhân hóa
- Biểu đồ chi tiết theo ngày/tuần/tháng

### Phase 3: Admin & Scaling (Tháng 5-6)
**Mục tiêu:** Hoàn thiện chức năng quản trị và chuẩn bị scale

- [x] Dashboard Admin đầy đủ
- [x] Lịch sử hoạt động và audit log
- [x] Chức năng tìm kiếm/lọc nâng cao
- [x] Tối ưu hóa hiệu năng cho 100K+ users

**Deliverable:**
- Trang Admin đầy đủ chức năng
- Báo cáo phân tích dữ liệu
- Cơ sở hạ tầng có khả năng scale

### Phase 4: Advanced Features (Tháng 7-8)
**Mục tiêu:** Thêm các tính năng nâng cao

- [x] Tích hợp với smartwatch/fitness tracker
- [x] Đề xuất các bài tập thể thao dựa trên BMI
- [x] Community/Social features (chia sẻ tiến độ)
- [x] Notification thông minh

**Deliverable:**
- Tính năng tích hợp với các thiết bị khác
- Hệ thống notification cá nhân hóa
- Community features

---

## 6. Người dùng Hệ thống (System Users)

### 6.1 End User - Người dùng cuối
**Mô tả:** Những người muốn quản lý chế độ ăn uống và đạt mục tiêu cân nặng

**Đặc điểm:**
- Độ tuổi: 18-65 tuổi
- Có mục tiêu giảm/tăng cân cụ thể
- Sử dụng smartphone hàng ngày
- Mong muốn có sự hỗ trợ để theo dõi tiến độ

**Nhu cầu chính:**
- Dễ dàng ghi nhận thông tin ăn uống (nhận diện hình ảnh)
- Nhận được khuyến nghị cá nhân hóa
- Hiểu rõ tiến độ của mình qua visualize dữ liệu
- Linh hoạt điều chỉnh kế hoạch ăn uống

### 6.2 Admin - Quản trị viên
**Mô tả:** Những người quản lý hệ thống và giám sát người dùng

**Đặc điểm:**
- Nhân viên từ công ty hoặc team phát triển
- Có kỹ năng sử dụng máy tính cao
- Cần hiểu rõ các số liệu thống kê

**Nhu cầu chính:**
- Quản lý tài khoản người dùng hiệu quả
- Phát hiện các hành vi bất thường
- Theo dõi sức khỏe hệ thống
- Phân tích dữ liệu người dùng

### 6.3 Dietitian/Chuyên gia dinh dưỡng (trong tương lai)
**Mô tả:** Chuyên gia dinh dưỡng có thể tư vấn người dùng

**Đặc điểm:**
- Có chứng chỉ chuyên môn về dinh dưỡng
- Sử dụng ứng dụng để theo dõi các client

**Nhu cầu chính (Phase 4+):**
- Xem được tiến độ của client
- Tạo kế hoạch ăn uống tùy chỉnh
- Nhận thông báo từ client

---

## 7. User Stories

### Cho End User:

**US-1: Tạo tài khoản và nhập thông tin cá nhân**
- **Vai trò:** Người dùng mới
- **Mục tiêu:** Tạo tài khoản và nhập thông tin cá nhân để bắt đầu sử dụng ứng dụng
- **Tiêu chí chấp nhận:**
  - Có thể đăng ký tài khoản với email/số điện thoại
  - Nhập đầy đủ thông tin: họ tên, ngày sinh, cân nặng, chiều cao, giới tính, cường độ tập luyện, mục tiêu cân nặng
  - Hệ thống tính toán và hiển thị chỉ số BMI hiện tại
  - Dữ liệu được lưu trữ an toàn

**US-2: Nhận kế hoạch dinh dưỡng được cá nhân hóa**
- **Vai trò:** Người dùng đã tạo tài khoản
- **Mục tiêu:** Nhận được kế hoạch ăn uống phù hợp với mục tiêu và BMI của mình
- **Tiêu chí chấp nhận:**
  - Kế hoạch được tạo dựa trên BMI và mục tiêu cân nặng
  - Có thể chọn khung thời gian (ngày/tuần/tháng/năm)
  - Có thể thay thế các món ăn gợi ý bằng các món khác có calo tương tự

**US-3: Ghi nhận bữa ăn bằng nhận diện hình ảnh**
- **Vai trò:** Người dùng
- **Mục tiêu:** Nhanh chóng ghi nhận bữa ăn bằng cách chụp ảnh thay vì nhập liệu thủ công
- **Tiêu chí chấp nhận:**
  - Có thể chụp ảnh hoặc chọn từ thư viện
  - Hệ thống nhận diện tên món ăn và thành phần
  - Hiển thị ước tính calo tổng cộng
  - Có thể chỉnh sửa kết quả nhận diện nếu cần thiết

**US-4: Xem Dashboard tiến độ**
- **Vai trò:** Người dùng
- **Mục tiêu:** Theo dõi tiến độ giảm/tăng cân và mức calo tiêu thụ qua các biểu đồ trực quan
- **Tiêu chí chấp nhận:**
  - Dashboard hiển thị tổng calo tiêu thụ trong ngày
  - Hiển thị mức chênh lệch so với mục tiêu
  - Biểu đồ xu hướng cân nặng theo ngày/tuần/tháng
  - Tiến độ đạt mục tiêu cân nặng dưới dạng progress bar
  - Dữ liệu cập nhật real-time

**US-5: Cập nhật cân nặng hàng ngày**
- **Vai trò:** Người dùng
- **Mục tiêu:** Ghi nhận cân nặng hàng ngày để theo dõi tiến độ
- **Tiêu chí chấp nhận:**
  - Có thể cập nhật cân nặng một lần hoặc nhiều lần trong ngày
  - Hệ thống lưu trữ lịch sử thay đổi cân nặng
  - Hiển thị xu hướng thay đổi

**US-6: Nhập liệu thủ công cho bữa ăn**
- **Vai trò:** Người dùng
- **Mục tiêu:** Nhập thủ công thông tin bữa ăn khi không thể sử dụng nhận diện hình ảnh
- **Tiêu chí chấp nhận:**
  - Có thể tìm kiếm và thêm các món ăn từ danh sách
  - Có thể nhập thủ công tên món ăn, khẩu phần
  - Hệ thống hiển thị ước tính calo
  - Có thể xem lịch sử bữa ăn

### Cho Admin:

**US-7: Xem danh sách người dùng**
- **Vai trò:** Admin
- **Mục tiêu:** Xem danh sách tất cả người dùng trong hệ thống
- **Tiêu chí chấp nhận:**
  - Hiển thị danh sách đầy đủ với thông tin: tên, email, giới tính, tuổi, trạng thái, mục tiêu cân nặng
  - Có thể tìm kiếm theo tên, email, trạng thái, mục tiêu
  - Có thể phân trang hoặc load more

**US-8: Quản lý tài khoản người dùng**
- **Vai trò:** Admin
- **Mục tiêu:** Tạo, chỉnh sửa, khóa/mở khóa tài khoản người dùng
- **Tiêu chí chấp nhận:**
  - Có thể tạo tài khoản mới
  - Có thể chỉnh sửa thông tin cá nhân người dùng
  - Có thể khóa/mở khóa tài khoản
  - Các hành động được ghi lại lịch sử

**US-9: Xem lịch sử hoạt động người dùng**
- **Vai trò:** Admin
- **Mục tiêu:** Theo dõi lịch sử hoạt động của người dùng để phát hiện các hành vi bất thường
- **Tiêu chí chấp nhận:**
  - Xem thời gian đăng nhập
  - Xem lịch sử cập nhật thông tin
  - Xem lịch sử thay đổi cân nặng
  - Xem lịch sử ghi nhận dinh dưỡng
  - Có thể lọc theo ngày, loại hoạt động

---

## 8. Feature Requirements (Yêu cầu Tính năng Chi tiết)

### 8.1 Authentication & User Profile Management

| Yêu cầu | Mô tả | Ưu tiên | Ước lượng |
|---------|-------|--------|---------|
| Đăng ký tài khoản | Người dùng có thể tạo tài khoản bằng email/điện thoại | High | 3 days |
| Đăng nhập/Đăng xuất | Hỗ trợ email-password, social login (Google, Facebook) | High | 2 days |
| Quên mật khẩu | Reset mật khẩu qua email | High | 1 day |
| Hồ sơ người dùng | Chỉnh sửa thông tin cá nhân, avatar | Medium | 2 days |
| Xác thực hai yếu tố (2FA) | Tùy chọn bảo mật cao hơn | Low | 3 days |

### 8.2 BMI Calculation & Initial Setup

| Yêu cầu | Mô tả | Ưu tiên | Ước lượng |
|---------|-------|--------|---------|
| Nhập thông tin cơ bản | Họ tên, ngày sinh, giới tính | High | 1 day |
| Nhập cân nặng & chiều cao | Hỗ trợ kg/pound, cm/feet | High | 1 day |
| Lựa chọn cường độ tập luyện | 3 mức: thấp/bình thường/cao | High | 1 day |
| Lựa chọn mục tiêu | Giảm/tăng cân, mức cân nặng mục tiêu | High | 1 day |
| Tính toán BMI | Công thức: cân nặng/(chiều cao)² | High | 1 day |
| Hiển thị kết quả BMI | Phân loại: Thiếu cân/Bình thường/Thừa cân/Béo phì | High | 1 day |

### 8.3 Nutrition Recommendation Engine

| Yêu cầu | Mô tả | Ưu tiên | Ước lượng |
|---------|-------|--------|---------|
| Tạo kế hoạch ăn uống | Dựa trên BMI, cường độ tập luyện, mục tiêu | High | 5 days |
| Đề xuất thực đơn | Danh sách các bữa ăn hàng ngày | High | 4 days |
| Tính TDEE (Total Daily Energy Expenditure) | Tính lượng calo cần thiết hàng ngày | High | 2 days |
| Điều chỉnh lượng calo mục tiêu | Dựa trên mục tiêu (giảm/tăng) | High | 2 days |
| Các khung thời gian kế hoạch | Ngày/tuần/tháng/năm | Medium | 2 days |
| Thay thế món ăn | Tìm kiếm thay thế với calo tương tự | Medium | 3 days |

### 8.4 Food Recognition & Calorie Analysis

| Yêu cầu | Mô tả | Ưu tiên | Ước lượng |
|---------|-------|--------|---------|
| Camera chụp ảnh | Chụp ảnh từ camera hoặc thư viện | High | 2 days |
| Nhận diện hình ảnh | Sử dụng AI để xác định tên và thành phần | High | 7 days |
| Cơ sở dữ liệu thực phẩm | Database chứa thông tin calo của các thực phẩm | High | 5 days |
| Tính toán calo | Ước tính calo dựa trên thành phần nhận diện | High | 3 days |
| Hiệu chỉnh kết quả | Người dùng có thể chỉnh sửa kết quả nhận diện | High | 2 days |
| Nhập liệu thủ công | Tìm kiếm và thêm thực phẩm từ database | High | 3 days |
| Lịch sử bữa ăn | Lưu trữ và hiển thị lịch sử bữa ăn | High | 2 days |
| Macro nutrients tracking | Theo dõi protein, carbs, fat | Medium | 3 days |

### 8.5 Dashboard & Progress Tracking

| Yêu cầu | Mô tả | Ưu tiên | Ước lượng |
|---------|-------|--------|---------|
| Hiển thị tổng calo hôm nay | Dashboard chính hiển thị calo tiêu thụ | High | 2 days |
| Biểu đồ xu hướng cân nặng | Biểu đồ line theo ngày/tuần/tháng | High | 3 days |
| Biểu đồ calo tiêu thụ | Biểu đồ so sánh calo tiêu thụ vs mục tiêu | High | 3 days |
| Progress bar mục tiêu | Hiển thị tiến độ đạt mục tiêu cân nặng | High | 1 day |
| Mức chênh lệch vs mục tiêu | Hiển thị lượng calo dư/thiếu | High | 1 day |
| Thông báo nhắc nhở | Thông báo ăn đủ/không quá calo | Medium | 2 days |
| Xu hướng cân nặng | Phân tích xu hướng tăng/giảm/ổn định | Low | 2 days |
| Export báo cáo | Xuất báo cáo định kỳ (tuần/tháng) | Low | 2 days |

### 8.6 Admin Management

| Yêu cầu | Mô tả | Ưu tiên | Ước lượng |
|---------|-------|--------|---------|
| Danh sách người dùng | Hiển thị tất cả người dùng với phân trang | High | 2 days |
| Tìm kiếm & lọc | Tìm theo tên, email, trạng thái, mục tiêu | High | 2 days |
| Tạo tài khoản người dùng | Admin có thể tạo tài khoản cho người dùng | High | 1 day |
| Chỉnh sửa thông tin người dùng | Chỉnh sửa thông tin cá nhân người dùng | High | 1 day |
| Khóa/mở khóa tài khoản | Vô hiệu hóa tài khoản có hành vi bất thường | High | 1 day |
| Xem lịch sử hoạt động | Theo dõi login, cập nhật, thay đổi cân nặng | High | 3 days |
| Xóa tài khoản | Xóa tài khoản cùng dữ liệu liên quan | High | 1 day |
| Báo cáo phân tích | Thống kê về DAU, MAU, mục tiêu đạt được | Medium | 4 days |
| Audit log | Ghi lại tất cả hành động của Admin | High | 2 days |

### 8.7 Data Storage & Privacy

| Yêu cầu | Mô tả | Ưu tiên | Ước lượng |
|---------|-------|--------|---------|
| Mã hóa mật khẩu | Sử dụng bcrypt hoặc PBKDF2 | High | 1 day |
| Bảo mật dữ liệu cá nhân | Tuân thủ GDPR, CCPA | High | 3 days |
| Backup dữ liệu | Sao lưu hàng ngày | High | 2 days |
| HTTPS/SSL | Tất cả giao tiếp sử dụng HTTPS | High | 1 day |

---

## 9. Assumptions & Constraints

### Giả định:
1. Người dùng sẽ cập nhật thông tin cân nặng hàng ngày hoặc vài lần mỗi tuần
2. Nhận diện hình ảnh sẽ có độ chính xác ≥85% cho các món ăn phổ biến
3. Người dùng chủ yếu sử dụng ứng dụng trên smartphone
4. Có đủ server resources để hỗ trợ 100K+ users

### Ràng buộc:
1. Phải tuân thủ quy định bảo vệ dữ liệu cá nhân (GDPR, CCPA)
2. Thời gian phản hồi API < 2 giây
3. Ứng dụng phải hỗ trợ iOS 13+ và Android 8+
4. Cơ sở dữ liệu thực phẩm phải được cập nhật thường xuyên
