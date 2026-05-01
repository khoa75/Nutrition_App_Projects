# Nutrition App - Development Guidelines

## Project Overview
**Nutrition App** là một ứng dụng quản lý sức khỏe toàn diện giúp người dùng quản lý chế độ ăn uống, theo dõi tiến độ giảm/tăng cân thông qua công nghệ nhận diện hình ảnh, tính toán BMI, và phân tích calo.

---

## Core Objectives
1. Giúp người dùng theo dõi chế độ ăn uống hàng ngày
2. Cung cấp khuyến nghị dinh dưỡng cá nhân hóa
3. Sử dụng AI để nhận diện và phân tích calo
4. Hỗ trợ đạt mục tiêu sức khỏe hiệu quả

---

## 5 Core Features

### 1. BMI Calculation System
- Tính toán chỉ số BMI dựa trên chiều cao, cân nặng
- Lưu trữ thông tin cá nhân người dùng
- Phân loại: Thiếu cân/Bình thường/Thừa cân/Béo phì

**Formula:** BMI = Weight(kg) / (Height(m))²

### 2. Nutrition Recommendation Engine
- Tạo kế hoạch ăn uống cá nhân hóa dựa trên BMI
- Tính TDEE (Total Daily Energy Expenditure)
- Hỗ trợ nhiều khung thời gian: ngày/tuần/tháng/năm
- Cho phép thay thế và điều chỉnh thực đơn

### 3. Food Recognition & Calorie Analysis
- **Phương thức 1:** Nhận diện hình ảnh (AI powered)
- **Phương thức 2:** Nhập liệu thủ công
- Phân tích calo cho từng thành phần
- Đánh giá mức độ phù hợp với mục tiêu

### 4. Dashboard & Progress Tracking
- Hiển thị tổng calo tiêu thụ
- Biểu đồ xu hướng cân nặng (ngày/tuần/tháng)
- Progress bar mục tiêu
- Real-time data visualization

### 5. Admin Management
- Quản lý tài khoản người dùng
- Xem danh sách & lọc người dùng
- Tạo/chỉnh sửa/khóa tài khoản
- Lịch sử hoạt động & audit log

---

## Development Roadmap

### Phase 1: MVP (Month 1-2)
**Status:** Planning
- [ ] User authentication system
- [ ] BMI calculation & storage
- [ ] Basic dashboard with calorie display
- [ ] Manual food entry
- [ ] User account management

**Deliverable:** MVP with core features working on iOS/Android

### Phase 2: AI Enhancement (Month 3-4)
**Status:** Not Started
- [ ] Image recognition integration
- [ ] Nutrition recommendation engine
- [ ] Advanced dashboard with charts
- [ ] Food substitution feature

**Deliverable:** AI-powered features & personalized recommendations

### Phase 3: Admin & Scale (Month 5-6)
**Status:** Not Started
- [ ] Complete admin dashboard
- [ ] Activity history & audit logs
- [ ] Advanced search/filter
- [ ] Performance optimization for 100K+ users

**Deliverable:** Production-ready admin panel & scalable infrastructure

### Phase 4: Advanced Features (Month 7-8)
**Status:** Not Started
- [ ] Smartwatch/fitness tracker integration
- [ ] Exercise recommendations based on BMI
- [ ] Social/Community features
- [ ] Smart notifications

**Deliverable:** Advanced integrations & community engagement

---

## Key User Personas

### 1. End User (Age 18-65)
- **Goal:** Manage diet & weight effectively
- **Needs:** Easy food logging, personalized recommendations, progress tracking
- **Pain Points:** Manual data entry, unclear progress

### 2. Admin/System Manager
- **Goal:** Manage users & system health
- **Needs:** User management tools, analytics, activity logs
- **Pain Points:** Detecting anomalies, performance monitoring

### 3. Dietitian (Future - Phase 4+)
- **Goal:** Monitor and advise clients
- **Needs:** Client progress view, custom meal plans, notifications
- **Pain Points:** Manual tracking, client compliance

---

## Success Metrics

### User Engagement
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Average meals logged per user per day
- Weekly plan completion rate

### Health Outcomes
- % users reaching weight goal in 3 months
- Average BMI change after 6 months
- User retention (1 week, 1 month, 3 months)

### System Performance
- Image recognition accuracy: >85%
- Dashboard response time: <2 seconds
- System uptime: ≥99.5%

---

## Technical Stack Recommendations

### Backend
- **Framework:** Spring
- **Database:** MongoDB
- **Authentication:** JWT
- **Password Hashing:** BCrypt
- **Image Upload:** Cloudinary / S3

### AI / ML
- **Framework:** PyTorch + FastAPI
- **Features:** Food Image Recognition, Calorie Analysis

### Frontend
- **Framework:** Flutter
- **State Management:** Provider / Riverpod / BLoC
- **UI:** Flutter Material / Cupertino
- **Charts:** fl_chart

### Admin Dashboard
- **Framework:** React
- **Admin UI:** Custom template (AdminLTE, Ant Design Pro)
- **Analytics:** D3.js or similar

