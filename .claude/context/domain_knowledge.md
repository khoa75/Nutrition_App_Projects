# Kiến Thức Chuyên Môn (Domain Knowledge)

Tài liệu này tổng hợp các khái niệm, công thức và logic nghiệp vụ liên quan đến y tế và dinh dưỡng được sử dụng xuyên suốt trong hệ thống **Nutrition App**.

## 1. Chỉ số BMI (Body Mass Index)
BMI là chỉ số khối cơ thể, được sử dụng để đánh giá tình trạng phân bố khối lượng của một người.

- **Công thức tính:** `BMI = Cân nặng (kg) / [Chiều cao (m)]²`
- **Phân loại (theo chuẩn chung):**
  - `< 18.5`: Thiếu cân (Underweight)
  - `18.5 - 24.9`: Bình thường (Normal weight)
  - `25 - 29.9`: Thừa cân (Overweight)
  - `≥ 30`: Béo phì (Obese)

## 2. BMR & TDEE
Đây là hai chỉ số quan trọng nhất để hệ thống quyết định lượng calo mục tiêu mỗi ngày của người dùng.

### BMR (Basal Metabolic Rate - Tỷ lệ trao đổi chất cơ bản)
Là lượng calo tối thiểu cơ thể cần để duy trì các chức năng sống cơ bản khi nghỉ ngơi. Hệ thống sử dụng công thức **Mifflin-St Jeor** (chính xác hơn Harris-Benedict):
- **Nam:** `BMR = (10 × cân nặng) + (6.25 × chiều cao) - (5 × tuổi) + 5`
- **Nữ:** `BMR = (10 × cân nặng) + (6.25 × chiều cao) - (5 × tuổi) - 161`
*(Trong đó: Cân nặng tính bằng kg, Chiều cao tính bằng cm, Tuổi tính bằng năm).*

### TDEE (Total Daily Energy Expenditure - Tổng năng lượng tiêu hao mỗi ngày)
Là tổng lượng calo cơ thể đốt cháy trong 1 ngày, bao gồm cả BMR và các hoạt động thể chất.
- **Công thức:** `TDEE = BMR × Activity Level Factor`
- **Hệ số hoạt động (Activity Level Factor):**
  - *Thấp (Ít vận động):* 1.2
  - *Bình thường (Vận động nhẹ/vừa):* 1.55
  - *Cao (Vận động nặng/chơi thể thao):* 1.9

## 3. Xác Định Mục Tiêu Năng Lượng (Target Calories)
Dựa vào TDEE và mục tiêu của người dùng:
- **Giảm cân (Weight Loss):** Mục tiêu calo = `TDEE - (khoảng 300 đến 500 calo)`.
- **Tăng cân (Weight Gain):** Mục tiêu calo = `TDEE + (khoảng 300 đến 500 calo)`.
- **Giữ cân (Maintain Weight):** Mục tiêu calo = `TDEE`.

## 4. Dinh Dưỡng Vĩ Mô (Macronutrients)
Ngoài việc đếm tổng calo, hệ thống cần phân tích 3 thành phần đa lượng chính từ thức ăn:
1. **Protein (Chất đạm):** Quan trọng cho việc duy trì và xây dựng cơ bắp (1 gram protein = 4 calo).
2. **Carbohydrates (Chất bột đường):** Nguồn năng lượng chính (1 gram carb = 4 calo).
3. **Fat (Chất béo):** Quan trọng cho hormone và hấp thụ vitamin (1 gram fat = 9 calo).

*Tỷ lệ Macro tham khảo (tùy chỉnh theo mục tiêu)*: Thông thường là 30% Protein / 40% Carbs / 30% Fat.

## 5. Nhận Diện Hình Ảnh Món Ăn (Food Image Recognition)
- **Logic:** Hình ảnh tải lên sẽ được nén, gửi qua API nhận diện (PyTorch/FastAPI).
- **Kết quả:** Trả về danh sách dự đoán các thành phần món ăn, kèm độ tự tin (Confidence Score). Nếu độ tự tin thấp (< 85%), ứng dụng sẽ yêu cầu người dùng xác nhận hoặc nhập liệu thủ công.
