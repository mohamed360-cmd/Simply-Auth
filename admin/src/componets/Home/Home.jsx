import { useState } from "react"
import UserList from "./UserlistContainer"
import "./Home.css"
export default function Home(){
    const [showUserListView,setShowUserListView] = useState(true)
    
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