const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email: {type: String, unique: true}, 
    username: {type: String, unique: true}, 
    password: String
})
userSchema.virtual("url").get(function () {
    return `/accounts/${this._id}`;
})
module.exports = mongoose.model("users", userSchema);