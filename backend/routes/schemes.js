const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Scheme = require('../models/Scheme');
const { body, validationResult } = require('express-validator');

//ROUTE 1: FETCH DATA OF ALL SCHEMES
router.get('/fetchallschemes', async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//ROUTE 2: ADD A NEW SCHEME TO THE DATABASE
router.post('/addscheme', fetchuser, async (req, res) => {

    const { name, description, url } = req.body;
    //If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const scheme = new Scheme({
            name: name,
            description: description,
            url: url
        })

        const savedScheme = await scheme.save();

        res.json(savedScheme);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});


module.exports = router;