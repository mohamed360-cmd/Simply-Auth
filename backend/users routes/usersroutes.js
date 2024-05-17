require('dotenv').config()
const express = require("express")
const jwt = require("jsonwebtoken")
const {userModel,blogModel} = require('../Model/UserSchema.js')
const bcrypt = require('bcrypt')
const routes = express.Router()
const checkIfUserExist = async(email)=>{
    try {
        const checkResult = await userModel.find({Email : email})
        if(checkResult.length >= 1){
            return {status : true, dataResponse : checkResult}// if true the user already exist 
        }else{
            return { status : false , dataResponse : null}//if false the user does not exist 
        }
    } catch (error) {  
        console.log("Error in CheckIfUserExist Function",error)
    }
}
const blogs  = [
    {
        author  :"John Doe" ,
        blogName : "Daily Blogs",
        blogTile :" How to make Bread at Home",
        aritcle : "Just go to the store and Buy" ,
        articleSubscriptionType : "Free",
    },
    {
        author: 'John Doe',
        blogName: 'Daily Blogs',
        blogTile: 'How to Make Bread at Home',
        article: 'Just go to the store and buy.',
        articleSubscriptionType: 'Free',
      },
      {
        author: 'Jane Smith',
        blogName: 'Travel Adventures',
        blogTile: 'Exploring Hidden Gems in Southeast Asia',
        article: 'Embark on a journey through the lesser-known destinations in Southeast Asia, filled with rich culture and breathtaking landscapes.',
        articleSubscriptionType: 'Premium',
      },
      {
        author: 'Samuel Brown',
        blogName: 'Tech Trends',
        blogTile: 'The Rise of Quantum Computing',
        article: 'Delve into the fascinating world of quantum computing and its potential to revolutionize the field of technology.',
        articleSubscriptionType: 'Premium',
      },
      {
        author: 'Emily Johnson',
        blogName: 'Fitness Freak',
        blogTile: 'Effective HIIT Workouts for Busy Professionals',
        article: 'Discover high-intensity interval training (HIIT) routines that fit seamlessly into the busy schedules of working professionals.',
        articleSubscriptionType: 'Premium',
      },
]
const addBlogs = async ()=>{
    try {
        for (const blog of blogs) {
            await blogModel.create({
              author: blog.author,
              blogName: blog.blogName,
              blogTile: blog.blogTile,
              article: blog.article,
              articleSubscriptionType: blog.articleSubscriptionType,
            });
          }
          console.log("Blogs added successfully!");
    } catch (error) {
        console.log("Error in the addBlogs function")
    }
}
const checkisLoginDetailsOkay = async(email,password)=>{
    try {
        const checkResult = await userModel.find({Email : email})
        if(checkResult.length == 1){
            const userPasswordHashed = checkResult[0].Password
            const bcrypt_Check_Result =  await bcrypt.compare(password,userPasswordHashed)
            if(bcrypt_Check_Result){
               const jwtToken =  jwt.sign({Email : email,Name : checkResult[0].Name,subscriptionTier : checkResult[0].subscriptionStatus},process.env.SECRET_KEY)
                return {status : true,Name :checkResult[0].Name,subscriptionTier : checkResult[0].subscriptionStatus,jwtToken}
            }else{
                return {status : false}
            }
            
        }else{
            return { status : false}
        }
    } catch (error) {  
        console.log("Error in checkisLoginDetailsOkay Function",error)
    }
}
routes.post("/login",async(req,res)=>{
    const {Email,Password} = req.body
    const functionResult = await checkisLoginDetailsOkay(Email,Password)
    if(functionResult.status){
        res.status(201).json({ 
            msg : ' 👋🏻 Welcome back ' + functionResult.Name, 
            status : true,
            functionResult 
        })
    }else{
        res.status(201).json({
            msg : 'wrong Email or Password',
            status : false
        })
    }
})
routes.post("/register",async(req,res)=>{
    const {Name,Email,Password} = req.body
    console.log(Name)
    const functionResult = await checkIfUserExist(Email)
    if(functionResult.status){
        res.status(201).json({msg : 'Account Exist',status : false})
    }else{
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(Password,salt)
        const newUser = await userModel.create({
            Name: Name,
            Email : Email,
            Password : hashedPassword,
            subscriptionStatus : 'Free',
            authMethod : "Local Register Form"
        })
        await newUser.save()
        res.status(201).json({msg : 'Registraion Success |Login',status : true})
    }
})

routes.get("/blogs",async(req,res)=>{
    const header = req.headers
    const authorization = header.authorization
    const jwtToken = (authorization.replace('Bearer',""))
    const {Email,Name,subscriptionTier} = jwt.verify(jwtToken,process.env.SECRET_KEY)
    if(subscriptionTier === "Free"){
        try {
            const searchResult = await blogModel.find({articleSubscriptionType : "Free"})
            res.status(201).json(searchResult)
        } catch (error) {
            console.log("Error in getting the Free blogs",error)
        }
    }else if(subscriptionTier === "Premium"){
        try {
            const searchResult = await blogModel.find()
            res.status(201).json(searchResult)
        } catch (error) {
            console.log("Error in getting the all blogs",error)
        }
    }
})
routes.get("/upgradePremium",async(req,res)=>{
    const jwtToken = req.headers.authorization.replace("Bearer","")
    console.log(jwtToken)
    const {Email,Name,subscriptionTier} = jwt.verify(jwtToken,process.env.SECRET_KEY)
    const userUpgraderSubscription = await userModel.findOneAndUpdate(
        {Email : Email},
        {subscriptionStatus : "Premium"},
        {new : true}
    )
    const newjwtToken = jwt.sign({Email : Email ,Name : Name , subscriptionTier : "Premium"},process.env.SECRET_KEY)
    res.json({msg : "Premium Subscription upgraded", newjwtToken : newjwtToken,Name : Name,Email :Email,subscriptionTier : "Premium"})
})
routes.post("/googleAuth",async(req,res)=>{
    const {googleJwt} = req.body
    const decodedData = jwt.decode(googleJwt)
    const {email,name,picture} = decodedData
    const doesEmailExistResult = await checkIfUserExist(email)
    if(doesEmailExistResult.status){
        const { Email,Name,subscriptionStatus,profilePhoto} = doesEmailExistResult.dataResponse[0]
        const jwtToken =  jwt.sign({Email : Email,Name : Name,subscriptionTier : subscriptionStatus},process.env.SECRET_KEY)
        res.status(201).json( {status : true,Name :name,subscriptionTier :subscriptionStatus,jwtToken,profilePhoto})
    }else{
        const newUser = await userModel.create({
            Name: name,
            Email : email,
            Password : "Open id ,OAuth2",
            subscriptionStatus : 'Free',
            authMethod : " Google OAuth2",
            profilePhoto : picture
        })
        await newUser.save()
        const jwtToken =  jwt.sign({Email : email,Name : name,subscriptionTier : "Free"},process.env.SECRET_KEY)
        res.status(201).json( {status : true,Name :name,subscriptionTier :"Free",jwtToken,profilePhoto: picture})
    }
    console.log(decodedData)
})
module.exports = routes