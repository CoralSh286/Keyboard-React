/**
 * Extracts style and text from a React element or array of elements
 */
export const extractStyleAndText = (element) => {
    // Handle null or undefined
    if (!element) {
      return null;
    }
  
    // Handle array case directly in this function
    if (Array.isArray(element)) {
      return element
        .map(item => extractStyleAndText(item))
        .filter(item => item !== null);
    }
    
    // Handle string case
    if (typeof element === 'string') {
      return { text: element, style: {} };
    }
    
    // Handle non-object case
    if (typeof element !== 'object') {
      return null;
    }
    
    // Handle React element case
    if (element.$$typeof) {
      const result = {
        text: '',
        style: element.props?.style || {}
      };
      
      if (element.props?.children) {
        if (typeof element.props.children === 'string') {
          result.text = element.props.children;
        } 
        else if (Array.isArray(element.props.children)) {
          result.text = element.props.children
            .map(child => {
              if (typeof child === 'string') {
                return child;
              } else if (child && child.$$typeof) {
                const extracted = extractStyleAndText(child);
                return extracted ? extracted.text : '';
              }
              return '';
            })
            .join(' ');
        }
        else if (element.props.children.$$typeof) {
          const extracted = extractStyleAndText(element.props.children);
          if (extracted) {
            result.text = extracted.text;
          }
        }
      }
      
      return result;
    }
    
    // If not a React element or array, return null
    return null;
  };
  
  // This function is no longer needed since the array handling is in extractStyleAndText
  // Keeping it for backward compatibility
  export const processContent = (content) => {
    return extractStyleAndText(content);
  };