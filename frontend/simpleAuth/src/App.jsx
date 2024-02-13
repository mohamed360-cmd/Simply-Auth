import { useEffect, useState } from "react"
import MainAuth from "./componets/MainAuth"
import Home from "./componets/Home Page/Home"
export default function App(){
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
  return (
    <div>
    {
      !isUserLogedin && <MainAuth setIsUserLogedin={setIsUserLogedin} setuserName={setuserName} setSubscriptionStatus={setSubscriptionStatus}/>
    }
    {
      isUserLogedin && <Home userName={userName} setIsUserLogedin={setIsUserLogedin}subscriptionStatus={subscriptionStatus} setuserName={setuserName} setSubscriptionStatus={setSubscriptionStatus}/>
    }
    </div>
  )
}