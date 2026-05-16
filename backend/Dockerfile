# ── Nutrition App: Backend (Spring Boot 3 + Java 21) ─────────────────────
# Multi-stage build:
#   1. Build with Maven (pom.xml + src/)
#   2. Run with minimal JRE image

# ── Stage 1: Build ────────────────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build
COPY pom.xml .
# Pre-download dependencies (cache layer, speeds up rebuilds)
RUN mvn dependency:go-offline -B

COPY src/ src/
RUN mvn package -DskipTests -B

# ── Stage 2: Runtime ──────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine

RUN addgroup -S nutrition && adduser -S nutrition -G nutrition

WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar

USER nutrition
EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
