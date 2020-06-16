const mongoose = require("mongoose")

const EventSchema = mongoose.Schema({ 
    RFID: String,
    granted: Boolean
}, {timestamps: true})

module.exports = mongoose.model("Events", EventSchema);