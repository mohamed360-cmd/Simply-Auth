require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const {Adminmodel} = require("../Model/AdminModel")
const {userModel} = require("../Model/UserSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
 async function createAdmin(Email,Password){
    const password = Password
    const userName = Email
    const salt = await bcrypt.genSalt(12)
    const hashedpassword = await bcrypt.hash(password,salt)
    const addAdmin = await Adminmodel.create({
        Email : userName,
        Password : hashedpassword,
    })
    addAdmin.save()
}
//create an Admin
//createAdmin()
const checkIfEmailExist = async(email)=>{//function for checkin is the email exists
    try{
        const dbData = await Adminmodel.find({Email :email})
        if(dbData.length == 0){
            return {status : false ,data : null}
        }else{
            return {status : true , data : dbData[0]}
        }
    }catch(error){
        console.log("Error checkIfEmailExist function",error)
    }
}
const checkIfPassMatching = async(password,hashedPassword)=>{
    try {
        const passwordCheckStatus = await bcrypt.compare(password,hashedPassword)
        if(passwordCheckStatus){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log("checkIfPassMatching",error)
    }
}
const routes = express.Router()
routes.post("/login",async(req,res)=>{
    try {
        const {Email,Password} = req.body
        const emailCheckResult = await checkIfEmailExist(Email)

        if(emailCheckResult.status ){
            const passwordCheckStatus = await checkIfPassMatching(Password,emailCheckResult.data.Password)
            if(passwordCheckStatus){
                const jwtToken = jwt.sign({Email : Email},process.env.SECRET_KEY)
                res.status(201).json({
                    status :true,
                    jwtToken : jwtToken
                })
            }else{
                res.status(201).json({
                    status : false,
                    msg : "Error Wrong Email or password ❌ "
                })
            }
        }else{
            res.status(201).json({
                status : false,
                msg : "Error Wrong Email or password ❌"
            })
        }
    } catch (error) {
        console.log("Error in the /login route",error)
    }
})
const getAllUserslist = async()=>{
    try {
           const userList = await userModel.find()
           return userList
    } catch (error) {
        console.log("error in the getAllUsersList")
    }
}
routes.get("/getUsers",async(req,res)=>{
try {
    const jwtToken = req.headers.authorization.replace("Bearer","")
    const jwtTokenVerificationResult =  jwt.verify(jwtToken,process.env.SECRET_KEY)
    const emailChechkResult = await checkIfEmailExist(jwtTokenVerificationResult.Email)
    if(emailChechkResult.status){
       const userList = await getAllUserslist()
        res.json({
            msg : "received the request from the Admin",
            status : true,
            userArray : userList
    })
    }else{
        res.json({
            msg : "Action Not Permited ",
            status : false
        })
    }
} catch (error) {
    
}
})
routes.post("/Downgrade",async (req,res)=>{
    const jwtToken = req.headers.authorization.replace("Bearer","")
    const jwtTokenVerificationResult =  jwt.verify(jwtToken,process.env.SECRET_KEY)
    const emailChechkResult = await checkIfEmailExist(jwtTokenVerificationResult.Email)
    if(emailChechkResult.status){
        const user = await userModel.findById(req.body._id)
        if(!user){
            console.log("User Does not Exist ")
            res.status(201).json({
                msg : "Downgrade Failer",
                status : false
            })
        }else{
           const updatedRecord =  await user.updateOne({"subscriptionStatus": "Free"})
           res.status(201).json({
            msg : "Downgrade Success",
            status : true
           })
        }
    }else{
        res.status(201).json({
            msg : "Downgrade Failer",
            status : false
        })
    }
})
routes.post("/Upgrade",async (req,res)=>{
    const jwtToken = req.headers.authorization.replace("Bearer","")
    const jwtTokenVerificationResult =  jwt.verify(jwtToken,process.env.SECRET_KEY)
    const emailChechkResult = await checkIfEmailExist(jwtTokenVerificationResult.Email)
    if(emailChechkResult.status){
        const user = await userModel.findById(req.body._id)
        if(!user){
            console.log("User Does not Exist ")
            res.status(201).json({
                msg : "Upgrade Failer",
                status : false
            })
        }else{
           const updatedRecord =  await user.updateOne({"subscriptionStatus": "Premium"})
           res.status(201).json({
            msg : "Upgrade Success",
            status : true
           })
        }
    }else{
        res.status(201).json({
            msg : "Upgrade Failer",
            status : false
        })
    }
})
module.exports = routes