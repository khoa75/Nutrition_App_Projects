# Skill: AI Services (FastAPI & PyTorch)

Kỹ năng chuyên sâu về việc xây dựng và triển khai các dịch vụ trí tuệ nhân tạo.

## 1. FastAPI & UV Optimization
- **UV Package Manager**: Sử dụng `uv` để quản lý dependencies, tạo virtualenv và chạy dự án (`uv run`).
- **Asynchronous Handlers**: Sử dụng `async def` để xử lý các yêu cầu I/O không chặn.
- **Dependency Injection**: Quản lý lifetime của các mô hình ML và database sessions.
- **Pydantic Models**: Sử dụng để validate dữ liệu đầu vào và đầu ra một cách nghiêm ngặt.

## 2. Machine Learning with PyTorch
- **Model Inference**: Tối ưu hóa quá trình dự đoán (inference) bằng cách sử dụng `torch.no_grad()` và chuyển mô hình sang chế độ `eval()`.
- **Image Preprocessing**: Sử dụng `torchvision.transforms` để chuẩn hóa ảnh (resize, normalize) trước khi đưa vào mô hình.
- **Confidence Scoring**: Xử lý logic ngưỡng (threshold) để đảm bảo độ chính xác của việc nhận diện món ăn > 80%.

## 3. Integration
- **Proxy Communication**: Kết nối với Spring Boot Backend thông qua RESTful API.
- **Resource Management**: Theo dõi bộ nhớ GPU/CPU để tránh rò rỉ khi tải nhiều mô hình.
