require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const noteRoutes = require("./routes/noteRoutes");


const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Smart Notes Backend Running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0",() => {
  console.log(`Server Running on 8000`);
});