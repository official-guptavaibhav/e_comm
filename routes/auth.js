const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// Sign up 
router.post("/signup", async(req, res)=>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        contact_number: req.body.contact_number,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD).toString(),
    });
try{
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
}catch(err){
    res.status(500).json(err);
    console.log(err);
}

});

// Sign In
router.post("/signin", async (req,res)=>{
    try{
       const user = await User.findOne({ email : req.body.email });
        !user && res.status(401).json("Wrong Email")
       const hashedPassword = CryptoJS.AES.decrypt(user.password,  process.env.PASSWORD); 
       const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.password  && res.status(401).json("Wrong Password")

        const accessToken = jwt.sign({
            id:user._id, 
            isAdmin: user.isAdmin,
        },
        process.env.JWT_KEY,
        {expiresIn:"3d"}
        );


        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router 