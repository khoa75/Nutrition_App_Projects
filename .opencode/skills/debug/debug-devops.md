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
      - MONGODB_URI=mongodb://mongo:27017/nutrition
    depends_on:
      - mongo
    # Add health check for debugging
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 10s
      timeout: 5s
      retries: 5

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

```bash
# Start with verbose output
docker-compose up --build --verbose

# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f mongo

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
docker exec backend curl -v http://mongo:27017
docker exec backend curl -v http://ai-service:8000/api/v1/health

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

## 4. MongoDB Debugging

### Connection Issues
```bash
# Check MongoDB is running
docker ps | grep mongo
docker exec -it mongo mongosh --eval "db.adminCommand('ping')"

# Check database exists
docker exec -it mongo mongosh nutrition --eval "db.getCollectionNames()"

# Check indexes
docker exec -it mongo mongosh nutrition --eval "db.mealLogs.getIndexes()"

# Common issues:
# - Authentication failed: Check MONGODB_URI credentials
# - Database not found: Auto-created on first write
# - Index missing: Run ensureIndex or use @CompoundIndex
```

### Performance Issues
```bash
# Check slow queries
docker exec -it mongo mongosh nutrition --eval "
  db.currentOp({ 'secs_running': { '$gt': 2 } })
"

# Explain query plan
docker exec -it mongo mongosh nutrition --eval "
  db.mealLogs.find({ userId: 'user1' }).explain('executionStats')
"

# Check collection size
docker exec -it mongo mongosh nutrition --eval "
  db.getCollectionInfos().forEach(c => print(c.name + ': ' + db[c.name].countDocuments() + ' docs'))
"
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
- [ ] MongoDB accessible and responsive
- [ ] CI/CD workflow triggers on push/PR
- [ ] Secrets configured in GitHub
- [ ] No resource bottlenecks (`docker stats`)
- [ ] Logs show no ERROR level messages
- [ ] Health checks passing
- [ ] SSL certificates valid (if applicable)
