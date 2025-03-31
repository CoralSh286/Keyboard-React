import React from 'react'
import './style.css'

export default function TextView({ text = [], isOnFocus = false }) {
    return (
        <div className={`textView ${isOnFocus ? "isOnFocus" : ""}`} >
            {text}
            <span className='marker'></span>
            {(!text || text?.length === 0) && <p className='placeholder'>Start typing... </p>}
        </div>
    )
}