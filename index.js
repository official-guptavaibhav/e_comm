const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")




// Configuiring dotenv file
dotenv.config();

// Creating Databaase connection
mongoose
    .connect(process.env.MONGO_URL)
    .then( () => console.log("Database Connected"))
    .catch((err) => console.log(err));


// Parsing JSON data 
app.use(express.json());    

// Defining Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);


// Server
app.listen(process.env.PORT || 5000, () => console.log("Backend Server is Running...."));