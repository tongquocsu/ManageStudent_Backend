import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import schoolRoutes from "./routes/schoolRoute.js";
import classRoutes from "./routes/classRoute.js";
import studentRoutes from "./routes/studentRoute.js";
import parentRoutes from "./routes/parentRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import accountantRoutes from "./routes/accountantRoute.js";
import teacherRoutes from "./routes/teacherRoute.js";
import schoolStaffRoutes from "./routes/schoolAdministrationStaffRoute.js";
import userAccountRoutes from "./routes/userAccountRoutes.js";
import configureCloudinary from "./config/cloudinary.js";
import cloudinary from "cloudinary";

//configure env
dotenv.config();

//Database config
connectDB();
configureCloudinary();
//Rest obj
const app = express();

//middleWares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/school", schoolRoutes);
app.use("/api/v1/class", classRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/parent", parentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/accountant", accountantRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/school-staff", schoolStaffRoutes);
app.use("/api/v1/user-account", userAccountRoutes);

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

cloudinary.v2.api.ping((error, result) => {
  if (error) {
    console.log(`Connect to cloudinary fail`.bgRed.white, error.message);
  } else {
    console.log(`Connect to cloudinary success`.bgGreen.white, result);
  }
});
