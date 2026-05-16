# MCP Plugins Configuration

This directory contains the configurations for the **Model Context Protocol (MCP)** Servers used to extend the AI's capabilities in the Nutrition App project.

## 1. MongoDB MCP
- **Purpose**: Allows AI to connect directly to the `nutrition_db` database to check schema structures, query food information, manage user logs, or automatically generate mock data (seed data) for testing.
- **Configuration**: Change the connection string (URI) in the `mcp_servers.json` file to match your local or MongoDB Atlas connection configuration.

## 2. GitHub MCP
- **Purpose**: Supports AI in reading documentation from the code repository, analyzing Issues, creating Pull Requests, and monitoring CI/CD pipeline results (GitHub Actions).
- **Requirement**: You need to create a Personal Access Token on GitHub and fill it in the `GITHUB_PERSONAL_ACCESS_TOKEN` variable.

## 3. Web Search MCP (Brave Search)
- **Purpose**: Allows AI to proactively search for the latest information and documentation on the internet. Extremely useful for searching for the latest Flutter packages, React libraries, or looking up external nutritional databases.
- **Requirement**: You need to create an API Key from [Brave Search](https://brave.com/search/api/) and fill it in the `BRAVE_API_KEY` variable.

## 4. Docker MCP
- **Purpose**: Interacts with and manages the lifecycle of Docker containers. Enables AI to view status, monitor error logs, and restart Backend (Spring Boot) and AI Service (FastAPI) containers without manual command-line intervention.

## 5. Cloudinary MCP
- **Purpose**: Supports direct communication with the Cloudinary image storage service. AI can help upload sample images to test recognition features, review saved images, and automatically generate presigned URLs.
- **Requirement**: You need to obtain the `CLOUDINARY_URL` from your Cloudinary account Dashboard.

## 6. Postman MCP
- **Purpose**: Supports AI in executing and testing Backend (Spring Boot) and AI Service (FastAPI) APIs directly. AI can help you automatically send requests, analyze responses, check JSON structures, and write test scripts via Postman Collections.
- **Requirement**: You need to create a Postman API Key from your Postman account and fill it in the `POSTMAN_API_KEY` variable.

---

### Setup Instructions
To use these plugins, copy the entire content of the `mcp_servers.json` file in this directory and paste it into the MCP configuration section of your application (e.g., Cursor Settings, Windsurf, or Claude Desktop configuration). Don't forget to fill in the corresponding API keys!
