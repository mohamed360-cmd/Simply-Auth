import "./Auth.css"
import dotenv from 'dotenv'
import { useState } from "react"
import ErrorMessage from "./Notifications/Error"
import SuccessMessage from "./Notifications/Success"
export default function Login({setShowRegisterFrom,setShowLoginForm,showErrorMsg,setShowErrorMsg,setShowSuccessMsg,showSuccessMsg,setIsUserLogedin,setuserName,setSubscriptionStatus}){
    const [email,setEmail]  = useState("")
    const [password,setPassword] = useState("")
    const [errorMsg,setErrorMsg] = useState("")
    const [successMessage,setSucccessMessage] = useState("")

    const showregisterFormHandler = ()=>{
        setShowRegisterFrom(true)
        setShowLoginForm(false)
    }

    const sendAuthDetailsHandler = async(authDetails)=>{
        try {
            const res = await fetch("http://localhost:3030/Auth/login",{
                method : "POST",
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(authDetails)
            })
            const data = await res.json()
            console.log(data)
            if(data.status){
                setSucccessMessage(data.msg)
                setShowSuccessMsg(true)
                setShowErrorMsg(false)
                setIsUserLogedin(true)
                setuserName(data.functionResult.Name)
                sessionStorage.setItem("userName",data.functionResult.Name)
                setSubscriptionStatus(data.functionResult.subscriptionTier)
                sessionStorage.setItem("subscriptionTier",data.functionResult.subscriptionTier)
                sessionStorage.setItem("jwtToken",data.functionResult.jwtToken)
                sessionStorage.setItem("logedin",data.status)
            }else{
                setErrorMsg(data.msg)
                setShowErrorMsg(true)
            }
        } catch (error) {
            console.log("Error in sendAuthDeatilsHandler",error)
        }
    }
    const loginbtnHandler = ()=>{ 
        try {
            if(email.trim().length > 3 && password.trim().length > 1){
                const authDetails = {
                    Email : email,
                    Password : password
                }
                sendAuthDetailsHandler(authDetails)
            }
        } catch (error) {
            console.log("Error in the loginbtnHandler",error)
        }
    }
    const closesErrorMsgHandler = ()=>{
        setShowErrorMsg(false)
        
    }
    const closeSuccessMsgHandler = ()=>{
        setShowSuccessMsg(false)
        
    }
    return(
        <div className="loginForm AuthForms">
        <h3 className="formTitle">Login</h3>
            <input type="text" placeholder="Enter your Email" className="inputField" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter your password" className="inputField" onChange={e=>setPassword(e.target.value)}/>
            <button className="sendAuthDetailsButton primary" onClick={loginbtnHandler}>Login</button>
            <p className="forgotPasswordLink">Forgot password</p>
            <p className="infoText">Dont have and account ?</p>
            <button className="sendAuthDetailsButton secondary" onClick={showregisterFormHandler}>Register</button>
            {showErrorMsg && <ErrorMessage message={errorMsg} action={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={closesErrorMsgHandler}>X</button>}/>}
            {showSuccessMsg && <SuccessMessage message={successMessage} action={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={closeSuccessMsgHandler}>X</button>}/> }

        </div>
    )
}