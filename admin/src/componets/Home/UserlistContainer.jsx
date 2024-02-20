import { useEffect,useState } from "react"

export default function UserList(){
    const [userList,setUserList] = useState([])
    const [showLoadingScreen,setShowLoadingScreen] = useState(false)
    const getAllUsers = async ()=>{
        const jwtToken = sessionStorage.getItem("JWT_Token")
        setShowLoadingScreen(true)
        try {
            const res  = await fetch("http://localhost:3030/Admin/getUsers",{
                method : "GET",
                headers : {
                    Authorization : `Bearer${jwtToken}`
                }
            })
            const data = await res.json()
            setShowLoadingScreen(false)
            if(data.status){
                setUserList(data.userArray)
            }else{
                //when the user is not the Admin
            }
        } catch (error) {
            console.log("Error in the getAllUsers function",error)
        }
    }
    const downgradeUserHandler = async(user)=>{
        console.log(user)
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
        {showLoadingScreen && <div>Loading users Please Wait </div>}
                  {userList.length > 0 && userList.map(user => {
            return(
                <div className="userContainer" key={user._id}>
                    <p className="userEmail">Email {user.Email}</p>
                    <p className="userName">Name {user.Name}</p>
                    <p className="userSubStatus">subscription Tier{user.subscriptionStatus}</p>
                    <div className="ActionContainer">
                        <button className="ActionBtn Delete">Delete user</button>
                        {
                            user.subscriptionStatus == "Free" && <button className="ActionBtn Upgrade">Upgrade</button>
                        }
                        {
                            user.subscriptionStatus == "Premium" &&  <button className="ActionBtn Downgrade" onClick={() => downgradeUserHandler(user)}>Downgrade</button>
                        }
                       
                    </div>
                </div>
            )
        })}
        </div>
  
        </div>
    )
}