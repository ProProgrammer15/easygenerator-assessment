# Full Stack Test Task

## Task Description
This project implements a full-stack module that allows users to sign up and sign in to the application.

## Front-End Development

### Requirements
- **Framework**: React (or Vue, but this project uses React).
- **Design**: Open to creativity; feel free to use additional modules or libraries if necessary (e.g., MUI for design).

### Sign Up Page
- Form Fields: `email`, `name`, `password`.
- Password Requirements:
  - Minimum length of 8 characters.
  - At least 1 letter, 1 number, and 1 special character.
- After a successful signup, users are redirected to the application page.

### Sign In Page
- Form Fields: `email`, `password`.

### Application Page
- Displays a message: "Welcome to the application."

## Back-End Development

### Technical Stack
- **Framework**: NestJS.
- **Database**: MongoDB.
- **Additional**: TypeScript and logging for error and request tracking.

### API Endpoints
- **Sign Up**: Endpoint to create a new user with the provided fields.
- **Sign In**: Endpoint to authenticate existing users.

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Running the Project
1. Clone the repository.
2. Navigate to the root directory of the project.
3. Run the following command to build and start the Docker containers:
   ```bash
   docker-compose up --build
   ```
4. Once the build is complete:

- The frontend will be accessible at http://localhost:3000.
- The backend will run on http://localhost:3001.

### Environment Variables

Create a .env file in backend directory to configure the environment variables.

### Docker Setup
This project is fully Dockerized. Running ```docker-compose up --build``` will set up the environment, including: 
- The frontend application.
- The backend API.
- The MongoDB database.