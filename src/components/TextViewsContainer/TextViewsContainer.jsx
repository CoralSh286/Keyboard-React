import React from 'react'
import convertToReactElements from '../../CommonFunction/ConvertToReactElements/ConvertToReactElements';
import TextView from '../TextView/TextView';

export default function TextViewsContainer({filesOpen, setFilesOpen, setFileNameFocus, text, fileNameFocus, setText}) {
    
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
            setText(convertToReactElements(file.content || []));
            setFileNameFocus(file.name);
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