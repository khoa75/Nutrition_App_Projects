# Advanced Git Commands

Các lệnh nâng cao để xử lý xung đột và quản lý trạng thái code.

## 1. Hợp nhất nhánh (Merge)
```bash
git merge <branch>
```

## 2. Cập nhật nhánh dựa trên main (Rebase)
```bash
git rebase main
```

## 3. Lưu tạm thay đổi (Stash)
```bash
git stash
git stash pop
```

## 4. Reset trạng thái code
```bash
git reset --hard HEAD
```
- **Lưu ý**: Lệnh này sẽ xóa bỏ toàn bộ thay đổi chưa commit. Hãy cẩn thận!
