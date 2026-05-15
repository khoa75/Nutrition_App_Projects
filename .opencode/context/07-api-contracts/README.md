# Mock Data & API Contracts

This directory contains JSON files representing the data structures returned from APIs.

**Purpose**:
- Helps Frontend/Mobile developers build UI immediately based on this mock data without waiting for the Backend or AI team to complete the APIs.
- Serves as a "contract" between Backend and Frontend. If the Backend changes the return structure, the corresponding JSON file here must be updated.

## Standard Backend Return Structure (JSend / REST API Standard)
The project uses a common standard format for all API responses:
```json
{
  "status": "success", // or "fail", "error"
  "data": { ... },     // Contains the main payload if successful
  "message": "..."     // Detailed message if an error occurs
}
```

*(Detailed files such as `user_profile_response.json` and `food_scan_result.json` will be added to this directory as specific features are designed)*
