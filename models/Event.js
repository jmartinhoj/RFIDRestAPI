const mongoose = require("mongoose")

const EventSchema = mongoose.Schema({ 
    RFID: String,
    granted: Boolean
})

module.exports = mongoose.model("Events", EventSchema);