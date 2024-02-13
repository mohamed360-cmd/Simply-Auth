import "./Error.css"
export default function ErrorMessage ({message,action}){
return(
    <div className="ErrorMessageContainer">
        <p>{message}</p>
        {action}
    </div>
)
}