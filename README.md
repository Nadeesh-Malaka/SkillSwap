# **SkillSwap Platform**

## **Project Overview**

SkillSwap is a web application designed to create a collaborative skill-sharing ecosystem among users. Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), the platform enables users to connect, learn, and share skills. The development follows the **Iterative Waterfall Model** to ensure a structured workflow with constant feedback and improvements.

---

## **Features**

### **Current Features**

1. **Landing Page**:
   - Welcomes users with details about the platform, its features, and benefits.
2. **User Authentication**:
   - Secure **registration** and **login** system using **JWT (JSON Web Tokens)** for authentication.
   - Password hashing for enhanced security.
3. **Skill Listings**:
   - Users can list their skills, which are subject to admin approval before being displayed.
4. **Skill Search and Requests**:
   - Users can search for desired skills and send collaboration requests to other users.
5. **Profile Management**:
   - Users can manage their personal details and skill sessions on their profile page.

### **Planned Enhancements**

1. **Real-Time Chat**:
   - Facilitate seamless communication between users for skill discussions.
2. **Skill Matching Algorithm**:
   - Automatically match users based on their skillsets and learning goals.
3. **Session Scheduling**:
   - Enable users to book and track skill exchange sessions.
4. **Cloud Integration**:
   - Implement cloud-based infrastructure for scalability and faster performance.

---

## **Technical Stack**

### **Frontend**

- **React.js**: For building a dynamic and interactive user interface.

### **Backend**

- **Node.js** and **Express.js**: For handling server-side logic and REST APIs.

### **Database**

- **MongoDB**: Efficient and scalable database management.
- **MongoDB Compass**: Used for local development and testing.

### **Authentication and Security**

- **JWT**: Used for secure user authentication.
- **Password Hashing**: Ensures secure storage of user credentials.
- **SSL/TLS Encryption**: Protects data transmission across the network.

---

## **How to Set Up Locally**

1. Clone the repository:

- ```bash
   git clone https://github.com/<your-repo>/SkillSwap.git
   cd SkillSwap
  ```


2. Install dependencies for both client and server:

# In the root directory

- ```bash
   npm install
  ```

# In the client directory

- ```bash
   cd client
   npm install
  ```
3. Set up environment variables:

    - Create a .env file in the root directory.

# Add the following:

- ```bash
   makefile
   Copy code
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret Key>
  ```

4. Run the development server:

- ```bash
  Copy code
  npm run dev
  Access the application at http://localhost:3000.
```
