import {Routes,Route} from "react-router-dom"
import Login from "./componets/Auth/Login"
import { useState } from "react"
export default function App(){
  const [isLogedin,setIslogedIn] = useState(false)
  return(
    <div style={{height : "100%",width : "100%"}}>
    <Routes>
      <Route path="/"  element={<Login setIslogedIn={setIslogedIn}/>} />
    </Routes>
    </div>
  )
}