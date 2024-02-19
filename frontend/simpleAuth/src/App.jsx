import { useEffect, useState,createContext } from "react"
import MainAuth from "./componets/MainAuth"
import Home from "./componets/Home Page/Home"
import {useNavigate,Router,Route,Routes} from "react-router-dom"
export const UserContext = createContext()

export default function App(){
  const navigate = useNavigate()
  const [isUserLogedin,setIsUserLogedin] = useState()
  const [userName,setuserName] = useState("")
  const [subscriptionStatus,setSubscriptionStatus] = useState("")
  const chechIfLogedin = ()=>{
    const checkResult =  sessionStorage.getItem("logedin")
    console.log(checkResult)
    if(checkResult == null){
      setIsUserLogedin(false)
    }else{
      setIsUserLogedin(checkResult)
    }
  }
  useEffect(()=>{
    chechIfLogedin()
  },[isUserLogedin,subscriptionStatus])
  const pageChanger = ()=>{//this function navigates the user to the Home Page if they are loged in n
    if(isUserLogedin){
      navigate("/Home")
    }else if(!isUserLogedin){
      navigate("/")
    }
  }
  useEffect(()=>{
    pageChanger()
  },[isUserLogedin])
  return (
    <UserContext.Provider value={[setIsUserLogedin,isUserLogedin]}>
    <Routes>
      <Route path="/" element={<MainAuth />}/>
      <Route path="/Home" element={<Home />}/>
    </Routes>

    </UserContext.Provider>
  )
}
/*
    {
      !isUserLogedin && <MainAuth setIsUserLogedin={setIsUserLogedin} setuserName={setuserName} setSubscriptionStatus={setSubscriptionStatus}/>
    }
    {
      isUserLogedin && <Home userName={userName} setIsUserLogedin={setIsUserLogedin}subscriptionStatus={subscriptionStatus} setuserName={setuserName} setSubscriptionStatus={setSubscriptionStatus}/>
    }
*/