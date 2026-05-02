# Frontend Skill: Layout Patterns

Tài liệu này định nghĩa các mẫu bố cục (Layout Patterns) chuẩn trong ứng dụng ReactJS (Nutrition App) để đảm bảo tính nhất quán về giao diện và trải nghiệm.

## 1. Dashboard Layout (Web Admin & User Dashboard)
Mẫu bố cục chính cho các màn hình tổng quan, bao gồm Sidebar (trình đơn điều hướng) và Main Content (khu vực nội dung chính).

**Nguyên tắc thiết kế:**
- Cấu trúc `Grid` hoặc `Flexbox`. Sidebar cố định bên trái (15-20% chiều rộng), Main Content chiếm phần còn lại.
- **Background**: Sử dụng màu Dark Theme mặc định (`#0F172A`).
- Nếu có Header, Header phải áp dụng hiệu ứng mờ (Backdrop filter) để khi scroll nội dung bị chìm dưới Header một cách mềm mại.

## 2. Card Layout (Glassmorphism Wrapper)
Thẻ (Card) là đơn vị bố cục cơ bản nhất dùng để gom nhóm thông tin (VD: Thẻ tính Calo, Thẻ biểu đồ dinh dưỡng).

**Pattern:**
- Bọc nội dung bên trong một div áp dụng class `glass-card`.
- Padding chuẩn: `24px` cho Desktop, `16px` cho Mobile.
- Khúc viền: Bo góc `24px`.
- CSS chuẩn:
  ```css
  .glass-card {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 24px;
  }
  ```

## 3. Split-Pane Layout (View/Detail)
Dùng cho màn hình danh sách (VD: Danh sách người dùng, Lịch sử bữa ăn) và chi tiết (Detail Pane).
- Màn hình chia đôi: Nửa trái là danh sách (List), nửa phải là Chi tiết (Detail).
- Khi thu nhỏ (Mobile), danh sách chiếm 100%, khi bấm vào một item sẽ trượt sang trang chi tiết hoặc trượt một Bottom Sheet từ dưới lên.
