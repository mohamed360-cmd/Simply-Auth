import {Routes,Route} from "react-router-dom"
import Login from "./componets/Auth/Login"
import { useState,createContext } from "react"
import Home from "./componets/Home/Home"
export const UserContext = createContext()
export default function App(){
  const [isLogedin,setIslogedIn] = useState(false)
  return(
    <UserContext.Provider value={[isLogedin,setIslogedIn]}>
    <div style={{height : "100%",width : "100%"}}>
    <Routes>
      <Route path="/"  element={<Login/>} />
      <Route path="/Home" element={<Home/>}/>
    </Routes>
    </div>
    </UserContext.Provider>
  )
}