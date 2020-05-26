const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.get("/", (req, res) => {

});

router.post("/", async (req, res) => {
    const person = new Person({
        name: req.body.name,
        RFID: req.body.RFID
    });
    try {
        const savedPost = await person.save();
        res.status(200).json(savedPost);
    } catch(err) {
        res.status(200).json({message: err})
    }

})

router.post("/authorize", async(req, res) => {
    try {
        const person = await Person.findOne({RFID: req.body.RFID});
        console.log(req.body.RFID)
        if(person !== {} && person !== null && person !== undefined) {
            res.json({authorized: true});
        }
        else {
            res.json({authorized: false});
        }
    }
    catch (err) {
        res.json({message: err})
    }
})

module.exports = router;