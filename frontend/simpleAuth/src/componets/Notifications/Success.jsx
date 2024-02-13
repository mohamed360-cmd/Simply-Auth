import "./SuccessMsg.css"
export default function SuccessMessage ({message,action}){
return(
    <div className="SuccessMessageContainer">
        <p>{message}</p>
        {action}
    </div>
)
}