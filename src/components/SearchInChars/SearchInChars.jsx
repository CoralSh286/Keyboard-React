import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './style.css';

export default function SearchInChars({ text }) {
    console.log("text", text);
    
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
    
    console.log(`Found ${foundIndices.length} matches for "${searchQuery}"`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    setSearchQuery('');
    setResults([]);
  }, [text]);

  return (
    <div className="search-chars-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search in text..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
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