const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 50,
        required: true,
    },
    emailId: {
        type: String,
        max: 50,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        max: 10,
        required: true,
        unique: true
    },
    password: {
        type: String,
        max: 50,
        required: true,
    }
})

module.exports = mongoose.model("User", userSchema)