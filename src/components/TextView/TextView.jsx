import React from 'react'
import './style.css'

/**
* TextView Component
* 
* Displays text content in a formatted view with focus state indication.
* Shows a placeholder when there is no text content and displays a text cursor marker.
*/
export default function TextView({ text = [], isOnFocus = false }) {
    return (
        <div className={`textView ${isOnFocus ? "isOnFocus" : ""}`} >
            {text}
            <span className='marker'></span>
            {(!text || text?.length === 0) && <p className='placeholder'>Start typing... </p>}
        </div>
    )
}