# AI Skill: API & Integration Patterns

Tài liệu này định nghĩa các mẫu (Patterns) chuẩn khi xây dựng các Endpoints bằng **FastAPI** phục vụ cho hệ thống AI của Nutrition App. Mọi service AI đều đóng vai trò vệ tinh hỗ trợ cho Backend C# (ASP.NET Core).

## 1. RESTful Wrapper Pattern
Sử dụng FastAPI như một lớp vỏ (wrapper) cực mỏng bao bọc lấy các file xử lý Model.
- **Tách biệt Logic**: Routing (API endpoint) không được chứa logic xử lý ảnh hay Inference. Nó chỉ nhận dữ liệu, gọi Model Service và trả kết quả.
- **Request Validation**: Sử dụng Pydantic models để validate chặt chẽ mọi body json hoặc form-data đầu vào. Báo lỗi 422 Unprocessable Entity nếu sai định dạng.

## 2. File Upload Pattern
Xử lý hình ảnh gửi lên từ Client hoặc Backend chính.
- Sử dụng `UploadFile` từ FastAPI thay vì bytes thuần để giảm thiểu tràn RAM khi nhiều users upload cùng lúc.
- Chỉ đọc dữ liệu file vào bộ nhớ tại đúng hàm Inference.
- Luôn kiểm tra định dạng MIME type (chỉ nhận `image/jpeg`, `image/png`). Giới hạn dung lượng upload (ví dụ: tối đa 5MB).

## 3. Graceful Fallback & Error Pattern
Ứng dụng AI luôn có rủi ro nhận diện sai hoặc crash model.
- **Bắt lỗi toàn cục**: Bọc tất cả hàm suy luận (inference) trong khối `try...except`.
- Nếu AI không thể nhận diện được hình ảnh hoặc độ tin cậy (Confidence score) < 60%, trả về một standard Fallback Response:
  ```json
  {
    "success": true,
    "confidence": 0.0,
    "foodName": "Unknown",
    "message": "Không nhận diện được món ăn. Vui lòng nhập thủ công."
  }
  ```
- Tuyệt đối không trả về Stack Trace của Python ra ngoài API.
