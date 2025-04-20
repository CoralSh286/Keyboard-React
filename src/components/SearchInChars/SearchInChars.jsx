import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './style.css';

/**
* SearchInChars Component
* 
* Provides text search functionality to find occurrences of a search query within text content.
* Displays search results with position indices and matched text.
*/
export default function SearchInChars({ text }) {
    
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

   /**
  * Updates the search query when input changes
  */
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

   /**
  * Executes the search operation
  * Finds all occurrences of the search query in the text
  * and populates results with position indices and matched text
  */
  const handleSearch = () => {
    if (!searchQuery.trim() || !text) return;
    
    setIsSearching(true);
    
    const foundIndices = [];
    let startIndex = 0;
    let index;
    const searchQueryLower = searchQuery.toLowerCase();
    const textLower = text.toLowerCase();

    while ((index = textLower.indexOf(searchQueryLower, startIndex)) > -1) {
      foundIndices.push({
        index,
        matchedText: text.substring(index, index + searchQuery.length)
      });
      startIndex = index + 1;
    }
    setResults(foundIndices);
    setIsSearching(false);
  
  };

   /**
  * Triggers search when Enter key is pressed
  */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-chars-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search in text..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button 
          className="search-button"
          onClick={handleSearch}
          disabled={isSearching || !searchQuery.trim()}
        >
          <FaSearch className="search-icon" />
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="search-results">
          <p className="results-count">{results.length} match{results.length !== 1 ? 'es' : ''} found</p>
          <div className="matches-list">
            {results.map((result, idx) => (
              <div key={idx} className="match-item">
                <span className="match-index">Position Index: {result.index}</span>
                <span className="match-text">&quot; {result.matchedText} &quot;</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}