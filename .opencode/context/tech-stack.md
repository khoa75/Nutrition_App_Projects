# Ngăn Xếp Công Nghệ (Tech Stack)

Dự án **Nutrition App** được xây dựng hoàn toàn với kiến trúc **Modular Monolith**.

## 1. Backend Core (Business Logic & API)
- **Framework:** Spring Boot (Java 17)
- **Database:** MongoDB (Sử dụng Spring Data MongoDB)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Spring Security, BCrypt (Mã hóa mật khẩu)
- **File Storage:** Cloudinary hoặc Amazon S3

## 2. AI / ML Service (Phân Tích & Nhận Diện)
- **Framework:** FastAPI (Python)
- **Package Manager:** `uv` (Nhanh và hiện đại hơn pip/poetry)
- **Machine Learning:** PyTorch
- **Chức năng chính:** Nhận diện hình ảnh món ăn, phân tích ước lượng lượng calo.

## 3. Frontend Client
### Mobile App (Dành cho End User)
- **Framework:** Flutter (Dart)
- **State Management:** Provider / Riverpod
- **UI Design:** Flutter Material & Cupertino

### Web Admin Dashboard (Dành cho Admin)
- **Framework:** React.js và Tailwind CSS
- **UI Library:** Ant Design Pro / AdminLTE

## 4. DevOps & Cấu Hình
- **Cloud Hosting:** AWS / GCP
- **Database Hosting:** MongoDB Atlas
- **CI/CD:** GitHub Actions
- **Containerization:** Docker
