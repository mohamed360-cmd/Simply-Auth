import { useContext, useEffect, useState } from "react"
import UserList from "./UserlistContainer"
import "./Home.css"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
export default function Home(){
    const [isLogedin,setIslogedIn] = useContext(UserContext)
    const navigator = useNavigate()
    const [showUserListView,setShowUserListView] = useState(true)
    const checkIfUserIsLogedIn = ()=>{
        if(!sessionStorage.getItem("isLogedin")){
            navigator("/")
        }
        
    }
    const logoutHandler = ()=>{
        setIslogedIn(false)
        sessionStorage.clear()
        navigator("/")
    }
    useEffect(()=>{
    checkIfUserIsLogedIn()
    },[])
    return(
        <div className="MainHomeContainer">
            <div className="displayContainer">
                <div className="sideOptionContainer">
                    <button className="optionBtns userlist ">User List</button>
                    <button className="optionBtns logout" onClick={logoutHandler}>Logout</button>
                </div>
                <div className="infoDisplayContainer">
                    {showUserListView && <UserList/>}
                </div>
            </div>

        </div>
    )
}