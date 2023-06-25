import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import academicResultRoutes from "./routes/academicResultRoute.js";
import academicYearRoutes from "./routes/academicYearRoute.js";
import attendanceRoutes from "./routes/attendanceRoute.js";
import authRoutes from "./routes/authRoute.js";
import classRoutes from "./routes/classRoute.js";
import scheduleRoutes from "./routes/scheduleRoute.js";
import studentRoutes from "./routes/studentRoute.js";
import subjectRoutes from "./routes/subjectRoute.js";
import teacherRoutes from "./routes/teacherRoute.js";

//configure env
dotenv.config();

//Database config
connectDB();

//Rest obj
const app = express();

//middleWares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/class", classRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/subject", subjectRoutes);
app.use("/api/v1/schedule", scheduleRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/academicYear", academicYearRoutes);
app.use("/api/v1/academicResult", academicResultRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome!</h1>");
});

//PORT
const PORT = process.env.PORT;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
