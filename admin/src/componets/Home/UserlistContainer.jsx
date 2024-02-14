import { useEffect,useState } from "react"

export default function UserList(){
    const [userList,setUserList] = useState([])
    const getAllUsers = async ()=>{
        

        const jwtToken = sessionStorage.getItem("JWT_Token")
        try {
            const res  = await fetch("http://localhost:3030/Admin/getUsers",{
                method : "GET",
                headers : {
                    Authorization : `Bearer${jwtToken}`
                }
            })
            const data = await res.json()
            console.log(data)
            if(data.status){
                setUserList(data.userArray)
            }else{
                //when the user is not the Admin
            }
        } catch (error) {
            console.log("Error in the getAllUsers function",error)
        }
    }
    useEffect(()=>{
        getAllUsers()
    },[])
    return(
        <div className="userlistMainContainerMaster">
        <div>
            <h3>User  System Count {userList.length}</h3>
        </div>
        <div className="userlistMainContainer">
                  {userList.length > 0 && userList.map(user => {
            return(
                <div className="userContainer">
                    <p className="userEmail">Email {user.Email}</p>
                    <p className="userName">Name {user.Name}</p>
                    <p className="userSubStatus">subscription Tier{user.subscriptionStatus}</p>
                    <div className="ActionContainer">
                        <button className="ActionBtn Delete">Delete</button>
                        <button className="ActionBtn Upgrade">Upgrade</button>
                        <button className="ActionBtn Downgrade">Downgrade</button>
                    </div>
                </div>
            )
        })}
        </div>
  
        </div>
    )
}