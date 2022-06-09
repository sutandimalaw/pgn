const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
    { 
        date: { type: String, required: true},
        credit: {type: String, required: true},
        amount: { type: Number, required: true },    
    },
    { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);