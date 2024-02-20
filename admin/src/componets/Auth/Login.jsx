import { useContext, useEffect, useState } from "react"
import "./login.css"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
export default function Login(){
const navigation = useNavigate()
    const [isLogedin,setIslogedIn] = useContext(UserContext)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [showErrorMessage,setShowErrorMessage] = useState(false)
    const sendLoginDetails = async(loginDetails)=>{
        try {
            const res = await fetch("http://localhost:3030/Admin/login",{
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(loginDetails)
            })
            const data = await res.json()
            if(data.status){
                sessionStorage.setItem("JWT_Token",data.jwtToken)
                sessionStorage.setItem("isLogedin",true)
                setIslogedIn(true)
                navigation("/home")
            }else{
                setErrorMessage(data.msg)
                setShowErrorMessage(true)
            }
        } catch (error) {
            console.log("Error in the sendLoginDetails",error)
        }
    }
    const loginBtnhandler = ()=>{
        setShowErrorMessage(false)
        if(email.trim().length > 3 && password.trim().length > 3){
            const loginDetails = {
                Email : email.trim(),
                Password : password.trim()
            }
            sendLoginDetails(loginDetails)
        }else{
            setErrorMessage("Value Length does not meet Requirements")
            setShowErrorMessage(true)
        }
    }
    useEffect(()=>{
        window.history.pushState({},"","/Login")
    },[])
    return(
        <div className="MainLoginContainer">
            <div className="form login">
                {showErrorMessage && <div className="ErrorMessage">{errorMessage}</div>}
                <h3> Admin Login</h3>
                    <input type="text" placeholder="Email" className="inputField" onChange={e=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="inputField" onChange={e=>setPassword(e.target.value)} />
                    <button className="loginBtn" onClick={loginBtnhandler}>Login</button>
            </div>
        </div>
    )
}