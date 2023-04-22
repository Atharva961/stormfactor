const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Lands = require('../models/Lands');
const { body, validationResult } = require('express-validator');

//ROUTE 1: FETCH DATA OF ALL LANDS OF A PARTICULAR USER
router.get('/fetchalllands', fetchuser, async (req, res) => {
    const notes = await Lands.find({ user: req.user.id });
    res.json(notes)
})

//ROUTE 2: Add a new Land using POST "/api/notes/addland". Login required
router.post('/addland', fetchuser, async (req, res) => {

    const { city, nitrogen, phosphorous, potassium, avg_temperature, avg_humidity, ph, rainfall } = req.body;
    //If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const land = new Lands({
            city,
            nitrogen,
            phosphorous,
            potassium,
            avg_temperature,
            avg_humidity,
            ph,
            rainfall,
            user: req.user.id
        })

        const savedLand = await land.save();

        res.json(savedLand);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.array() });
    }
});

//ROUTE 3: Update an existing land using PUT "api/land/updateland". Login required
router.put('/updateland/:id', fetchuser, async (req, res) => {

    try {
        const { city, nitrogen, phosphorous, potassium, avg_temperature, avg_humidity, ph, rainfall } = req.body;
        const land = {};
        if (city) {
            land.city = city;
        }
        if (nitrogen) {
            land.nitrogen = nitrogen;
        }
        if (phosphorous) {
            land.phosphorous = phosphorous;
        }
        if (potassium) {
            land.potassium = potassium;
        }
        if (avg_temperature) {
            land.avg_temperature = avg_temperature;
        }
        if (avg_humidity) {
            land.avg_humidity = avg_humidity;
        }
        if (ph) {
            land.ph = ph;
        }
        if (rainfall) {
            land.rainfall = rainfall;
        }


        //Find the note to be updated and update it
        let l = await Lands.findById(req.params.id);
        if (!l) {
            return res.status(404).send("Not Found");
        }

        if (l.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        l = await Lands.findByIdAndUpdate(req.params.id, { $set: land }, { new: true })
        res.json({ l });
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Error");
    }

})

router.delete('/deleteland/:id', fetchuser, [
], async (req, res) => {

    try {
        //Find the note to be deleted and delete it
        let land = await Lands.findById(req.params.id);
        if(!land)
        {
            return res.status(404).send("Not found");
        }

        if(land.user.toString() !== req.user.id)
        {
            return res.status(401).send("Not allowed");
        }

        land = await Lands.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Land has been deleted"});
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Error");
    }

})


module.exports = router;