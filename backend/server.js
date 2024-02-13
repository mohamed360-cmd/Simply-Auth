require("dotenv").config()
const express   = require('express')
const cors = require('cors')
const app = express()
const mongoose = require("mongoose")
mongoose.connect(process.env.mongodb_Url)
const db = mongoose.connection
const crypto = require('crypto')

db.on("error",(error)=>{
    console.log("Error in connecting to the database",error)
})
db.once("open",()=>{
    console.log("Successfuly connected to the database")
})
app.use(express.json())
app.use(cors())
const AdminRoutes = require("./users routes/adminroutes")
const usersRoutes = require("./users routes/usersroutes")
app.use("/Admin",AdminRoutes)
app.use("/Auth",usersRoutes)
app.listen(process.env.PORT_NUM,()=>{
    console.log("Server Active and Listening")
})