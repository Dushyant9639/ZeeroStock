let mongoose = require("mongoose")

let ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB successfully!!")
    } catch (error) {
        console.error("Error in connecting with DB", error.message)
    }
}

module.exports = ConnectDB