export default function SuggestionBar({suggestionWord,id,handleSuggestionClick}:
    {suggestionWord:string
        ,id:number
        ,handleSuggestionClick:(word:string)=>void}){
    return(
        <a role="button" className="suggestion-bar" onClick={()=>{handleSuggestionClick(suggestionWord)}} style={{animationDelay:`${id / 25}s`}}>
            <p className="suggestion-word">{suggestionWord}</p>
        </a>
    )
}