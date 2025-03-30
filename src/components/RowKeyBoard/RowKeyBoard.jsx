import React from 'react'
import KeyBoardBtn from '../KeyBoardBtn/KeyBoardBtn'
import KeyBtnSelect from '../KeyBtnSelect/KeyBtnSelect'

export default function RowKeyBoard(props) {
  return (
    <div className='row'>
      {props.arrOfRowChars?.map((char, index) => {
        if (char === 'Colors' || char === 'Size' || char === 'Fonts') {
          return <KeyBtnSelect 
          stylingText={props.stylingText}
          setStylingText={props.setStylingText}
          key={char + index} 
          char={char} />
        }
        else {
          return <KeyBoardBtn  
          setIsGlow={props.setIsGlow}
          stylingText={props.stylingText}
           key={char + index}
            changeKeyBoard={props.changeKeyBoard} 
            setText={props.setText} 
            char={char}
             />
        }
      })}
    </div>
  )
}
