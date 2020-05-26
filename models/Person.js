const mongoose = require("mongoose")

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    RFID: String
})

module.exports = mongoose.model("People", PersonSchema);