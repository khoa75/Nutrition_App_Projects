# AI Skill: Model Inference Patterns

Tài liệu này định nghĩa các mẫu chuẩn để quản lý vòng đời và tốc độ suy luận (Inference) của các AI Models (Sử dụng PyTorch).

## 1. Lazy Loading & Singleton Pattern
Models Machine Learning thường rất nặng (hàng trăm MB tới vài GB).
- **Tuyệt đối không load model trong mỗi request.**
- Phải tải model (Load state dict) vào RAM/VRAM đúng 1 lần duy nhất lúc khởi động FastAPI Server (vào khối `lifespan` hoặc biến global Singleton).
- Tái sử dụng (Reuse) biến model này cho mọi request API.

## 2. Async/Await Compatibility Pattern
FastAPI chạy bất đồng bộ (Asynchronous) nhưng PyTorch Inference mặc định là xử lý đồng bộ (CPU/GPU Blocking).
- Các hàm dự đoán (`model.predict()`) là tác vụ chặn luồng (blocking CPU-bound tasks).
- Phải ném các tác vụ inference nặng vào `ThreadPoolExecutor` hoặc chạy trong endpoint được định nghĩa bằng `def` (FastAPI tự đưa vào threadpool) thay vì `async def` nếu bên trong hoàn toàn là code blocking.
- Nếu định nghĩa `async def`, bắt buộc phải dùng `asyncio.to_thread()` để chạy PyTorch Inference, nếu không toàn bộ server sẽ bị treo khi đang xử lý một bức ảnh.

## 3. Thresholding Pattern (Ngưỡng chấp nhận)
- Áp dụng các mốc điểm Confidence (Độ tin cậy):
  - **> 85%**: Chấp nhận kết quả là Chính xác (Tự động điền).
  - **60% - 85%**: Đề xuất cho người dùng chọn (Top 3 gợi ý).
  - **< 60%**: Từ chối kết quả, yêu cầu người dùng tự nhập thủ công.
- Ràng buộc: *Theo đúng CLAUDE.md, mức yêu cầu lý tưởng để tự động xác nhận phải lớn hơn 80%.*
