const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const urlRoutes = require("./routes/urlRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", urlRoutes);
app.use("/api/urls", urlRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
