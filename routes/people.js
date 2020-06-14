const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const Event = require("../models/Event")

router.get("/", async (req, res) => {
    try {
        console.log("ayo")
        const results = await Person.find();
        res.status(200).json(results);
    }
    catch(err) {
        console.log(err)
    }
});

router.post("/", async (req, res) => {
    const person = new Person({
        name: req.body.name,
        RFID: req.body.RFID,
        authorized: req.body.authorized
    });
    try {
        const savedPerson = await person.save();
        res.status(200).json(savedPerson);
    } catch(err) {
        res.status(400).json({message: err})
    }

})

router.post("/authorize", async(req, res) => {
    try {
        const person = await Person.findOne({RFID: req.body.RFID});
        console.log(req.body.RFID)
        if(person !== {} && person !== null && person !== undefined) {
            const event = new Event({
                RFID: req.body.RFID,
                granted: person.authorized
            });
            await event.save();
            res.json({authorized: person.authorized});
        }
        else {
            const event = new Event({
                RFID: req.body.RFID,
                granted: false
            });
            await event.save();
            res.json({authorized: false});
        }    
    }
    catch (err) {
        console.log(err)
        res.json({message: err})
    }
})

router.patch("/:personId", async (req, res) => {
    try {
        console.log(req.body)
        const updatedPerson = await Person.updateOne(
            { _id:req.params.personId},
            { $set: { name: req.body.name, RFID:req.body.RFID, authorized: req.body.authorized } }
        );
        res.status(200).json({updatedPerson})
    } catch(err) {
        console.log("deu merda")
        res.status(400).json({message: err});
    }
})

module.exports = router;