# **SkillSwap Platform**

<img width="1189" height="644" alt="SkillSwap Dashboard" src="https://github.com/user-attachments/assets/091f55e6-881d-4290-a1d4-a5df11d0bd6b" />

## **Project Overview**

SkillSwap is a premium web application designed to create a collaborative skill-sharing ecosystem among university peers. Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), the platform enables users to connect, learn, and exchange skills. The application features a modern, responsive, SaaS-style UI with glassmorphism elements, making the user experience highly engaging.

---

## **Key Features**

### 🌟 **Core Functionality**
- **Premium UI/UX**: Completely redesigned with a modern aesthetic, smooth hover effects, and full mobile responsiveness.
- **Real-Time Live Chat**: Users can communicate instantly via WebSockets (`socket.io`) with auto-scrolling and room-based privacy.
- **Skill Listings & Search**: Browse available skills, view user profiles, and send direct collaboration requests.
- **Admin Dashboard**: Centralized admin controls for managing users, approving new skill listings, deleting inappropriate chats, and monitoring feedback.
- **Interactive Feedback System**: Users can rate their skill-exchange experiences using interactive star ratings.

### 🔒 **Security & Authentication**
- Secure **registration** and **login** system using **JWT (JSON Web Tokens)**.
- Password hashing for enhanced database security.

---

## **Technical Stack**

### **Frontend**
- **React.js**: For building a dynamic and interactive user interface.
- **Vanilla CSS**: Custom-built styling system (No heavy frameworks).
- **Lucide React**: Clean, modern iconography.
- **Axios**: Secure API communication with dynamic base URLs.

### **Backend**
- **Node.js** & **Express.js**: For handling server-side logic and REST APIs.
- **Socket.io**: Real-time bi-directional communication for live chat.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.

### **Database & Deployment**
- **MongoDB Atlas**: Efficient and scalable cloud database management.
- **Google Cloud Platform / AWS EC2**: Production-ready deployment.

---

## **How to Set Up Locally**

### 1. Clone the repository
```bash
git clone https://github.com/<your-repo>/SkillSwap.git
cd SkillSwap
```

### 2. Install Dependencies
You will need to install packages for both the backend and frontend separately.

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../skillswap
npm install
```

### 3. Environment Variables Setup
You need to create two `.env` files.

**Backend `.env` (inside `/backend`):**
```env
PORT=5000
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your Secret Key>
CLIENT_URL=http://localhost:3000
```

**Frontend `.env` (inside `/skillswap`):**
```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Run the Development Servers
Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd skillswap
npm start
```

Access the application at `http://localhost:3000`.

---

## **Deployment**
This project is configured to easily deploy to cloud instances like **Google VM** or **AWS EC2**. The backend dynamically accepts frontend URLs via the `CLIENT_URL` variable, ensuring secure CORS policies in production environments.

---

## **Author**
**Nadeesh Malaka**
- GitHub: [Nadeesh-Malaka](https://github.com/Nadeesh-Malaka)

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
