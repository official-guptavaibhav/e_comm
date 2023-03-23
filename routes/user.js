const router = require("express").Router();
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }= require("./verifytoken");



// Update User
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
  if(req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD).toString();
  }

  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true}
    );
    res.status(200).json(updatedUser);
  }catch (err) {
    res.status(500).json(err);
  }
})


// Delete User
router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

// Fetching User
router.get("/:id", verifyTokenAndAdmin, async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;

        res.status(200).json({ ...others });
    }catch(err){
        res.status(500).json(err)
    }
})


// Fetching All User
router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err)
    }

})   
module.exports = router
