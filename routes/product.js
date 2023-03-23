const router = require("express").Router();
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }= require("./verifytoken");

// Create Product
router.post("/create_product", verifyTokenAndAdmin, async (req,res)=>{
    const newProduct = new Product(req.body)

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

// Update Product
router.put("/:id", verifyTokenAndAdmin, async(req,res)=>{
  
try{
    const updatedProduct = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true}
    );
    res.status(200).json(updatedProduct);
  }catch (err) {
    res.status(500).json(err);
  }
})


// Delete Product
router.delete("/:id", verifyTokenAndAdmin, async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product Deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

// Fetching Product
router.get("/find/:id",  async(req,res)=>{
    try{
        const Product = await Product.findById(req.params.id)
        res.status(200).json(Product);
    }catch(err){
        res.status(500).json(err)
    }
})


// Fetching All Product
router.get("/", async(req,res)=>{
    try{
        const Products = await Product.find()
        res.status(200).json(Products);
    }catch(err){
        res.status(500).json(err)
    }

})   


module.exports = router