import styles from "./styles.module.scss";
import { FaSearch } from "react-icons/fa";
import { getStorefrontEntities } from "../../lib/actions.js";
import { useEffect } from "react";


function SearchBar({ query, setQuery, searchResults,setSearchResults }) {

  

  function updateQuery(e) {
    setQuery(e.target.value);
  }

  async function handleSearch() {
    try {
      const response = await getStorefrontEntities(query); 
      
      setSearchResults(response)

      
    } catch (error) {
      console.error('Error fetching storefronts:', error);
    }
  }

  useEffect(() => {
    console.log(`Inside SearchBar: ${searchResults}`)
  }, [searchResults]);

  return (
    <div className={styles.searchBar}>
      <div id="input-group" className={styles.inputGroup}>
        <input 
          id="input-box" 
          name="search" 
          className={styles.inputBox} 
          placeholder="candy" 
          value={query} 
          onChange={updateQuery}
        />
        <button id="input-icon" className={styles.inputIcon} onClick={handleSearch}>
          <FaSearch color="white" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;