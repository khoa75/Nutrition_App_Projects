# ── Nutrition App: Admin Dashboard (React + TypeScript + Tailwind) ──────
# Multi-stage: build with Node, serve with nginx

# ── Stage 1: Build ────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /build
COPY package.json package-lock.json* ./
RUN npm ci

COPY public/ public/
COPY src/ src/
COPY tsconfig.json vite.config.ts* ./
RUN npm run build

# ── Stage 2: Serve with nginx ─────────────────────────────────────────────
FROM nginx:alpine

COPY --from=builder /build/dist/ /usr/share/nginx/html/

# Custom nginx config: SPA routing → index.html for unknown paths
RUN echo 'server { \
    listen 3000; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://backend:8080/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
