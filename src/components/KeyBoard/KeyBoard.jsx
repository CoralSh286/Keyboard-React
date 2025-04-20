import React, { useState } from 'react'
import RowKeyBoard from '../RowKeyBoard/RowKeyBoard';
import './style.css'
import jsonKeyBoard from './keyBoards.json'

/**
* KeyBoard Component
* 
* Virtual keyboard interface that allows users to input text.
* Supports multiple keyboard layouts including English (upper and lowercase), Hebrew, and emojis.
*/
export default function KeyBoard({setText , text}) {
    const [isUpperCase, setIsUpperCase] = useState(true);
    const [keyBoard, setKeyBoard] = useState(jsonKeyBoard.upperEnglish);
    const [isGlow, setIsGlow] = useState(true);
    const [stylingText , setStylingText] = useState({
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Arial'
    })

     /**
    * Changes the keyboard layout based on selection
    */
    const changeKeyBoard = (changeTo) => {
        switch (changeTo) {
            case "He":
                setKeyBoard(jsonKeyBoard.hebrew);
                break;
            case "En":
                setKeyBoard(jsonKeyBoard.lowerEnglish);
                break;
            case "emoji":
                setKeyBoard(jsonKeyBoard.emojis);
                break;
            case "CapsLock":
                setIsUpperCase(!isUpperCase);
                setKeyBoard(isUpperCase ? jsonKeyBoard.upperEnglish : jsonKeyBoard.lowerEnglish);
                break;
        }
    }
    return (
        <div className={`keyboard ${isGlow ? 'Glow' : ''}`}>
            {
                keyBoard.map((arrOfKeys, i) => {
                    return <RowKeyBoard
                    setIsGlow={setIsGlow}
                    text={text}
                        key={"RowKeyBoard" + i}
                        setIsUpperCase={setIsUpperCase}
                        setText={setText}
                        setStylingText={setStylingText}
                        stylingText={stylingText}
                        changeKeyBoard={changeKeyBoard}
                        arrOfRowChars={arrOfKeys} />
                })
            }
        </div>
    )
}
