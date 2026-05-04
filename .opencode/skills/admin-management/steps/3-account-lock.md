# Step 3: Backend - Account Lock API

You are an expert Spring Boot developer.
Your task is to implement account suspension logic in the Admin module.

1. Create `PUT /api/v1/admin/users/{id}/status`.
2. Accept a body `{"status": "INACTIVE"}`.
3. IMPORTANT: Call the `UserInternalService.updateUserStatus()` from the `user` module to perform the update.
4. Add an entry to the `AdminActivityLog` collection detailing who locked the account and why.