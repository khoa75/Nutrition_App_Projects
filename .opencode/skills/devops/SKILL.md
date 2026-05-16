---
name: devops
description: Docker Compose setup, CI/CD pipelines, infrastructure scaling, monitoring, and backup strategies
license: Apache-2.0
compatibility: opencode
---
## 1. Services & Ports
| Service | Port | Docker Image Base |
|---------|------|-------------------|
| Spring Boot Backend | 8080 | eclipse-temurin:21-jdk |
| FastAPI AI Service | 8000 | python:3.12-slim |
| Flutter Mobile | — | Build only (no container) |
| React Admin | 3000 | node:20-alpine (build stage) |

## 2. Docker Compose (Local Dev)
```yaml
services:
  backend:
    build: ./backend
    ports: ["8080:8080"]
    depends_on: [mongodb, ai-service]
  ai-service:
    build: ./ai-service
    ports: ["8000:8000"]
  mongodb:
    image: mongo:7
    ports: ["27017:27017"]
```
FastAPI is NOT exposed to the internet — accessed only via backend internal network.

## 3. CI/CD Pipeline (GitHub Actions)
```
Workflows:
├── backend-ci.yml       # Build, test, lint on PR to main
├── ai-service-ci.yml    # pytest, lint (ruff), build
├── flutter-ci.yml       # analyze, test, build APK
├── react-ci.yml         # lint, test, build
├── deploy-staging.yml   # Deploy all services to staging
└── deploy-prod.yml      # Deploy with manual approval gate
```

## 4. Infrastructure (Initial: Single VPS → Scale: AWS/GCP)
- **Phase 1**: Single VPS (Docker Compose, 2GB RAM, 2 CPU)
- **Phase 2**: AWS ECS or GCP Cloud Run (containerized, auto-scale)
- **Phase 3**: MongoDB Atlas (dedicated cluster), Redis (caching)

## 5. Monitoring Stack
- Backend: Spring Boot Actuator + /health endpoint
- AI Service: Prometheus metrics on /metrics
- Logging: Centralized via `docker logs` → later ELK/Fluentd
- Uptime target: ≥ 99.5% (max ~3.5h downtime/month)

## 6. Backup Strategy
- MongoDB Atlas automated snapshots (daily, 7-day retention)
- File uploads (food images) stored in S3/Cloudinary, not in container
- Configuration in `.env` files / GitHub Secrets (never in code)

## 7. Implementation Prompts
These steps guide the automated implementation of CI/CD:
- [Step 1: Backend & AI CI](file:///home/khoa/Projects/Nutrition_App/Nutrition_App_Projects/.opencode/skills/devops/github-actions-prompts/step_1_ci_backend_ai.md)
- [Step 2: Frontend CI](file:///home/khoa/Projects/Nutrition_App/Nutrition_App_Projects/.opencode/skills/devops/github-actions-prompts/step_2_ci_frontend.md)
- [Step 3: CD & Deployment](file:///home/khoa/Projects/Nutrition_App/Nutrition_App_Projects/.opencode/skills/devops/github-actions-prompts/step_3_cd_deployment.md)

## 8. Cách làm việc theo Workflows (Workflow Practices)
- **Tự động hóa hoàn toàn (Full Automation):** Mọi thay đổi mã nguồn đẩy lên các nhánh chính hoặc tạo Pull Request đều phải kích hoạt pipeline kiểm tra tự động (Lint, Test, Build).
- **Phân tách môi trường (Environment Separation):**
  - Nhánh `feature-*`: Chỉ chạy CI (Build, Test) để phát hiện lỗi sớm.
  - Nhánh `staging` (hoặc pre-prod): Chạy CI và tự động deploy (CD) lên môi trường staging để test tích hợp.
  - Nhánh `main`: Yêu cầu duyệt thủ công (Manual Approval Gate) trước khi thực hiện deploy (CD) lên Production.
- **Fail-Fast (Phát hiện lỗi sớm):** Pipeline sẽ tự động dừng nếu bất kỳ bước nào (ví dụ test coverage < 80%) thất bại, ngăn chặn code lỗi đi tiếp.
- **Quản lý Secrets an toàn:** Không lưu trữ API Keys, mật khẩu trong file YAML. Mọi thông tin nhạy cảm phải được truyền qua GitHub Secrets hoặc môi trường bảo mật tương đương.
- **Yêu cầu Commit thường xuyên:** Bất cứ khi nào có thay đổi trên codebase, dù là nhỏ nhất (fix bug nhỏ, thêm docs, format code...), người phát triển (hoặc AI Agent) phải luôn chủ động hỏi: *"Có muốn tạo commit cho thay đổi này không?"* trước khi chuyển sang tác vụ khác.

**Last Updated**: May 2026 | **Status**: Infrastructure Ready for Phase 1
