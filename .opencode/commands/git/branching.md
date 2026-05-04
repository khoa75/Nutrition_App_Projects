# Git Branching & Checkout

Các lệnh để quản lý các luồng phát triển độc lập.

## 1. Xem danh sách nhánh
```bash
git branch -a
```

## 2. Tạo nhánh mới và chuyển sang nhánh đó
```bash
git checkout -b feature/your-feature-name
```

## 3. Chuyển sang nhánh có sẵn
```bash
git checkout main
```

## Quy Tắc Đặt Tên Nhánh
- **Feature**: `feature/<name>`
- **Bugfix**: `bugfix/<id>`
- **Hotfix**: `hotfix/<description>`
