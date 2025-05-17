# 🏫 AgentDesk Task API

##### An MERN Stack based Task Management API where an Admin can assign tasks to agents, upload tasks via CSV, and automatically distribute tasks (5 per agent). Agents can view their assigned tasks via their dashboard panel. Admin login is secured using email and password.
---

## 🚀 Features

- Admin Authentication Panel
- Agent Dashboard Panel
- Task Assignment
- Upload task list via CSV
- View which agent has which tasks

---

## 🛠️ Technologies Used

- **Backend: Node.js, Express.js**
- **Database: MongoDB (Mongoose)**
- **Authentication: JWT, bcrypt, cookie-based auth** 
- **File Uploads: Multer for CSV parsing** 
- **Frontend: React (Vite)** 

---

## 🧑‍💻 Setup

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/manthandhrana/agentDesk.git
   cd agentDesk
   ```

2. **Install dependencies:**
    ```bash
   cd backend
   npm install
   ```
---

3. **Setup .env file**
    - In the root backend directory of your project, create a .env file and add the following details:

    ```
    MONGO_URI=YOUR_DB_NAME
    JWT_SECRET=JWT_SECRET_KEY
    PORT=5000
    CORS_URL=FRONTEND_URL
    ```

4. **start the backend server**
    ```
    node server.js
    ```

5. **setting up frontend**
    ```
    cd frontend
    npm install
    ```

6. **setting up frontend .env file**
    ```
    VITE_API_URL=YOUR_BACKEND_URL
    ```
7. **start the frontend server**
    ```
    npm run dev or bun dev
    ```

## How AgentDesk Look Like

#### Home Page :
![image](https://github.com/user-attachments/assets/8aeed661-5226-4159-9f29-8c4e6c0cbcc5)

#### Admin Login Page :
![image](https://github.com/user-attachments/assets/ecf9a204-9758-4f1c-ad70-783fb953708c)

#### Admin Dashboard :
![image](https://github.com/user-attachments/assets/6e11d4fc-ab01-455c-90a2-67b8bdd89843)
![image](https://github.com/user-attachments/assets/9df88de8-8b90-4af9-ade7-a382adc22687)

#### Agent Login :
![image](https://github.com/user-attachments/assets/26a0f90f-ecd8-4d39-b3a8-f83e18087d06)

#### Agent Dashboard :
![image](https://github.com/user-attachments/assets/f8be1fec-f368-48e3-94da-9f9367a77eee)
