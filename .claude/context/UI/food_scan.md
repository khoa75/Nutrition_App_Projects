# Màn Hình Nhận Diện Món Ăn Bằng AI (Food AI Scanner)

Màn hình này là tính năng cốt lõi tạo nên tính đột phá của ứng dụng. Giao diện cần mang đậm phong cách công nghệ (Sci-Fi, Futuristic) nhưng vẫn trực quan và dễ sử dụng.

## 1. Màn Hình Camera (Viewfinder)
Khi người dùng bấm vào "Chụp ảnh món ăn" từ Dashboard, màn hình Camera mở ra toàn màn hình.

- **Nền**: Luồng trực tiếp từ Camera điện thoại. Phủ một lớp bóng mờ (Vignette) ở các góc để hướng sự chú ý vào giữa.
- **UI Overlay**:
  - **Khung quét (Bounding Box)**: Một khung hình vuông ở giữa màn hình với 4 góc được đánh dấu bằng các vạch trắng sáng. Các vạch này di chuyển nhấp nháy nhẹ (Breathing animation) để báo hiệu AI đang hoạt động.
  - **Đường quét (Scan Line)**: Một vạch ngang màu `#10B981` (Xanh Mint) có hiệu ứng Glow (phát sáng) liên tục trượt lên xuống qua lại bên trong khung quét, giống như hiệu ứng máy quét laser.
  - **Góc trên**: Dấu `X` để đóng camera.
  - **Góc dưới**: Nút chụp hình tròn, to, màu trắng. Có nút phụ để "Chọn từ thư viện" (Gallery) bên trái và "Bật flash" bên phải.

## 2. Hiệu Ứng Xử Lý (Processing State)
Sau khi nhấn nút chụp, bức ảnh bị đóng băng.
- Một lớp layer màu đen phủ lên ảnh (`rgba(0,0,0, 0.6)`).
- Chữ "AI đang phân tích lượng Calo..." hiện lên giữa màn hình, với hiệu ứng Loading dạng vòng tròn đồng tâm liên tục mở rộng ra ngoài (Ripple effect) bằng màu Primary Green.
- Hoạt ảnh vi mô: Các con số chạy lướt nhanh (matrix style) ở nền làm tăng hiệu ứng phân tích công nghệ cao.

## 3. Modal Kết Quả Phân Tích (Bottom Sheet Result)
Sau khi API của FastAPI trả về kết quả (thường dưới 2s), một Bottom Sheet vuốt từ dưới lên.

- **Hiệu ứng xuất hiện**: Trượt mượt mà từ dưới lên (Slide Up), background của Bottom Sheet là **Glassmorphism** tối màu (`#1E293B` blur 20px).
- **Nội Dung Góc Trên Sheet**: Một thanh gạt nhỏ màu xám nhạt (Drag handle).
- **Dữ liệu AI Trả Về**:
  - **Độ chính xác (Confidence Badge)**: Ở góc phải, một tag nhỏ: "Độ tin cậy: 92% AI Match" màu xanh lá cây hoặc vàng tùy mức độ.
  - **Tên Món Ăn (Title)**: Chữ to, nổi bật (VD: "Cơm Tấm Sườn Bì").
  - **Lượng Calo Tổng (Highlight)**: Số to khổng lồ màu Gradient Xanh: "780 Kcal".
  
- **Thành Phần Dinh Dưỡng Chi Tiết (Macro Breakdown)**:
  - Bố cục lưới (Grid 3 cột).
  - Khối 1: Cột màu Đỏ, ghi "Protein", "35g".
  - Khối 2: Cột màu Cam, ghi "Carbs", "80g".
  - Khối 3: Cột màu Tím, ghi "Fats", "20g".
  - Các khối này có nền nhạt tương ứng với màu chữ, bo góc 12px.

## 4. Hành Động Xác Nhận (CTAs)
- Nút bấm chính (Call To Action): **"Thêm vào nhật ký"** (Glow Button màu Xanh Mint, to và trải ngang 100% chiều rộng).
- Link phụ ngay bên dưới: "Thông tin chưa đúng? Chỉnh sửa thủ công" (Chữ gạch chân nhỏ, màu Slate 400). Khi bấm vào, các khối dữ liệu AI phía trên sẽ biến thành ô input để người dùng nhập lại text/số.
