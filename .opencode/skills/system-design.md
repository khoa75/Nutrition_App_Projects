# Skill: System Design & Architecture

General system design skills ensuring sustainability and performance.

## 1. Modular Monolith Principles
- **Loose Coupling**: Modules communicate via Interfaces, not directly depending on Implementation.
- **Transactional Boundaries**: Manage transactions within the scope of each individual module.
- **Shared Kernel**: Clearly define shared components (Utils, Security, basic DTOs) to avoid code duplication.

## 2. Scalability & Performance
- **Caching**: Use `Redis` (if scaling is needed) to store frequently computed BMI or TDEE results.
- **Asynchronous Processing**: Offload heavy tasks (such as sending emails, processing images) to background tasks.
- **Load Balancing**: Design the system to be ready for running multiple instances behind a Load Balancer.

## 3. Security Design
- **Data Encryption**: Encrypt sensitive user data (height, weight, personal information).
- **Audit Logging**: Record every important action for auditing and security purposes.
