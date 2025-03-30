import React from 'react'
import './style.css'
export default function TextView(props) {

    return (
        <div className='textView' style={props.style}>
            {props.text && props.text}
            <span className='marker'></span>
            {(!props.text || props.text?.length === 0 ) &&<p className='placeholder'>Start typing... </p>}
        </div>
    )
}
