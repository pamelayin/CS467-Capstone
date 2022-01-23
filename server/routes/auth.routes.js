const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');

const { check, validationResult } = require('express-validator');

const Employer = require('../models/employer.models');

router.post('/', [
    check('email', 'Please enter your email').not().isEmpty(),
    check('password', 'Password is required').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    try {
        let user = await Employer.findOne({ email });
        
        if(!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        const jwtSecret = config.get('jwtSecret');
        jwt.sign(payload, jwtSecret, {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.get('/', auth, async(req, res) => {
    try {
        const user = await Employer.findById(req.user.id).select('-password');
        res.json(user);
        console.log(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
