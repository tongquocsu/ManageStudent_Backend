import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import scheduleRoutes from "./routes/scheduleRoute.js"
import tuitionFeeRoutes from "./routes/tuitionFeeRoute.js"
import classRoomRoutes from "./routes/classRoomRoute.js"
import classRoutes from "./routes/classRoute.js"
import receiptRoutes from "./routes/receiptRoute.js"
import studentRecordsRoutes from "./routes/studentRecordsRoute.js"

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
app.use("/api/v1/", scheduleRoutes);
app.use("/api/v1/", tuitionFeeRoutes);
app.use("/api/v1/", classRoomRoutes);
app.use("/api/v1/", classRoutes);
app.use("/api/v1/", receiptRoutes);
app.use("/api/v1/", studentRecordsRoutes);


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
