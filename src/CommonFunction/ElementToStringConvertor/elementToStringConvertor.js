
function reactElementsToString(elements) {
    if (!Array.isArray(elements)) {
      return '';
    }
  
    return elements.map(element => {
      if (typeof element === 'string') {
        return element;
      }
      
      if (element && element.$$typeof === Symbol.for('react.element')) {
        // Check if there's text content in the props
        if (element.props) {
          // First, check children
          if (element.props.children) {
            // If children is an array, recursively convert it
            if (Array.isArray(element.props.children)) {
              return reactElementsToString(element.props.children);
            }
            // If children is a string, return it
            else if (typeof element.props.children === 'string') {
              return element.props.children;
            }
            // If children is a React element, recursively convert it
            else if (element.props.children && element.props.children.$$typeof === Symbol.for('react.element')) {
              return reactElementsToString([element.props.children]);
            }
          }
          
          // Check for dangerouslySetInnerHTML content
          if (element.props.dangerouslySetInnerHTML && element.props.dangerouslySetInnerHTML.__html) {
            // This is a simplified approach - handling HTML content properly would require an HTML parser
            return element.props.dangerouslySetInnerHTML.__html.replace(/<[^>]*>/g, '');
          }
        }
        
        // If no text content found, return empty string
        return '';
      }
      
      // For any other type of element, return empty string
      return '';
    }).join('');
  }
  

  export default reactElementsToString;