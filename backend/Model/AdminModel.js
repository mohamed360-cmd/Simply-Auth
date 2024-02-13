const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    Email : {
        type : String,
        require : true
    },
    Password : {
        type : String,
        require  : true
    },
    LoginInTime : {
        type : Date,
        default : Date.now
    },

})
const Adminmodel = mongoose.model("Adminmodel",adminSchema)
module.exports = {Adminmodel}