import React, { useState } from 'react'
import './style.css'
import selectOptions from './options.json'

export default function KeyBtnSelect(props) {
  const options = selectOptions[props.char]
  const [isOpen, setIsOpen] = useState(false)

    let selectedOption = props.char === "Colors" ? props.stylingText.color : props.char === "Size" ? props.stylingText.fontSize : props.stylingText.fontFamily;
    const onSelectHandler = (option) => {
        setIsOpen(false); 
        switch (props.char) {
            case "Colors":
                props.setStylingText({ ...props.stylingText, color: option });
                break;
            case "Size":
                props.setStylingText({ ...props.stylingText, fontSize: option });
                break;
            case "Fonts":
                props.setStylingText({ ...props.stylingText, fontFamily: option });
                break;
        }
    }
  return (
    <div className='KeyBtnSelect' onClick={() => setIsOpen(!isOpen)}>
      <span >{ props.char +  ": " + selectedOption}</span>
      {isOpen && <div className='dropdown'>
        {options.map((option, index) => { return <button className='btnInDw' key={index} onClick={() => { onSelectHandler(option)}}> <p className={"color_"+option}> {option}</p></button> })}
      </div>}
    </div>
  )
}
