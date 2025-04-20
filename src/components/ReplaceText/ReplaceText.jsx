/** @format */

import React, { useState, useEffect } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import "./style.css";
import reactElementsToString from "../../CommonFunction/ElementToStringConvertor/elementToStringConvertor";

/**
 * ReplaceText Component
 * 
 * Provides text find and replace functionality with options to replace first occurrence
 * or all occurrences of a specified text string.
 */
export default function ReplaceText({ text, setText }) {
  const [findQuery, setFindQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [occurrences, setOccurrences] = useState(0);

    /**
   * Updates the find query when input changes
   */
  const handleFindChange = (e) => {
    setFindQuery(e.target.value);
  };

   /**
   * Updates the replace query when input changes
   */
  const handleReplaceChange = (e) => {
    setReplaceQuery(e.target.value);
  };

   /**
   * Calculates and updates the number of search query occurrences in text
   * whenever the find query or text changes
   */
  useEffect(() => {
    if (!findQuery.trim() || !text) {
      setOccurrences(0);
      return;
    }

    // Count occurrences of findQuery in text
    let count = 0;
    let tempText = reactElementsToString(text);

    const findLower = findQuery.toLowerCase();
    const textLower = tempText.toLowerCase();
    let index = 0;

    while ((index = textLower.indexOf(findLower, index)) > -1) {
      count++;
      index += findLower.length;
    }

    setOccurrences(count);
  }, [findQuery, text]);

   /**
   * Replaces all occurrences of findQuery with replaceQuery in text
   * Handles different types of text content (arrays, strings, React elements)
   */
  const handleReplaceAll = () => {
    if (!findQuery.trim() || !text) return;
    if (Array.isArray(text)) {
      const newElements = [];
      let modifiedText = false;

      // Process each element
      for (let i = 0; i < text.length; i++) {
        const element = text[i];

        // Handle string elements
        if (typeof element === "string") {
          const regex = new RegExp(escapeRegExp(findQuery), "gi");

          if (regex.test(element)) {
            regex.lastIndex = 0;
            const newString = element.replace(regex, replaceQuery);
            console.log(
              `Replaced in string element. Before: "${element}", After: "${newString}"`
            );
            newElements.push(newString);
            modifiedText = true;
          } else {
            newElements.push(element);
          }
        }
        // Handle React elements
        else if (element && typeof element === "object" && element.$$typeof) {
          console.log(`Processing React element at index ${i}`);

          if (element.props && typeof element.props.children === "string") {
            const childText = element.props.children;
            const regex = new RegExp(escapeRegExp(findQuery), "gi");

            if (regex.test(childText)) {
              // Reset regex state after testing
              regex.lastIndex = 0;
              const newChildText = childText.replace(regex, replaceQuery);

              console.log(`Replaced`, element.props.style);
              const newElement = React.cloneElement(element, {
                ...element.props,
                children: newChildText,
                style: element.props.style,
              });
              newElements.push(newElement);
              modifiedText = true;
            } else {
              newElements.push(element);
            }
          } else {
            // For elements with complex children or no children, just keep them as is
            newElements.push(element);
          }
        } else {
          newElements.push(element);
        }
      }

      if (modifiedText) {
        setText(newElements);
      } else {
        console.log("No modifications were made to any element");
      }
    } else if (typeof text === "string") {
      const regex = new RegExp(escapeRegExp(findQuery), "gi");
      const newText = text.replace(regex, replaceQuery);
      setText(newText);
    }

    setFindQuery("");
    setReplaceQuery("");
  };

   /**
   * Replaces only the first occurrence of findQuery with replaceQuery in text
   * Handles different types of text content (arrays, strings, React elements)
   */
  const handleReplaceFirst = () => {
    if (!findQuery.trim() || !text) return;

    if (Array.isArray(text)) {
      console.log("Replacing first occurrence in array of React elements");

      const newElements = [...text];
      let replaced = false;

      for (let i = 0; i < text.length && !replaced; i++) {
        const element = text[i];

        if (typeof element === "string") {
          console.log(`Processing string element at index ${i}:`, element);
          const regex = new RegExp(escapeRegExp(findQuery), "i");
          const match = element.match(regex);

          if (match) {
            const index = match.index;
            const matchedText = match[0]; // The actual text that matched
            const newString =
              element.substring(0, index) +
              replaceQuery +
              element.substring(index + matchedText.length);

            console.log(
              `Replaced in string. Before: "${element}", After: "${newString}"`
            );
            newElements[i] = newString;
            replaced = true;
          }
        }
        // Handle React elements
        else if (element && typeof element === "object" && element.$$typeof) {
          console.log(`Processing React element at index ${i}`);

          if (element.props && typeof element.props.children === "string") {
            const childText = element.props.children;
            const regex = new RegExp(escapeRegExp(findQuery), "i");
            const match = childText.match(regex);

            if (match) {
              const index = match.index;
              const matchedText = match[0];
              const newChildText =
                childText.substring(0, index) +
                replaceQuery +
                childText.substring(index + matchedText.length);

              newElements[i] = React.cloneElement(element, {
                ...element.props,
                children: newChildText,
                style: element.props.style,
              });
              replaced = true;
            }
          }
        }
      }

      if (replaced) {
        console.log(
          "First occurrence was replaced, setting new elements array"
        );
        setText(newElements);
      } else {
        console.log("No replacements were made");
      }
    } else if (typeof text === "string") {
      // Simple case: string text
      const regex = new RegExp(escapeRegExp(findQuery), "i");
      const match = text.match(regex);

      if (match) {
        const index = match.index;
        const matchedText = match[0];
        const newText =
          text.substring(0, index) +
          replaceQuery +
          text.substring(index + matchedText.length);
        setText(newText);
      }
    }
  };

    /**
   * Helper function to escape special characters for use in a regular expression
   */
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  return (
    <div className="replace-text-container">
      <div className="replace-input-group">
        <label className="replace-label">Find:</label>
        <input
          type="text"
          className="replace-input"
          value={findQuery}
          onChange={handleFindChange}
          placeholder="Text to find..."
        />
        {occurrences > 0 && (
          <span className="occurrences-badge">{occurrences}</span>
        )}
      </div>

      <div className="replace-input-group">
        <label className="replace-label">Replace with:</label>
        <input
          type="text"
          className="replace-input"
          value={replaceQuery}
          onChange={handleReplaceChange}
          placeholder="New text..."
        />
      </div>

      <div className="replace-actions">
        <button
          className="replace-button"
          onClick={handleReplaceFirst}
          disabled={!findQuery.trim() || occurrences === 0}
        >
          Replace First
        </button>
        <button
          className="replace-button replace-all"
          onClick={handleReplaceAll}
          disabled={!findQuery.trim() || occurrences === 0}
        >
          <FaExchangeAlt className="replace-icon" />
          <span>Replace All ({occurrences})</span>
        </button>
      </div>
    </div>
  );
}
