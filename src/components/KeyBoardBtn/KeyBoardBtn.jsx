import React from 'react'
import './style.css'

export default function KeyBoardBtn({setText, setIsGlow, changeKeyBoard, stylingText, char , text}) {
  
  const onKeyPressHandel = (char) => {
    switch (char) {
      case 'delete':
        return setText(text.slice(0, -1))
      case 'Delete All':
        return setText([])
      case 'Tab':
        return setText([...text, '    '])
      case 'RGB':
        return setIsGlow(perv => perv === true ? false : true)
      case 'Enter':
        return setText([...text, <br key={text.length} />])
      case 'Shift':
      case 'Ctrl':
      case 'Alt':
        return
      case 'Space':
        return setText([...text, ' '])
      case 'He':
      case 'En':
      case 'emoji':
      case 'CapsLock':
        return changeKeyBoard(char)
      default:
        return setText([
          ...text,
          <span key={text.length} style={stylingText}>
            {char}
          </span>
        ])
    }
  }

  return (
    <button className='keyBoardBtn' onClick={() => onKeyPressHandel(char)}>
      {char}
    </button>
  )
}
