const mongoose = require("mongoose");

async function dbConn() {
    const dbString = "mongodb://localhost:27017/Chatapp"
    await mongoose.connect(dbString)
}

module.exports = dbConn