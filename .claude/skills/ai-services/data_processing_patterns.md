# AI Skill: Data Processing Patterns

Tài liệu này định nghĩa các mẫu xử lý dữ liệu đầu vào (Ảnh) và đầu ra (Kết quả Dinh dưỡng) trước và sau khi AI can thiệp.

## 1. Image Pre-processing Pattern
Hình ảnh đầu vào luôn chứa nhiều rác và có đủ mọi kích thước.
- **Resize & Crop**: Ngay sau khi nhận ảnh từ API, sử dụng OpenCV hoặc PIL để resize và Center Crop bức ảnh về đúng kích thước đầu vào của Model (ví dụ: `224x224`).
- **Normalization**: Áp dụng chuẩn hóa theo đúng bộ Mean và STD của tập dữ liệu huấn luyện (ví dụ: ImageNet `mean=[0.485, 0.456, 0.406]`, `std=[0.229, 0.224, 0.225]`).

## 2. Mocking Pattern (Development Stage)
Trong giai đoạn đầu dự án khi chưa có Model xịn:
- Thiết lập một biến môi trường `USE_MOCK_MODEL=true`.
- Nếu kích hoạt, hàm Inference sẽ bỏ qua toàn bộ logic PyTorch và Sleep ngẫu nhiên 0.5s - 1.5s để giả lập độ trễ, sau đó trả về một kết quả JSON giả định cố định (VD: Cơm sườn, 600 Calo).
- Cho phép Backend Team và Frontend Team tiếp tục phát triển giao diện AI Scan mà không bị block bởi Model Training.

## 3. Post-processing & Enrichment Pattern
AI chỉ trả về "Tên món ăn". Tuy nhiên, Backend C# cần thêm chi tiết dinh dưỡng.
- AI Service phải nắm giữ một file ánh xạ (JSON Map) chứa các lượng Macro trung bình cho 100g của món ăn tương ứng.
- Bước Post-processing: Lấy tên món ăn Model vừa dự đoán (VD: "Pho_Bo"), tra cứu vào từ điển JSON để trích xuất lượng Calo, Protein, Carb, Fat và nén chung vào Output JSON gửi trả về cho Client.
