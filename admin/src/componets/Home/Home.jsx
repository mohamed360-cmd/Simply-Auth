import { useEffect, useState } from "react"
import UserList from "./UserlistContainer"
import "./Home.css"
import { useNavigate } from "react-router-dom"
export default function Home({isLogedin}){
    const navigator = useNavigate()
    const [showUserListView,setShowUserListView] = useState(true)
    const checkIfUserIsLogedIn = ()=>{
        if(!sessionStorage.getItem("isLogedin")){
            navigator("/")
        }
        
    }
    useEffect(()=>{
    checkIfUserIsLogedIn()
    },[])
    return(
        <div className="MainHomeContainer">
            <div className="displayContainer">
                <div className="sideOptionContainer">
                    <button className="optionBtns userlist ">User List</button>
                    <button className="optionBtns logout">Logout</button>
                </div>
                <div className="infoDisplayContainer">
                    {showUserListView && <UserList/>}
                </div>
            </div>

        </div>
    )
}