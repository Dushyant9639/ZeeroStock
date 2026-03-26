let mongoose = require("mongoose");
let connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB")
  } catch (err) {
    console.log("Error in connecting with DB", err.message);
  }
};

module.exports = connectDB
