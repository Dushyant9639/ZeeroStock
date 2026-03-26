const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./configs/db");
require("dotenv").config();

const app = express();
let PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api", require("./routes/search"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
