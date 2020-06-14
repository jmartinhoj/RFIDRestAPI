const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const Event = require("../models/Event")

router.get("/", async (req, res) => {
    try {
        console.log("ayo")
        const results = await Event.find().limit(5);
        const events = results.map(async (e, k) => {
            const person = await Person.findOne({RFID: e.RFID})
            var temp = {
                granted: e.granted,
                RFID: e.RFID,
            }
            if(person !== {} && person !== null && person !== undefined) {
                temp.name = person.name
            }
            return temp;
        })
        Promise.all(events).then(eventsCompleted =>{
            const response = {
                length: eventsCompleted.length,
                events: eventsCompleted
            }
            res.status(200).json(response);
        })
        
    }
    catch(err) {
        console.log(err)
    }
});
module.exports = router;