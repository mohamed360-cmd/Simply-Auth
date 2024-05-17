import { useState,useContext } from "react"
import SuccessMessage from "./Notifications/Success"
import ErrorMessage from "./Notifications/Error"
import { FormContext } from "./MainAuth"

export default function Register(){
    const [setShowRegisterFrom,setShowLoginForm,showErrorMsg,setShowErrorMsg,setShowSuccessMsg,showSuccessMsg,setIsUserLogedin] = useContext(FormContext)

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
        <div className="flex flex-col p-2 bg-green-400 rounded-md">
            <h3 className="text-2xl text-white font-bold">Register</h3>
            {showPasswordNotMatchingMsg && <h4 style={{padding : 10,borderRadius : 5, textAlign :'center',background :'white' ,color : 'red',position :'absolute',top : 20,right :20}}>Password not Matching</h4>}
            <input type="text" placeholder="Enter your Name" className="p-2 rounded-md placeholder-black font-bold mb-2" onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="Enter your Email" className="p-2 rounded-md placeholder-black font-bold mb-2" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter your password" className="p-2 rounded-md placeholder-black font-bold mb-2" onChange={e=>setPassword(e.target.value)}/>
            <input type="password" placeholder=" password Again"  className="p-2 rounded-md placeholder-black font-bold mb-2" onChange={e=>setPasswordAgain(e.target.value)}/>
            <button className="p-2 bg-blue-700 text-white self-center rounded-xl" onClick={registionBtnHandler}>register</button>
            <p className="w-full text-white text-xs italic text-right">Forgot password</p>
            <p className="text-sm text-white">already have and account ?</p>
            <button className="p-2 bg-yellow-700 text-white self-center rounded-lg" onClick={showLoginFormHandler}>Login</button>
            {showErrorMsg && <ErrorMessage message={errorMsg} action={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={closesErrorMsgHandler}>X</button>}/>}
            {showSuccessMsg && <SuccessMessage message={successMessage} action={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={closeSuccessMsgHandler}>X</button>}/> }
        </div>
    )
}