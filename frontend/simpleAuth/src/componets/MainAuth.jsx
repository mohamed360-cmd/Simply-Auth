import { createContext, useState ,useContext} from "react"
import Login from "./Login"
import Register from "./Register"
import "./Auth.css"
import SuccessMessage from "./Notifications/Success"
import { useEffect } from "react"
import { UserContext } from "../App"
export const FormContext = createContext()
export default function MainAuth(){
    const [setIsUserLogedin,isUserLogedin] = useContext(UserContext)
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
    useEffect(()=>{
        appendUrl()
    },[showLoginForm,showRegisterForm])
    return(
<FormContext.Provider value={[setShowRegisterFrom, setShowLoginForm, showErrorMsg, setShowErrorMsg, setShowSuccessMsg, showSuccessMsg, setIsUserLogedin]}>

        
        <div className="MainAuthcontainer">
            {
                showLoginForm && <Login />
            }
            {
                showRegisterForm && <Register/>
            }
        </div>
        </FormContext.Provider>
    )
}