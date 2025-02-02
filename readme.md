Here’s your **updated README.md** with the Redis setup using Docker and adjustments for `./backend/redisClient.js`. 🚀  

---

### **📖 README.md**  
```markdown
# FAQ Management (With Translation) 📝

A **Node.js + Express.js** application to manage FAQs with multilingual support.  
It uses **MongoDB** for storage, **Redis** for caching, and a **React Dashboard** with **Quill Editor** for content management.

---

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Caching:** Redis (via Docker)
- **Frontend:** React.js (with Quill Editor)
- **Containerization:** Docker, Docker Compose
- **Linting & Testing:** ESLint, Supertest, Nodemon

---

## 📦 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/TarunNehla/FAQ-Management-with-Multi-language-Support.git
cd FAQ-Management-with-Multi-language-Support
```

### **2️⃣ Set Up Environment Variables**
Create a `.env` file inside the `backend` directory and add:

```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=redis://localhost:6379
```

> **Make sure to adjust the Redis URL in** `./backend/redisClient.js`:
```javascript
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

await redisClient.connect();
export default redisClient;
```

---

## 🛠 Running Redis (Using Docker)

Run the following command to start **Redis Stack** using Docker:

```sh
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

- Redis will run on **port 6379** (for backend connection).  
- Redis Insight UI (optional) will be available on **port 8001**.

To stop Redis:
```sh
docker stop redis-stack
```

To restart Redis:
```sh
docker start redis-stack
```

---

## 🎯 Running Backend & Frontend

### **1️⃣ Backend Setup**
```sh
cd backend
npm install
npm install --save-dev
npm install -g nodemon
npm run dev
```

### **2️⃣ Frontend Setup**
```sh
cd frontend
npm install
npm run dev
```

---

## 🐳 Running with Docker Compose

To start **backend + Redis** using `docker-compose.yml`:
```sh
docker-compose up --build
```

To stop all services:
```sh
docker-compose down
```

---

## 📡 API Endpoints

### **1️⃣ Create a New FAQ**
```http
POST http://localhost:3001/api/faqs
```
**Body:**
```json
{
  "question": "What is this project?",
  "answer": "This project manages FAQs with multilingual support."
}
```

### **2️⃣ Get All FAQs**
```http
GET http://localhost:3001/api/faqs
```

### **3️⃣ Get FAQs in a Specific Language**
```http
GET http://localhost:3001/api/faqs?lang=hi
```
```http
GET http://localhost:3001/api/faqs?lang=bn
```

---

## 🧪 Running Tests
After installing `supertest`, run:
```sh
npm test
```

---

## 🏗 Future Improvements
- ✅ Deploy to **AWS/Heroku**
- ✅ Add **Authentication**
- ✅ Implement **Pagination** for FAQs
- ✅ Enhance **Admin Dashboard UI**

---

