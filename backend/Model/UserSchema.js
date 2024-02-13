const mongoose = require("mongoose")
const userSchema =new  mongoose.Schema({
    
    Name : {
        require : true,
        type : String
    },
    Email : {
        require : true,
        type : String
    },
    Password : {
        require : true,
        type : String
    },
    subscriptionStatus : {
        require : true,
        type : String
    }
})
const blogSchema = new mongoose.Schema({
    author  : {
        require  : true,
        type : String
    },
    blogName : {
        require :true,
        type : String
    },
    blogTile : {
        require :true,
        type : String
    },
    aritcle : {
        require :true,
        type : String
    },
    articleSubscriptionType : {
        require :true,
        type : String
    }
})

const blogModel = mongoose.model("blogModel",blogSchema)
const userModel = mongoose.model("userModel",userSchema)
module.exports = {userModel,blogModel}