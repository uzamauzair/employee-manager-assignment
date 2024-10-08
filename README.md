Employee-Manager is a monorepo application built using Next.js for the frontend and NestJS for the backend, with MongoDB as the database. The project follows the Atomic Design pattern to ensure a scalable and maintainable structure.

Getting Started
* Clone the repo

Backend Setup
1. Navigate to the backend directory:
   cd backend
2. Create a .env file
  Add backend environment variables (e.g., MongoDB connection string, API keys, etc.) in the .env file.
3. Install dependencies:
  npm install
4. Start the backend server:
  npm run start:dev
5. Run backend test cases:
  npm run test

Frontend Setup

1. Navigate to the frontend directory:
  cd frontend
2. Create a .env.local file:
  Add frontend environment variables (e.g., API base URL, public keys, etc.) in the .env.local file.
3. Install dependencies:
 npm install
4. Start the frontend :
 npm run dev
5. Run frontend E2E test cases:
 npx playwright test --headed or npm run test:e2e

Repository Structure
Frontend Structure
The frontend is built with Next.js, organized according to the Atomic Design principles.
![image](https://github.com/user-attachments/assets/fafae7e0-d659-48d8-8c64-33f9968794fe)

Backend Structure
The backend is built with NestJS and organized to follow best practices for modularity and maintainability.

![image](https://github.com/user-attachments/assets/54e0f049-7fb6-4002-a21b-3527b8bf6275)

Screen Shots 
Employee List - Table View
![image](https://github.com/user-attachments/assets/163513fd-8721-4aea-aad9-b0304af1e04b)
Employee List - Grid View
![image](https://github.com/user-attachments/assets/ed9337f8-1176-400d-84a8-72eb2108ab69)
Add Employee 
![image](https://github.com/user-attachments/assets/c968cb75-5fec-44d3-9d69-8725f8c24646)
Edit Employee
![image](https://github.com/user-attachments/assets/76f3ac81-bc24-4c99-9c33-e6ce7e53d9d7)
Delete Employee
![image](https://github.com/user-attachments/assets/1cd73ebd-4a2e-4318-9df3-3f909e71babe)
Swagger Api
![image](https://github.com/user-attachments/assets/e68724b3-2f67-432d-b07a-af3ca5b4e812)



