import React, { useState } from "react";
import "./style.css";
import options from "./options.json"; 

/**
* ChangeAllText Component
* 
* Provides text styling controls to modify the appearance of all text in the editor.
* Allows users to change font size, color, and font family of the entire text content.
*/
export default function ChangeAllText({  text , setText }) {
  const [style , setStyle] = useState({
    color:"black",
    fontSize:"20px",
    fontFamily:"Arial"
  })

   /**
  * Updates the style of all text elements
  */
  const updateTextStyle = (elements, newStyle) => {
    return elements.map((el, index) => {
      if (typeof el === "string") {
        return <span key={index} style={newStyle}>{el}</span>;
      }
      return React.cloneElement(el, { style: { ...el.props.style, ...newStyle } });
    });
  };
  
   /**
  * Handles style changes from select inputs
  * Updates both local style state and applies style to text content
  */
  const handelSelectChange = (key , value)=>{
    const newStyle = {...style , [key]:value}
    setStyle(newStyle)
    setText(updateTextStyle(text , {[key]:value}))
  }

  return (
    <div className="ChangeAllText">
      <label>
        <select onChange={(e)=>{handelSelectChange("fontSize", e.target.value)}}>
          {options.Size.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label>
        <select onChange={(e)=>{handelSelectChange("color", e.target.value)}}>
          {options.Colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        <select onChange={(e)=>{handelSelectChange("fontFamily", e.target.value)}}>
          {options.Fonts.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
