import { ChangeEvent, useEffect, useState } from 'react';
import './App.css'
import { SuggestionJsonType } from './types/SuggestionJsonType';
import InfoBar from './components/InfoBar';
import SuggestionBox from './components/SuggestionBox';
import SuggestionBar from './components/SuggestionBar';

function App() {

  const endpoint = "http://localhost:8080";
  const [word,setWord] = useState(""); 
  const [wordError,setWordError] = useState("");
  const [suggestion,setSuggestions] = useState<SuggestionJsonType | null>(null)

  async function checkSpell(word:string){

    const result = await fetch(`${endpoint}/CheckSpell.php?input_word=${word}`,{
      mode:"cors",
      cache:"no-cache"
    })
    const suggestions:SuggestionJsonType = await result.json();
    setSuggestions(suggestions)
    
  }

  function handleInput(event:ChangeEvent<HTMLInputElement>)
  { 
    setSuggestions(null);
    setWord(event.currentTarget.value);
  }           

  function handleSubmit(){
    setWordError("");
    setSuggestions(null);
    if(word.trim().length === 0){
      setWordError("Please write a word");
      return;
    }

    checkSpell(word);

  }
  function handleSuggestionClick(word:string){
    setSuggestions(null);
    setWord(word);
  }

  useEffect(()=>{

    function handleKeyPress(event:KeyboardEvent){
      if(event.key === "Enter") handleSubmit();
    }
    document.body.addEventListener("keyup",handleKeyPress);
    return ()=> document.body.removeEventListener("keyup",handleKeyPress);
  })


  return (
    <>
      <div className='heading'>
        <h1>Spell Checker</h1>
      </div>
      <div className="info-bar-container">
      {suggestion && <InfoBar status={suggestion.status} word={word}/>}

      </div>
      <div className='input-group'>
        <div className="input-title-container">
        <h2 className='input-title'>Write a word to get suggestion</h2>

        </div>
        <div className='input-container'>

          <input name="" value={word} className='input-text-area' id="" type='text'
           onChange={(e)=>handleInput(e)}></input>
           <div className='error-message'>{wordError}</div>
        </div>
        <div className='btn-group'>
          <a className="submit-btn" onClick={handleSubmit}>Submit</a>  
        </div>
      </div>
      
      {suggestion && suggestion.suggestions !== undefined && (<SuggestionBox>
          {suggestion.suggestions.map((suggest,id) => (
            <SuggestionBar handleSuggestionClick={handleSuggestionClick}
            key={id} id={id} suggestionWord={suggest["word"]}
            />
          ))}

        </SuggestionBox>)}

    </>
  )
}

export default App
