# 👩🏽‍🦱🛡️ Nana Care

> *Empowering Kenya’s Domestic Workers through Technology, Dignity, and Opportunity*
> ---
><img src="https://github.com/user-attachments/assets/495677f9-f24c-4a7d-ba89-6c3c4fcfe6a5" width="600" />
[LIVE nana care url HERE](https://nana-care-app-deo-siatah.vercel.app/)
---
[LIVE backend nana care url HERE](https://nana-care-app-backend-url.onrender.com)
---
[PITCH DECK NANA CAREURL HERE AND SHORT VIDEO PREVIEW](https://drive.google.com/drive/folders/1bxN-Lxx5RiZRZ5zGXwmBqjmyrxgutx6s)

---


## 📖 Table of Contents

1. [🌍 About the Project](#-about-the-project)
2. [✨ Features](#-features)
3. [🧰 Tech Stack](#-tech-stack)
4. [📸 UI Previews](#-ui-previews)
5. [🧑‍💻 Getting Started](#-getting-started)
6. [🗃️ Folder Structure](#️-folder-structure)
7. [🔐 Authentication Flow](#-authentication-flow)
8. [📝 API Overview](#-api-overview)
9. [📦 Future Improvements](#-future-improvements)
10. [📩 Contact](#-contact)

---

## 🌍 About the Project

**Nana Care** is a full-stack web platform designed to empower **domestic workers** in Kenya — including house helps (*house managers*) and mama fuas (*cleaners*) — by connecting them with trusted employers, providing access to training resources, and giving them visibility, stability, and fair working opportunities.

This project also aligns with the **United Nations Sustainable Development Goals (SDGs)**, particularly:

- ✅ **Decent Work and Economic Growth**
- ✅ **Gender Equality**
- ✅ **Reduced Inequality**

---

## ✨ Features

### 👥 User Roles
- 👩‍💼 **Worker** – Can register, create a profile, and receive reviews.
- 🧑‍💼 **Employer** – Can explore workers, view profiles, and submit reviews.
- 🛡️ **Admin** – (Planned) Will verify and approve workers.

### 🧾 Authentication & Authorization
- 🔐 JWT-based token authentication
- ✅ Role-based access control (`worker`, `employer`, `admin`)
- 🔁 Token stored in `localStorage` for session persistence

### 🔎 Explore Workers Page
- View all registered domestic workers
- Paginated list of worker cards
- Each card shows profile photo, rating, skills, and a `View Profile` button

### 🧑‍🎓 Worker Registration
- Logged-in workers can create a detailed profile
- ✅ Inputs include:
  - Name (auto-filled from user)
  - Bio
  - Skills (checkboxes)
  - Profile photo URL (image upload coming soon)

### 📝 Reviews System
- ⭐ Employers can submit reviews with:
  - Star rating (1–5)
  - Comment
  - Anonymous option
- 🧾 Reviews are displayed on worker profiles
- ⏱️ New reviews appear in real-time after submission

### 🎨 UI and Responsiveness
- 🌗 **Dark mode + Light mode** 
- 📱 Fully responsive design (mobile-first)
- 🪶 Styled using **Tailwind CSS** and **ShadCN UI components**

### 🧠 Training and Resources
- 🎓 Training sessions section fetched dynamically from backend (admin-curated)
- ⏳ Upcoming training schedules (optional feature in progress)

---

## 🧰 Tech Stack

### Frontend
- ⚛️ **React.js** (with Vite)
- 🎨 **Tailwind CSS**
- 💄 **ShadCN UI**
- 🌑 **Dark/Light Mode** support
- 🔁 **Axios** with centralized API calls

### Backend
- 🟫 **Node.js + Express**
- 🛢️ **MongoDB + Mongoose**
- 🔐 **JWT Auth**
- 📤 RESTful APIs

---
---
## 🧑‍💻 Getting Started

### 🔧 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/nana-care.git
cd nana-care
## 🧑‍💻 Getting Started

## 🧑‍💻 Getting Started

### 🔧 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/nana-care.git
cd nana-care

# Frontend
cd ../frontend
pnpm install

3. ** Create a .env file in the backend:**
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret

4. **Run both servers:**
# Backend
pnpm dev


# Frontend (in another terminal)
pnpm dev
```
```text
nana-care/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── api/
│   ├── app.jsx
│   └── assets/
|   └── lib/
```
---
 ## 🔐  Authentication Flow
  - ✅ Token generated at login/signup

  - 🛠 Stored in localStorage

  - 📥 Sent as Authorization: Bearer <token> in all protected routes

  - 🧑 Current user info stored in React state using useContext

--- 
## 📝 API Overview

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| POST   | `/api/users/register` | Register new user           |
| POST   | `/api/users/login`    | Login and receive token     |
| GET    | `/api/users/profile`  | Get current user info       |
| POST   | `/api/workers`        | Create worker profile       |
| GET    | `/api/workers`        | Get all workers             |
| GET    | `/api/workers/:id`    | Get worker by ID            |
| POST   | `/api/reviews`        | Submit review               |
| GET    | `/api/reviews/:id`    | Get reviews for worker      |
| GET    | `/api/trainings`      | Get list of training events |

---
## 📦 Future Improvements
  - ✅ Worker verification by Admin

  - 📞 Emergency hotline integration

  - 📍 Geolocation + Area filter

  - 💼 Employer ratings

  - 📱 Mobile app version

  - 🗂️ Profile categories (nanny, cook, cleaner, etc.)
---
## 📩 Contact
  - 📧 Email: deosiatah0@gmail.com
    
  - 🌐 LinkedIn: https://www.linkedin.com/in/deo-siatah-325681320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app

  - 💻 GitHub: https://github.com/Deo-Siatah
