
export default function SuggestionBox({children}:{children:Array<React.JSX.Element>}){
    return(

        <div className="suggestion-container">
            <div className="title-container">
                <h3 className="title">Did you mean ?</h3>
            </div>
            <div className="suggestion-bar-container">

            {children}
            </div>
        </div>
    )
}