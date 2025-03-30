import React from 'react'
import './style.css'

export default function KeyBoardBtn(props) {
  const onKeyPressHandel = (char) => {
    switch (char) {
      case 'delete':
        return props.setText(prevText => prevText.slice(0, -1))
      case 'Delete All':
        return props.setText("")
      case 'Tab':
        return props.setText(prevText => [...prevText, '    '])
      case 'RGB':
        console.log('RGB')
        return props.setIsGlow(perv => perv === true ? false : true)
      case 'Enter':
        return props.setText(prevText => [...prevText, <br key={prevText.length} />])
      case 'Shift':
      case 'Ctrl':
      case 'Alt':
        return
      case 'Space':
        return props.setText(prevText => [...prevText, ' '])
      case 'He':
      case 'En':
      case 'emoji':
      case 'CapsLock':
        return props.changeKeyBoard(char)
      default:
        return props.setText(prevText => [
          ...prevText,
          <span key={prevText.length} style={props.stylingText}>
            {props.char}
          </span>
        ])
    }
  }

  return (
    <button className='keyBoardBtn' onClick={() => onKeyPressHandel(props.char)}>
      {props.char}
    </button>
  )
}
