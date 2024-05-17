import { createContext, useState ,useContext} from "react"
import Login from "./Login"
import Register from "./Register"
import SuccessMessage from "./Notifications/Success"
import { useEffect } from "react"
import { UserContext } from "../App"
export const FormContext = createContext()
import { GoogleLogin } from '@react-oauth/google';
export default function MainAuth(){
    const [setIsUserLogedin,isUserLogedin,profilePhoto,setprofilePhoto,setSubscriptionStatus] = useContext(UserContext)
    const [showSuccessMsg,setShowSuccessMsg] = useState(false)
    const [showErrorMsg,setShowErrorMsg] = useState(false)
    const [showLoginForm,setShowLoginForm] = useState(true)
    const [showRegisterForm,setShowRegisterFrom] = useState(false)
    const appendUrl= ()=>{
        if(showLoginForm){
            window.history.pushState({}, "", "/Login");
        }else if(showRegisterForm){
            window.history.pushState({}, "", "/register");
        }
    }
    const googleLoginHandler = async()=>{
        try {
            const res = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=AUth token here.apps.googleusercontent.com')
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log("Error in the googleLoginHandler function",error)
        }
    }
 const sendOAuthDetails = async( jwttoken)=>{
    try {
        const res = await fetch("http://localhost:3030/Auth/googleAuth",{
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(jwttoken)
        })
        const data = await res.json()
        if(data.status){
            setprofilePhoto(data.profilePhoto)
            setIsUserLogedin(true)
            setSubscriptionStatus(data.subscriptionTier)
            sessionStorage.setItem("userName",data.Name)
            sessionStorage.setItem("subscriptionTier",data.subscriptionTier)
            sessionStorage.setItem("jwtToken",data.jwtToken)
            sessionStorage.setItem("logedin",data.status)
        }
    } catch (error) {
        console.log("Error in the sendOAuthDetails function ",error)
    }
 }
    useEffect(()=>{
        appendUrl()
    },[showLoginForm,showRegisterForm])
    return(
<FormContext.Provider value={[setShowRegisterFrom, setShowLoginForm, showErrorMsg, setShowErrorMsg, setShowSuccessMsg, showSuccessMsg, setIsUserLogedin]}>

        
        <div className="flex  h-screen w-screen flex-col justify-center items-center bg-[url('../assets/backgroundImage.jpg')]">
            {
                showLoginForm && <Login />
            }
            {
                showRegisterForm && <Register/>
            }
            <div>
                <p>Continue with</p>
                    <GoogleLogin
                    onSuccess={credentialResponse =>{
                        const googleJwt = { googleJwt : credentialResponse.credential }
                        sendOAuthDetails(googleJwt)
                        console.log("Success",credentialResponse)
                    }}
                    onError={credentialResponse =>{
                        console.log(credentialResponse)
                    }}
                    >

                    </GoogleLogin>
                    {
                       
                 /*
                <button className="bg-black text-white p-2 rounded m-2" onClick={googleLoginHandler}>Google</button>
                */
                    }
            </div>
            
        </div>
        </FormContext.Provider>
    )
}