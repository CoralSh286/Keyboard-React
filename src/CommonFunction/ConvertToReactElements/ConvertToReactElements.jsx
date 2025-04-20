/**
 * Converts various data formats to React elements
 */
const convertToReactElements = (data) => {
  // Handle null or undefined cases
  if (data === null || data === undefined) {
    return [];
  }
  
  // Handle array of text objects
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return [];
    }
    
    return data.map((item, index) => {
      if (!item) return null;
      
      return (
        <span key={index} style={item.style || {}}>
          {item.text || ""}
        </span>
      );
    }).filter(Boolean); // Filter out null items
  }

  // Handle single text object
  if (typeof data === "object" && data.text !== undefined) {
    return <span style={data.style || {}}>{data.text || ""}</span>;
  }

  // Handle string or other primitive types
  return data;
};

export default convertToReactElements;