import React, { useState } from 'react'
import './style.css'
import selectOptions from './options.json'

export default function KeyBtnSelect({char, stylingText}) {
  const options = selectOptions[char]
  const [isOpen, setIsOpen] = useState(false)

    let selectedOption = char === "Colors" ? stylingText.color : char === "Size" ? stylingText.fontSize : stylingText.fontFamily;
    const onSelectHandler = (option) => {
        setIsOpen(false); 
        switch (char) {
            case "Colors":
                setStylingText({ ...stylingText, color: option });
                break;
            case "Size":
                setStylingText({ ...stylingText, fontSize: option });
                break;
            case "Fonts":
                setStylingText({ ...stylingText, fontFamily: option });
                break;
        }
    }
  return (
    <div className='KeyBtnSelect' onClick={() => setIsOpen(!isOpen)}>
      <span >{ char +  ": " + selectedOption}</span>
      {isOpen && <div className='dropdown'>
        {options.map((option, index) => { return <button className='btnInDw' key={index} onClick={() => { onSelectHandler(option)}}> <p className={"color_"+option}> {option}</p></button> })}
      </div>}
    </div>
  )
}
