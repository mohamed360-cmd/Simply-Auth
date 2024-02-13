import { useState } from "react"
import SuccessMessage from "./Notifications/Success"
import ErrorMessage from "./Notifications/Error"
export default function Register({setShowLoginForm,setShowRegisterFrom,setShowSuccessMsg,showSuccessMsg,showErrorMsg,setShowErrorMsg}){
    const showLoginFormHandler = ()=>{
        setShowLoginForm(true)
        setShowRegisterFrom(false)
    }
    const [name,setName] = useState("")
    const [email,setEmail]  = useState("")
    const [password,setPassword] = useState("")
    const [passwordAgain,setPasswordAgain] = useState("")
    const [successMessage,setSucccessMessage] = useState("")
    const [showPasswordNotMatchingMsg,setShowPasswordNotMatchingMsg] = useState()
    const [errorMsg,setErrorMsg] = useState("")

    const closeSuccessMsgHandler = ()=>{
        setShowSuccessMsg(false)
        
    }
    const sendAuthDetails = async(AuthDetails)=>{
        try {
            const res = await fetch("http://localhost:3030/Auth/register",{
                method : "POST",
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(AuthDetails)
            })
            const data = await res.json()
            if(data.status){
                setSucccessMessage(data.msg)
                setShowSuccessMsg(true)
                setShowErrorMsg(false)

            }else{
                setErrorMsg(data.msg)
                setShowErrorMsg(true)
            }
        } catch (error) {
            console.log("Error in the sendAuthDetails function",error)
        }
    }
    const registionBtnHandler = ()=>{
        if(name.trim().length >3 && email.trim().length >3 && password.trim().length >3 && passwordAgain.trim().length > 3){
            if(password != passwordAgain){
                setShowPasswordNotMatchingMsg(true)
            }else{
                const authDetails = {
                    Name : name.trim(),
                    Email : email.trim(),
                    Password : password.trim()
                }
                setShowPasswordNotMatchingMsg(false)
                sendAuthDetails(authDetails)
            }
        }else{

        }
    }
    const closesErrorMsgHandler = ()=>{
        setShowErrorMsg(false)
        
    }
    return(
        <div className="registerForm AuthForms">
            <h3 className="formTitle">Register</h3>
            {showPasswordNotMatchingMsg && <h4 style={{padding : 10,borderRadius : 5, textAlign :'center',background :'white' ,color : 'red',position :'absolute',top : 20,right :20}}>Password not Matching</h4>}
            <input type="text" placeholder="Enter your Name" className="inputField" onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="Enter your Email" className="inputField" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter your password" className="inputField" onChange={e=>setPassword(e.target.value)}/>
            <input type="password" placeholder=" password Again" className="inputField" onChange={e=>setPasswordAgain(e.target.value)}/>
            <button className="sendAuthDetailsButton primary" onClick={registionBtnHandler}>register</button>
            <p className="forgotPasswordLink">Forgot password</p>
            <p className="infoText">already have and account ?</p>
            <button className="sendAuthDetailsButton secondary" onClick={showLoginFormHandler}>Login</button>
            {showErrorMsg && <ErrorMessage message={errorMsg} action={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={closesErrorMsgHandler}>X</button>}/>}
            {showSuccessMsg && <SuccessMessage message={successMessage} action={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={closeSuccessMsgHandler}>X</button>}/> }
        </div>
    )
}