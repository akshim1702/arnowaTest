const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const cookieparser = require("cookie-parser");
const AuthContext = require('../middleware/authContext')
require('../db/conn');
router.use(cookieparser());

const User = require('../models/userSchema')
const Message = require('../models/messageSchema')
router.get('/', (req, res) => {
    res.send("hell")
})

// router.post('/register', async (req, res) => {
//     const { name, email, phone, timeOfLogin, userType } = req.body;

//     if (!name || !email || !phone || !timeOfLogin || !userType) {
//         return res.status(422).json({ message: "plz fill all fields" })
//     }
//     try {
//         const userExist = await User.findOne({ email: email, phone: phone, name: name })
//         if (userExist) {
//             return res.status(422).json({ message: "data  fields already exist" })
//         }
//         const user = new User({ name, email, phone, timeOfLogin, userType });


//         await user.save();
//         res.status(201).json({ messsage: "data inserted" })
//     }
//     catch (err) {
//         console.log(err);
//     }
// })


router.post('/login', async (req, res) => {
    try {
        const { name, email, phone, timeOfLogin, userType } = req.body;


        if (!email || !name || !phone) {
            return res.status(400).json({ error: "please fill all fields" })
        }
        const userEmail = await User.findOne({ email: email });
        const userName = await User.findOne({ name: name });
        const userPhone = await User.findOne({ phone: parseInt(phone) });
        if (userEmail || userName || userPhone) {
            return res.status(422).json({ message: "data  fields already exist" })
        }
        const user = new User({ name, email, phone, timeOfLogin, userType });
        const token = await user.generateAuthToken();
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true
        })
        await user.save();
        res.status(201).json({ messsage: "data inserted" })
    }
    catch (err) {
        console.log(err)
    }
})



// router.post('/signin', async (req, res) => {
//     try {
//         const { email, name, phone } = req.body

//         if (!email || !name || !phone) {
//             return res.status(400).json({ error: "please fill all fields" })
//         }
//         const userLogin = await User.findOne({ email: email });

//         const isMatch = await name == userLogin.name;
//         // console.log(isMatch)
//         console.log(parseInt(phone), "hh")
//         console.log(userLogin.phone, "hhh")
//         const isMatchPhone = await parseInt(phone) == userLogin.phone;
//         console.log(isMatchPhone)
//         if (userLogin) {
//             const token = await userLogin.generateAuthToken();
//             console.log(token)
//             res.cookie("jwtoken", token, {
//                 expires: new Date(Date.now() + 600),
//                 httpOnly: true
//             })
//             if (!isMatch || !isMatchPhone) {
//                 console.log("hello")
//                 res.status(400).json({ err: "invalid" });
//             }
//             else {
//                 res.status(200).json({ message: "successfull" });
//             }
//         }
//         else {
//             // const user = new User({ name, email, phone, timeOfLogin, userType });
//             // await user.save();
//             // res.status(201).json({ messsage: "data inserted" })
//             res.status(500).json({ message: "invalid credentials" });
//         }

//     }
//     catch (err) {
//         console.log(err)
//     }
// })



router.get('/home', AuthContext, (req, res) => {
    console.log("i am about")
    res.send(req.rootUser);
})
router.get('/logout', (req, res) => {
    console.log("i am logout")
    res.clearCookie('jwtoken', { path: '/signup' })
    res.status(200).send('User Logout')
})




router.post('/message', async (req, res) => {
    try {
        const { name, message } = req.body;
        if (!name || !message) {
            return res.status(400).json({ error: "please fill all fields" })
        }
        const messageValue = new Message({ name, message });
        await messageValue.save();
        res.status(201).json({ messsage: "data inserted" })
    }
    catch (err) {
        console.log(err)
    }
})
module.exports = router;