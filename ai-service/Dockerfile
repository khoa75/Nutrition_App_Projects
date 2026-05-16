# ── Nutrition App: AI Service (FastAPI + PyTorch) ────────────────────────
# Single-stage: install deps via uv, run uvicorn

FROM python:3.12-slim

# Install uv (fast Python package installer)
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Copy dependency files first (cache layer)
COPY pyproject.toml uv.lock* ./
RUN if [ -f pyproject.toml ]; then \
        uv sync --no-dev --frozen 2>/dev/null || uv sync --no-dev; \
    fi

COPY app/ app/

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
