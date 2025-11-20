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

🔧 What needs to be initiated before running:
- Change information to the database you are connecting with db.js (local testing):
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost or your host",
  port: 5432,
  database: "finaluniversitydb",  // or your custom DB (coursedb)
  user: "postgres or your db user-name",
  password: "Change to your password",
});
