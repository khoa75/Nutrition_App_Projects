---
name: debug-devops
description: Docker, CI/CD, and infrastructure debugging patterns, common issues, and resolution workflows
license: Apache-2.0
compatibility: opencode
---

## 1. Debug Workflow

```
1. Identify the failing component (Docker, CI/CD, network, database)
2. Check logs for the specific service
3. Verify configuration files (docker-compose, GitHub Actions, Terraform)
4. Test connectivity between services
5. Check resource usage (CPU, memory, disk)
6. Reproduce locally, fix, verify in CI
```

## 2. Docker Debugging

### Container Won't Start
```bash
# Check container status
docker ps -a

# View logs
docker logs <container_name>
docker logs --tail 100 <container_name>

# Inspect container config
docker inspect <container_name>

# Common issues:
# - Port already in use: docker ps to find conflicting container
# - Volume mount fails: Check host path exists
# - Image not found: docker pull or docker build
```

### Docker Compose Issues
```yaml
# docker-compose.yml debug
services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - POSTGRES_URL=jdbc:postgresql://postgres:5432/nutrition_db
    depends_on:
      - postgres
    # Add health check for debugging
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 10s
      timeout: 5s
      retries: 5

  postgres:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: nutrition_db
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  pg_data:
```

```bash
# Start with verbose output
docker-compose up --build --verbose

# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f postgres

# Restart a single service
docker-compose restart backend

# Rebuild and start
docker-compose up --build -d
```

### Network Debugging
```bash
# List Docker networks
docker network ls

# Inspect network
docker network inspect nutrition_app_default

# Test connectivity between containers
docker exec backend curl -v http://postgres:5432

# Common network issues:
# - Service name not resolving: Check docker-compose service names
# - Port not accessible: Check ports mapping
# - Cross-network communication: Connect to same network
```

## 3. CI/CD Debugging (GitHub Actions)

### Workflow Won't Trigger
```yaml
# .github/workflows/ci.yml
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

# Common issues:
# - Workflow file in wrong directory: Must be .github/workflows/
# - Branch name mismatch: Check exact branch name
# - Workflow disabled: Check Actions tab in GitHub
```

### Job Fails
```bash
# View workflow runs
gh run list --limit 5

# View specific run
gh run view <run_id>

# View logs for specific job
gh run view <run_id> --log --job <job_name>

# Re-run failed jobs
gh run rerun <run_id> --failed

# Common failures:
# - Dependencies not installed: Check setup steps
# - Tests failing locally: Run same command locally
# - Secrets not set: Check repository Settings → Secrets
# - Timeout: Increase timeout-minutes
```

### Debug CI Locally
```bash
# Use act to run GitHub Actions locally
# Install: brew install act
act -j test --container-architecture linux/amd64

# Or use Docker to simulate CI environment
docker run -it --rm -v $(pwd):/workspace -w /workspace maven:3.9-eclipse-temurin-21 ./mvnw test
```

## 4. PostgreSQL Debugging

### Connection Issues
```bash
# Check PostgreSQL is running
docker ps | grep postgres
docker exec -it nutrition_postgres psql -U admin -d nutrition_db -c "SELECT 1;"

# List tables
docker exec -it nutrition_postgres psql -U admin -d nutrition_db -c "\dt"

# Check indexes
docker exec -it nutrition_postgres psql -U admin -d nutrition_db -c "\di"

# Common issues:
# - Authentication failed: Check POSTGRES_USER / POSTGRES_PASSWORD credentials
# - Database not found: Create manually or check ddl-auto setting
# - Index missing: Check JPA @Index annotations or create manually
```

### Performance Issues
```bash
# Check active queries
docker exec -it nutrition_postgres psql -U admin -d nutrition_db -c \
  "SELECT pid, state, query FROM pg_stat_activity WHERE state = 'active';"

# Explain query plan
docker exec -it nutrition_postgres psql -U admin -d nutrition_db -c \
  "EXPLAIN ANALYZE SELECT * FROM logs WHERE user_id = 1;"

# Check table sizes
docker exec -it nutrition_postgres psql -U admin -d nutrition_db -c \
  "SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) FROM pg_catalog.pg_statio_user_tables ORDER BY pg_total_relation_size(relid) DESC;"
```

## 5. Infrastructure Debugging

### Resource Usage
```bash
# Docker resource usage
docker stats

# System resource usage
top
htop
df -h
free -m

# Check for resource bottlenecks:
# - CPU > 80%: Scale horizontally or optimize queries
# - Memory > 90%: Increase limits or fix memory leaks
# - Disk > 85%: Clean up old images, logs, volumes
```

### Log Aggregation
```bash
# View all container logs
docker-compose logs -f --tail=100

# Filter by service
docker-compose logs -f backend | grep ERROR

# Export logs for analysis
docker-compose logs backend > backend-logs.txt

# Real-time log monitoring
tail -f logs/application.log | grep -E "ERROR|WARN"
```

## 6. Security Debugging

### SSL/TLS Issues
```bash
# Check certificate
openssl s_client -connect api.nutrition-app.com:443 -servername api.nutrition-app.com

# Check certificate expiry
echo | openssl s_client -connect api.nutrition-app.com:443 2>/dev/null | openssl x509 -noout -dates

# Common issues:
# - Certificate expired: Renew with Let's Encrypt
# - Wrong domain: Check SAN includes all domains
# - Chain incomplete: Include intermediate certificates
```

### Secret Management
```bash
# Check if secrets are set (GitHub)
gh secret list

# Check .env file exists and is not committed
ls -la .env
git ls-files .env  # Should return nothing

# Common issues:
# - Secret not set: Add in repository Settings → Secrets
# - Secret name mismatch: Check exact name in workflow
# - .env committed: Remove from git history immediately
```

## 7. Quick Debug Checklist

- [ ] All containers running (`docker ps`)
- [ ] Services can communicate (`docker exec curl`)
- [ ] PostgreSQL accessible and responsive
- [ ] CI/CD workflow triggers on push/PR
- [ ] Secrets configured in GitHub
- [ ] No resource bottlenecks (`docker stats`)
- [ ] Logs show no ERROR level messages
- [ ] Health checks passing
- [ ] SSL certificates valid (if applicable)
