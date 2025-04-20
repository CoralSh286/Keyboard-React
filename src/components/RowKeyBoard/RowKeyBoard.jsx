import React from 'react'
import KeyBoardBtn from '../KeyBoardBtn/KeyBoardBtn'
import KeyBtnSelect from '../KeyBtnSelect/KeyBtnSelect'

/**
* RowKeyBoard Component
* 
* Renders a single row of the virtual keyboard.
* Handles different types of keys including regular keys and dropdown selectors.
*/
export default function RowKeyBoard({arrOfRowChars,setIsGlow,stylingText,changeKeyBoard,setText,setStylingText,text}) {
  return (
    <div className='row'>
      {arrOfRowChars?.map((char, index) => {
        if (char === 'Colors' || char === 'Size' || char === 'Fonts') {
          return <KeyBtnSelect 
          stylingText={stylingText}
          setStylingText={setStylingText}
          key={char + index} 
          char={char} />
        }
        else {
          return <KeyBoardBtn  
          text={text}
          setIsGlow={setIsGlow}
          stylingText={stylingText}
           key={char + index}
            changeKeyBoard={changeKeyBoard} 
            setText={setText} 
            char={char}
             />
        }
      })}
    </div>
  )
}
