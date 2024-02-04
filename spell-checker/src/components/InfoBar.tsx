interface InfoBarProps{
    status : boolean,
    word : string,
}
    

export default function InfoBar({status,word}:InfoBarProps){

    return(<div className={`info-bar ${status  ? "success" : "error"}`}>
        <p className="info-bar-text">{
             status ? `${word} is correctly spelled`: `${word} is spelled incorrectly`
        }</p>
    </div>)
}