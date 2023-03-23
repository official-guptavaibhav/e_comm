const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }= require("./verifytoken");

// Create Cart
router.post("/cart", verifyToken, async (req,res)=>{
    const newCart = new Cart(req.body)

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
})

// Update Cart
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
  
try{
    const updatedCart = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true}
    );
    res.status(200).json(updatedCart);
  }catch (err) {
    res.status(500).json(err);
  }
})


// Delete Cart
router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart Deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

// Fetching User Cart
router.get("/find/:userId", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const Cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(Cart);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router