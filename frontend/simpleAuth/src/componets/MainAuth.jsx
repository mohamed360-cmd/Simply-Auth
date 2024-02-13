import { useState } from "react"
import Login from "./Login"
import Register from "./Register"
import "./Auth.css"
import SuccessMessage from "./Notifications/Success"
export default function MainAuth({setIsUserLogedin,setuserName,setSubscriptionStatus}){
    const [showSuccessMsg,setShowSuccessMsg] = useState(false)
    const [showErrorMsg,setShowErrorMsg] = useState(false)
    const [showLoginForm,setShowLoginForm] = useState(true)
    const [showRegisterForm,setShowRegisterFrom] = useState(false)
 
    return(
        <div className="MainAuthcontainer">
            {
                showLoginForm && <Login setShowRegisterFrom={setShowRegisterFrom} setShowLoginForm={setShowLoginForm} showErrorMsg={showErrorMsg}  setShowErrorMsg={setShowErrorMsg} setShowSuccessMsg={setShowSuccessMsg} showSuccessMsg={showSuccessMsg} setIsUserLogedin={setIsUserLogedin} setuserName={setuserName} setSubscriptionStatus={setSubscriptionStatus}/>
            }
            {
                showRegisterForm && <Register setShowLoginForm={setShowLoginForm} setShowRegisterFrom={setShowRegisterFrom} setShowSuccessMsg={setShowSuccessMsg} showSuccessMsg={showSuccessMsg} showErrorMsg={showErrorMsg}  setShowErrorMsg={setShowErrorMsg}/>
            }
        </div>
    )
}