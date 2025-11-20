🚀 SETUP
1. Web Page (Frontend User Interface)
cd cougarplanner
npm install        # check & install dependencies
npm run dev        # start Next.js (React)
Frontend runs at → http://localhost:3000

2. Backend App for Database (API Server)
cd backend
npm install        # install dependencies
npm start          # start backend server
Backend runs at → http://localhost:3001

3. JavaScript Admin SQL GUI
cd backend
cd admin
node admin-sql-server.js
Admin SQL GUI runs at → http://localhost:5050

🛠️ Database Connection Fix – Summary & Setup Instructions

(Only needed if anyone gets the same connection errors)

🔧 What Was Fixed
Problem

The Admin SQL GUI was showing "password authentication failed" because:

✅ Solution

Standardized password → "YourPassword"

Converted both files to use environment variables

Created backend/.env

Added "npm run admin" for easier startup

📁 Files Modified
✔ backend/admin/admin-sql-server.js

Added dotenv

Reads .env from parent directory

Uses:

process.env.DB_PASSWORD || "YourPassword"

✔ backend/db.js

Now uses environment variables

Uses:

process.env.DB_PASSWORD || "YourPassword"

✔ backend/package.json

Added script:

"admin": "node admin/admin-sql-server.js"

✔ backend/.env (Create This File)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finaluniversitydb
DB_USER=postgres
DB_PASSWORD=YourPassword

🚀 How to Run (With Fixes Applied)
Step 1 — Ensure .env Exists

backend/.env must contain:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=finaluniversitydb
DB_USER=postgres
DB_PASSWORD=YourPassword

Step 2 — Start Backend Server
cd backend
npm start

Step 3 — Start Admin GUI
cd backend
npm run admin
Admin GUI → http://localhost:5050