### DevOps
- **Hosting:** AWS/Azure/GCP
- **Database:** MongoDB Atlas or self-hosted
- **File Storage:** Cloudinary or S3
- **CI/CD:** GitHub Actions or Jenkins

---

## User Stories Priority

### High Priority (Phase 1)
- US-1: User registration & profile setup
- US-4: View dashboard progress
- US-5: Daily weight update
- US-6: Manual food entry
- US-7: Admin user list view

### Medium Priority (Phase 2)
- US-2: Nutrition recommendations
- US-3: Image food recognition
- US-8: Admin account management

### Low Priority (Phase 3+)
- US-9: Admin activity history
- Advanced features & integrations

---

## Development Guidelines

### Code Standards
1. **Naming Conventions:**
   - Functions: camelCase
   - Classes: PascalCase
   - Constants: UPPER_SNAKE_CASE
   - Database fields: snake_case

2. **Code Organization:**
   - Separate concerns (models, controllers, routes)
   - Keep functions small and focused
   - Use meaningful variable names
   - Add JSDoc comments for complex logic

3. **Error Handling:**
   - Validate all user inputs
   - Return meaningful error messages
   - Log errors for debugging
   - Use proper HTTP status codes

4. **Security:**
   - Never store plain passwords
   - Validate JWT tokens
   - Sanitize user input
   - Use HTTPS only
   - Implement rate limiting

### Testing
- Write unit tests for critical functions
- Integration tests for API endpoints
- Mock external services (Google Vision API)
- Aim for 80%+ code coverage

### Git Workflow
1. Create feature branches: `feature/feature-name`
2. Make meaningful commits
3. Create pull requests with descriptions
4. Code review before merge
5. Delete branches after merge

---

## Common Workflows

### Adding a New Feature
1. Create feature branch
2. Implement feature following guidelines
3. Write tests
4. Create PR with description
5. Address review comments
6. Merge to main

### Fixing a Bug
1. Create bug fix branch
2. Reproduce bug with test case
3. Fix bug
4. Verify fix doesn't break existing tests
5. Create PR with bug details & fix

### Deployment
1. Ensure all tests pass
2. Update version number
3. Create release notes
4. Deploy to staging
5. Run smoke tests
6. Deploy to production

---

## Database Schema Overview

### User Collection
```
{
  _id, email, password_hash, phone,
  firstName, lastName, dateOfBirth, gender,
  weight_kg, height_cm, activityLevel,
  weightGoal (gain/loss), targetWeight,
  bmiCurrent, status (active/inactive),
  createdAt, updatedAt, lastLogin
}
```

### Meal Entry Collection
```
{
  _id, userId, date, mealType (breakfast/lunch/dinner/snack),
  foodName, quantity, unit, calories, protein, carbs, fat,
  imageUrl, isRecognized (true/false),
  createdAt
}
```

### Weight Tracking Collection
```
{
  _id, userId, date, weight_kg, notes,
  createdAt
}
```

### Admin Activity Log Collection
```
{
  _id, adminId, action (create/update/delete/lock/unlock),
  targetUserId, details, timestamp
}
```

---

## Performance Optimization Tips

1. **Database:**
   - Create indexes on frequently queried fields
   - Paginate large result sets
   - Use aggregation pipeline for complex queries

2. **API:**
   - Cache responses when appropriate
   - Compress response data
   - Implement rate limiting
   - Use CDN for static assets

3. **Frontend:**
   - Lazy load components
   - Optimize images
   - Minimize bundle size
   - Use virtual scrolling for long lists

4. **Image Recognition:**
   - Compress images before sending
   - Implement request queuing
   - Cache recognition results
   - Handle failures gracefully

---

## Important References
- PRD.md - Full product requirements
- Feature Requirements table - Specific feature details
- User Stories - User-centric requirements
- Business Context - Detailed workflows

---

## Quick Links
- **Repo:** Nutrition_App_Projects
- **Main Branch:** main
- **Documentation:** PRD.md, this file
- **Issues:** Track in GitHub Issues
- **PRs:** Require review before merge

---

## FAQ & Common Issues

**Q: How to calculate TDEE?**
A: TDEE = BMR × Activity Level Factor
- BMR uses Mifflin-St Jeor formula
- Activity levels: 1.2 (low), 1.55 (moderate), 1.9 (high)

**Q: What about timezone handling?**
A: Always store dates in UTC, convert on frontend based on user timezone

**Q: How to handle deleted users?**
A: Soft delete (mark as inactive), don't actually remove to preserve audit logs

**Q: Image recognition accuracy expectations?**
A: Target >85% for common foods, always allow manual correction

---

## Useful Commands

```bash
# Backend setup
npm install
npm run dev

# Frontend setup
npm install
npm start

# Run tests
npm test

# Lint code
npm run lint

# Deploy
npm run build
npm run deploy
```

---

**Last Updated:** May 1, 2026
**Maintained by:** Nutrition App Team
