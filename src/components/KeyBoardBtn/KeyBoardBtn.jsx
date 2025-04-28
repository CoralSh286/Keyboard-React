/** @format */

import React from "react";
import "./style.css";

/**
 * KeyBoardBtn Component
 *
 * Renders an individual button for the virtual keyboard.
 * Handles different key functions including text input, special operations, and keyboard layout changes.
 */
export default function KeyBoardBtn({
  setText,
  setIsGlow,
  changeKeyBoard,
  stylingText,
  char,
  text,
}) {
  /**
   * Handles key press actions based on character/function
   * Performs different operations depending on the key type
   */
  const onKeyPressHandel = (char) => {
    switch (char) {
      case "delete":
        return setText(text.slice(0, -1));
      case "Delete All":
        return setText([]);
      case "Delete Word": {
        console.log(text);
        if (text.length === 0) return;

        let newText = [...text];

        while (newText.length > 0) {
          const lastItem = newText[newText.length - 1];

          if (
            (typeof lastItem === "string" && lastItem === " ") ||
            lastItem.props.children == " "
          ) {
            newText.pop(); 
            break;
          }

          if (React.isValidElement(lastItem) && lastItem.type === "br") {
            newText.pop();
            continue;
          }

          if (React.isValidElement(lastItem)) {
            newText.pop();
            continue;
          }

          newText.pop();
          break;
        }

        setText(newText);
        return;
      }
      case "Tab":
        return setText([...text, "    "]);
      case "RGB":
        return setIsGlow((perv) => (perv === true ? false : true));
      case "Enter":
        return setText([...text, <br key={text.length} />]);
      case "Shift":
      case "Ctrl":
      case "Alt":
        return;
      case "Space":
        return setText([...text, " "]);
      case "He":
      case "En":
      case "emoji":
      case "CapsLock":
        return changeKeyBoard(char);
      default:
        return setText([
          ...text,
          <span key={text.length} style={stylingText}>
            {char}
          </span>,
        ]);
    }
  };

  return (
    <button className="keyBoardBtn" onClick={() => onKeyPressHandel(char)}>
      {char}
    </button>
  );
}
