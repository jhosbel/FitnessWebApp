# 🍔 C-Fitness

Welcome to C-Fitness! This application is designed to help you maintain an active and healthy lifestyle. With it, you can create an account, search for exercises, create custom routines, save your routines, and organize your workouts in a calendar for better control and tracking.

## 📝 Descripción

This is a web application developed with **React using Next.js** on the front-end. Users can:

- Create an account and log in.

- Search for exercises and create custom routines.

- Save routines in their profile.

- Add routines to a calendar to plan workouts.

- Modify or delete routines as needed.

The back-end of the application was developed with **NestJS** and uses **PostgreSQL** as the database. The API is documented with **Swagger** for easier use and understanding. Authentication is handled using JWT (JSON Web Tokens).

🔗 Backend Repository: [Fitness-Backend](https://github.com/jhosbel/Fitness-Backend)

## 🖼️ Screenshots

### Home Page
<img src="public/c-fitnasshome.png" alt="Página de Inicio" width="600" height="400" />

## 🛠️ Installation

Follow these steps to install and run the project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jhosbel/FitnessWebApp.git
   cd FitnessWebApp
2. **Install front-end dependencies:**
    ```bash Copy
    npm install
3. **Set up environment variables:**
    ```bash Copy
    Create a .env file inside the frontend folder and add the following variables:

    NEXT_PUBLIC_BACKEND_URL=http://localhost:7000/api
    NEXT_PUBLIC_BACKEND_URL_SOCKET=http://localhost:7000
    NEXTAUTH_SECRET=no_hacer_publica_esta_variable
4. **Start the front-end server:**
   ```bash Copy
    npm run dev
5. **Open your browser and visit:**
    ```bash Copy
    http://localhost:3000
6. **Access the API documentation:**
    ```bash Copy
    http://localhost:7000/docs

## ⚙️ Configuration

**Environment Variables**

Make sure to configure the following environment variables in the `.env` file:

- `NEXT_PUBLIC_BACKEND_URL`: Backend URL for HTTP requests.

- `NEXT_PUBLIC_BACKEND_URL_SOCKET`: Backend URL for WebSocket connection.

- `NEXTAUTH_SECRET`: Secret key for JWT authentication. Do not share it publicly.

**Dependencies**

This application uses the following main dependencies:

- **Next.js**: React framework for server-side rendering and static site generation.

- **Tailwind CSS**: CSS framework for styling the application.

- **JWT (JSON Web Tokens)**: For user authentication.

- **WebSocket**: For real-time communication with the back-end.

## 🚀 Usage
1. **Sign Up:** Go to `/register` to create a new account.

2. **Login:** Go to `/login` to log in.

3. **Search Exercises:** Once authenticated, search for exercises on the home page.

4. **Create Routines:** Select exercises and create custom routines.

5. **Save Routines:** Store your routines in your personal profile.

6. **Training Calendar:** Add routines to a calendar to plan your workouts.

7. **Modify Routines:** Edit or delete routines as needed.

## 🛠️ Technologies Used
Front-End:
- **React:** JavaScript library for building user interfaces.

- **Next.js:** React framework for server-side rendering.

- **Tailwind CSS:** CSS framework for styling the application.

- **WebSocket:** For real-time communication with the back-end.

Authentication:
- **JWT (JSON Web Tokens):** For user authentication.

## 📂 Project Structure
    /FitnessWebApp
    ├── public
    ├── src
    │   ├── app
    │   │   ├── api
    │   │   │   ├── auth
    │   │   ├── dashboard
    │   │   ├── feeding
    │   │   ├── login
    │   │   ├── profile
    │   │   ├── register
    │   │   ├── settings
    │   │   ├── training
    │   │   ├── ui
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   ├── components
    │   │   ├── icons
    │   │   ├── Navigation.jsx
    │   │   ├── CalendarData.jsx
    │   │   ├── UsersData.jsx
    │   │   └── ...
    │   ├── context
    │   ├── interfaces
    │   ├── types
    │   ├── middleware.ts
    ├── .env
    ├── package.json
    └── README.md

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.