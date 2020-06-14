const mongoose = require("mongoose")

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    RFID: {
        type: String,
        unique: true
    },
    authorized: {
        type: Boolean,
        required: true,
    },

})

module.exports = mongoose.model("People", PersonSchema);