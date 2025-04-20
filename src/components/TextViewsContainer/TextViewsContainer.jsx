import React from 'react'
import convertToReactElements from '../../CommonFunction/ConvertToReactElements/ConvertToReactElements';
import TextView from '../TextView/TextView';
import { getFileContent } from '../../CommonFunction/SetLocalStorageData/setLocalStorageData';

/**
* TextViewsContainer Component
* 
* Container component that manages and displays multiple text views for open files.
* Handles file focus, file switching, and file closing operations.
*/
export default function TextViewsContainer({filesOpen, setFilesOpen, setFileNameFocus, text, fileNameFocus, setText,user}) {
    
   /**
  * Handles closing a file tab
  * Updates the open files list and manages focus when a file is closed
  */
  const handleCloseFile = (index) => {
    const updatedFiles = [...filesOpen];
    updatedFiles.splice(index, 1);
    setFilesOpen(updatedFiles);
    
    // Handle case when the closed file was focused
    if (updatedFiles.length > 0 && filesOpen[index].name === fileNameFocus) {
      // Set focus to the first remaining file
      setFileNameFocus(updatedFiles[0].name);
      setText(convertToReactElements(updatedFiles[0].content));
    } else if (updatedFiles.length === 0) {
      // No files left, clear focus and text
      setFileNameFocus('');
      setText([]);
    }
  };

  return (
    <div className="filesContainer">
    {filesOpen.length > 0 ? (
      filesOpen.map((file, index) => (
        <div
          key={index}
          onClick={() => {
            setFileNameFocus(file.name);
            setText(convertToReactElements(getFileContent(user.username, file.name) || []));
          }}
          className={`fileContainer ${
            fileNameFocus === file.name ? "fileNameFocus" : ""
          }`}
        >
          <h3>{file.name}</h3>
          <button
            className="closeBtn"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the parent div's onClick
              handleCloseFile(index);
            }}
            aria-label="Close file"
          ></button>
          <TextView
            isOnFocus={fileNameFocus === file.name}
            text={
              fileNameFocus === file.name
                ? text
                : convertToReactElements(file.content || [])
            }
            style={{}}
          />
        </div>
      ))
    ) : (
      <TextView text={text} />
    )}
  </div>
  )
}