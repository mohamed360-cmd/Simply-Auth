import dotenv from 'dotenv'
import { useState,useContext } from "react"
import ErrorMessage from "./Notifications/Error"
import SuccessMessage from "./Notifications/Success"
import UserContext from "../App"
import { FormContext } from "./MainAuth"
export default function Login(){
    const [setShowRegisterFrom,setShowLoginForm,showErrorMsg,setShowErrorMsg,setShowSuccessMsg,showSuccessMsg,setIsUserLogedin] = useContext(FormContext)
   //const [isUserLogedin,setIsUserLogedin] = useState()
    const [email,setEmail]  = useState("")
    const [password,setPassword] = useState("")
    const [errorMsg,setErrorMsg] = useState("")
    const [successMessage,setSucccessMessage] = useState("")
    const [enableLoginBtn,setEnableLoginBtn] = useState(true)
    const showregisterFormHandler = ()=>{
        setShowRegisterFrom(true)
        setShowLoginForm(false)
    }

    const sendAuthDetailsHandler = async(authDetails)=>{
        try {
            setEnableLoginBtn(false)
            const res = await fetch("http://localhost:3030/Auth/login",{
                method : "POST",
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(authDetails)
            })
            const data = await res.json()
            setEnableLoginBtn(true)
            if(data.status){
                setSucccessMessage(data.msg)
                setShowSuccessMsg(true)
                setShowErrorMsg(false)
                setIsUserLogedin(true)
                sessionStorage.setItem("userName",data.functionResult.Name)
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
        <div className="flex flex-col p-2 bg-green-400 rounded-md">
        <h3 className="text-2xl text-white font-bold">Login</h3>
            <input type="text" placeholder="Enter your Email" className="p-2 rounded-md placeholder-black font-bold mb-2" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter your password" className="p-2 rounded-md placeholder-black font-bold mb-2" onChange={e=>setPassword(e.target.value)}/>
            <button className="p-2 bg-blue-700 text-white self-center rounded-xl" onClick={loginbtnHandler}>Login</button>
            <p className="w-full text-white text-xs italic text-right">Forgot password</p>
            <p className="text-sm text-white">Dont have and account ?</p>
             <button className="p-2 bg-yellow-700 text-white self-center rounded-lg"   onClick={showregisterFormHandler}>Register</button> 
            {showErrorMsg && <ErrorMessage message={errorMsg} action={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={closesErrorMsgHandler}>X</button>}/>}
            {showSuccessMsg && <SuccessMessage message={successMessage} action={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={closeSuccessMsgHandler}>X</button>}/> }

        </div>
    )
}