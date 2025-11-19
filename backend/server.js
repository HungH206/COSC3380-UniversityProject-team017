import express from "express";
import cors from "cors";
import { pool } from "./db.js";

import courseRoutes from "./routes/course.js";
import enrollmentAdd from "./routes/enrollmentAdd.js";
import enrollmentPay from "./routes/enrollmentPay.js";
import enrollmentsRoute from "./routes/enrollments.js";
import profileRoute from "./routes/profile.js";



const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/course", courseRoutes);
app.use("/api/enroll/add", enrollmentAdd);
app.use("/api/enroll/pay", enrollmentPay);
app.use("/api/enrollments", enrollmentsRoute); // Reusing enrollmentAdd for enrollments
app.use("/api/profile", profileRoute);


app.listen(3001, () =>
  console.log("Server running at http://localhost:3001")
);
