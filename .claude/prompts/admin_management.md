# Prompt: Cụm Chức Năng Admin Management

*Sử dụng lần lượt các prompt nguyên tử dưới đây để xây dựng hệ thống Admin.*

## Bước 1: Backend - Phân quyền và Bảo mật API Admin
```text
You are an expert Spring Boot developer.
Your task is to secure the Admin endpoints.
1. Update the Spring Security configuration.
2. Ensure that any request to `/api/v1/admin/**` requires the `ADMIN` role in the JWT token.
3. Write a simple mock endpoint `GET /api/v1/admin/ping` and write a test to ensure a normal user gets 403 Forbidden.
```

## Bước 2: Backend - API Danh sách Người dùng (Pagination)
```text
You are an expert Spring Boot developer.
Your task is to build the User Management API for the Admin module.
1. Create `GET /api/v1/admin/users`.
2. Implement Pagination and Sorting using Spring Data `Pageable`.
3. IMPORTANT: Do not query the `UserRepository` directly. Call the public interface of the `user` module (e.g., `UserInternalService`) to fetch user summaries.
4. Add search parameters (by email or name) and filter parameters (by status: ACTIVE/INACTIVE).
5. Return a `Page` object containing user summaries (excluding passwords).
```

## Bước 3: Backend - API Khóa/Mở Khóa Tài khoản
```text
You are an expert Spring Boot developer.
Your task is to implement account suspension logic in the Admin module.
1. Create `PUT /api/v1/admin/users/{id}/status`.
2. Accept a body `{"status": "INACTIVE"}`.
3. IMPORTANT: Call the `UserInternalService.updateUserStatus()` from the `user` module to perform the update.
4. Add an entry to the `AdminActivityLog` collection detailing who locked the account and why.
```

## Bước 4: Frontend (React) - Khởi tạo Bố cục Admin
```text
You are an expert React developer.
Your task is to set up the Admin Dashboard layout.
1. Create a Sidebar with links: "Dashboard", "User Management", "Audit Logs".
2. Create a Header with the Admin's avatar and a Logout button.
3. Implement basic routing using `react-router-dom`.
```

## Bước 5: Frontend (React) - Bảng Dữ liệu Người dùng
```text
You are an expert React developer.
Your task is to build the User Management data table.
1. Fetch data from `/api/v1/admin/users`.
2. Display a Table with columns: ID, Name, Email, Status, Registered Date.
3. Add server-side pagination controls at the bottom of the table.
4. Add a search bar at the top that triggers an API reload with the search query.
```

## Bước 6: Frontend (React) - Chức năng Khóa Tài Khoản
```text
You are an expert React developer.
Your task is to implement the Lock/Unlock user action.
1. In the User Data Table, add an "Actions" column.
2. Add a button to Lock (if active) or Unlock (if inactive) the user.
3. Show a confirmation modal before proceeding.
4. Upon confirmation, call the PUT API and show a success Toast notification, then refresh the table.
```
