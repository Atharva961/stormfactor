const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Harryisagoodb$oy';

//ROUTE 1: Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a strong password').isLength({ min: 5 })
], async (req, res) => {

    //If there are errors, return Bad Request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let success = true;

    try {
        //Check whether the user with this email exists already
        let user = await Farmer.findOne({ email: req.body.email });

        console.log(user);
        if (user) {
            success = false;
            return res.status(400).json({success, error: "Sorry a user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Inserting the values in the database
        user = await Farmer.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        // .then(user=> res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error: "Please enter a unique value for email", message: err.message})})

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwt_data);

        res.json({success, authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(success,"Internal Server Error");
    }

})

//ROUTE 2: Authenticate a user using: POST "api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    //If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    let success = true;

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await Farmer.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ errors: "Please try to login with correct credentials" });
        }

        //user.password = password from database(hash of password)
        //password = password enterred by user
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, errors: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success, authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 3: Get logged in user details using: POST "api/auth/getuser". login required
router.post('/getuser',fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await Farmer.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})




module.exports = router;