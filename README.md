# Pastebin-Lite

A simple **Pastebin-like web application** where users can create and share text pastes using a unique URL.  
Pastes may optionally expire based on **time (TTL)** or **view-count limit**.  
Once a constraint is triggered, the paste becomes unavailable.

This project is built using **Node.js + Express + MongoDB (Mongoose)** and deployed on **Render**.


## Live Demo

Backend Base URL:  https://pastebin-lite-nw6l.onrender.com/


##  Functional Features

### Users can:
✔ Create a text paste  
✔ Receive a shareable URL  
✔ View a paste via the shared link  
✔ Optionally set:
- Time-to-live (TTL)
- Max view count  

### A paste becomes unavailable when:
⏳ TTL expires  
or  
👁 View-count limit is reached  

(Whichever happens first.)


## Required API Routes (Implemented)

###  Health Check
**GET `/api/healthz`**

Returns:
 - json { "ok": true } 

###  Create the paste(text)
**POST `/api/pastes`**

Request json:(Example)
{
  "content": "hello world",
  "ttl_seconds": 60,
  "max_views": 5
}
Returns: unique Url & id
(example) {
  "id": "abc123",
  "url": "https://<domain>/p/abc123"
}

### Fetch a Paste (JSON)
**GET `/api/pastes/:id`**

Success Response (200)
{
  "content": "hello world",
  "remaining_views": 3,
  "expires_at": "2026-01-01T00:00:00.000Z"
}

### View a Paste (HTML)

**GET `/p/:id`**

Returns HTML containing paste content

Expired or missing → 404

Content is rendered safely (no script execution).

### Tech Stack

Node.js
Express.js
MongoDB Atlas
Mongoose
Render (deployment)

## ▶️ Running the Project Locally

### 1️⃣ Clone the repository
bash
git clone https://github.com/hixrathiee/pastebin-lite.git
cd pastebin-lite 

### Install dependencies
npm install

### Create a .env file in the project root
MONGODB_URI=<your mongodb atlas uri>
PORT=5000
TEST_MODE=0

### Start the server
npm start or npm run dev


Server runs at:
http://localhost:5000

#### Author

Built by Anjali Rathi
