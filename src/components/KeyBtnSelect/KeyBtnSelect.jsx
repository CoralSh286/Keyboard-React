/** @format */

import React, { useState } from "react";
import "./style.css";
import selectOptions from "./options.json";

/**
 * KeyBtnSelect Component
 *
 * Renders a dropdown select button for the virtual keyboard.
 * Used for selecting text styling options such as colors, font sizes, and font families.
 */
export default function KeyBtnSelect({ char, stylingText, setStylingText }) {
  const options = selectOptions[char];
  const [isOpen, setIsOpen] = useState(false);

   /**
  * Determines which property value to display based on select type
  */
  let selectedOption =
    char === "Colors"
      ? stylingText.color
      : char === "Size"
      ? stylingText.fontSize
      : stylingText.fontFamily;

  /**
  * Handles option selection from dropdown
  * Updates the appropriate styling property based on select type
  */
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
  };
  
  return (
    <div className="KeyBtnSelect" onClick={() => setIsOpen(!isOpen)}>
      <span>{char + ": " + selectedOption}</span>
      {isOpen && (
        <div className="dropdown">
          {options.map((option, index) => {
            return (
              <button
                className="btnInDw"
                key={index}
                onClick={() => {
                  onSelectHandler(option);
                }}
              >
                {" "}
                <p className={"color_" + option}> {option}</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
