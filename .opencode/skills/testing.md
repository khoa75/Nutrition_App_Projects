# Skill: Testing & Quality Assurance

Software quality assurance skills to ensure the system operates as designed, remains stable, and is free of regression errors.

## 1. Backend & API Testing
- **Unit Testing**: Write test cases for the Service and Controller layers in Spring Boot (using JUnit 5/Mockito) and FastAPI (using PyTest).
- **Integration Testing**: Test communication flows between internal modules (Modular Monolith) and between the primary Backend and the independent AI Service.

## 2. Performance & Load Testing
- **API Response Time**: Evaluate and verify that the response time for all APIs satisfies the strict constraint of `< 2 seconds`.
- **Stress Testing**: Test the system's load-bearing capacity by simulating peak traffic equivalent to `100,000+` concurrent users.

## 3. AI Model Evaluation
- **Accuracy Metrics**: Establish an independent validation dataset to verify the accuracy of the food recognition model, ensuring it consistently achieves `≥ 85%` under real-world conditions (e.g., night photography, angled shots).
