const express = require('express')
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const app = express()
const cors = require("cors");

const Customer = require("./models/Customer")

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=> console.log("DBConnection Successfull!"))
    .catch((err)=> {
        console.log(err);
    });

// POST method route
app.use(express.json());
app.use(cors());
app.post('/', async(req, res) => {
    const newCustomer = new Customer(req.body)
   
    try{
        const savedCustomer= await newCustomer.save();
        res.status(200).json(savedCustomer);
    }catch(err){
        res.status(500).json(err);
    }

  })

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running!")
});