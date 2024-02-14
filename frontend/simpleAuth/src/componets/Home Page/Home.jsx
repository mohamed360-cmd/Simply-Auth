import { useEffect, useState } from "react"
import "./Home.css"
import SuccessMessage from "../Notifications/Success"
export default function Home({userName,subscriptionStatus,setuserName,setSubscriptionStatus,setIsUserLogedin}){
    const [blogs,setBlogs] = useState([])
    const [refreshScreen,setRefreshScreen] = useState(false)
    const jwtToken = sessionStorage.getItem("jwtToken")
    const [showSuccessMessage,setShowSuccessMessage] = useState(false)
    const [successesMsg,setSuccessmsg] = useState("")
    const getBlogs = async(JTWTOKEN)=>{
        try {
            
            const res = await fetch("http://localhost:3030/Auth/blogs",{
                method : "GET",
                headers :{
                    "content-type" : "application/json",
                    "Authorization" : `Bearer${JTWTOKEN.toString()}`
                },
                
            })
            const data = await res.json()
            setBlogs(data)
        } catch (error) {
            console.log("Error in the getBlogs function",error)
        }
    }
    const upgradePremiumBtnHnalder = async()=>{
        try {
            const JWTToken = sessionStorage.getItem("jwtToken")
            const res = await fetch("http://localhost:3030/Auth/upgradePremium",{
                method : "GET",
                headers :{
                    "content-type" : "application/json",
                    "Authorization" : `Bearer${JWTToken.toString()}`
                },
                
            })
            const data = await res.json()
            console.log(data)
            setuserName(data.Name)
            setSuccessmsg(data.msg)
            setSubscriptionStatus(data.subscriptionTier)
            sessionStorage.setItem("jwtToken",data.newjwtToken)
            getBlogs(jwtToken)
            setShowSuccessMessage(true)
            setRefreshScreen(true)
        } catch (error) {
            console.log("Error in the upgradePremiumBtnHnalder ",error)
        }
    }
    const closeSuccessMsgHandler = ()=>{
        setShowSuccessMessage(false)
        
    }
    const logoutbtnHandler = ()=>{
        sessionStorage.clear()
        setIsUserLogedin(false)
    }
    const updateUrl = ()=>{
        window.history.pushState({},"","/Home")
    }
    useEffect(()=>{
        getBlogs(jwtToken)
        updateUrl()
    },[refreshScreen])
    return(
        <div className="MainHomeContainer">
            <div className="mainNavBar">
                <h3> Simply Read</h3>
                <div className="navInfoContainer">
                    <div className="avaterContainer">
                        <span className="avaterText">{ userName == "" ? "Null" :userName[0].toUpperCase()}</span>
                    </div>
                    <p className="navbarInfoText">{userName == "" ? "Null" :userName}</p>
                    <p className="navbarInfoText plan">Plan : {subscriptionStatus == "" ? "Null" : subscriptionStatus}</p>
                    <button className="logoutbtn" onClick={logoutbtnHandler}>Logout</button>
                </div>
                
            </div>
            <div className="blogDisplayMainContainer">
                {
                    blogs.length >= 1 && blogs.map(blog=>{
                        return(
                            <div className="blogContainer">
                                <div className="blogNavbar">
                                    <div className="blogAvaterContainer">
                                        <span className="blogAvaterName">{blog.blogName[0]}</span>
                                    </div>
                                    <h4>{blog.blogName}</h4>
                                    <span className={blog.articleSubscriptionType  == "Free" ? "Free Banner" : "Premium Banner"}>{blog.articleSubscriptionType}</span>
                                </div>
                                <h3 className="blogTitle">Title :{blog.blogTile}</h3>
                                <p>Author : {blog.author}</p>
                            </div>
                        )
                    })
                }
                {showSuccessMessage && <SuccessMessage message={successesMsg} action={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={closeSuccessMsgHandler}>X</button>}/>}
                {subscriptionStatus == "Free" && <button className="premiumUpgradeBtn" onClick={upgradePremiumBtnHnalder}>Premium upgrade ✨</button>}
            </div>
        </div>
    )
}