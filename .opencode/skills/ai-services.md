# Skill: AI Services (FastAPI & PyTorch)

Advanced skills in building and deploying artificial intelligence services.

## 1. FastAPI & UV Optimization
- **UV Package Manager**: Use `uv` for dependency management, virtualenv creation, and project execution (`uv run`).
- **Asynchronous Handlers**: Use `async def` for non-blocking I/O request handling.
- **Dependency Injection**: Manage the lifetime of ML models and database sessions.
- **Pydantic Models**: Use for strict validation of input and output data.

## 2. Machine Learning with PyTorch
- **Model Inference**: Optimize the prediction (inference) process using `torch.no_grad()` and setting models to `eval()` mode.
- **Image Preprocessing**: Use `torchvision.transforms` for image standardization (resize, normalize) before model input.
- **Confidence Scoring**: Handle threshold logic to ensure food recognition accuracy > 80%.

## 3. Integration
- **Proxy Communication**: Connect with the Spring Boot Backend via RESTful APIs.
- **Resource Management**: Monitor GPU/CPU memory to avoid leaks when loading multiple models.
