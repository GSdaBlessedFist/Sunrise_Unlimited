import styles from "./styles.module.scss";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import { useStorefront } from "../../Providers/StorefrontProvider";
import p from "../../helpers/consoleHelper";

const SOURCE = "SearchBar";
const srcColor = 45;

function SearchBar({ query, setQuery,setSearchResults, setSearchPerformed }) {

  const { updateStorefronts } = useStorefront();

  function updateQuery(e) {
    setQuery(e.target.value);
  }

  async function handleSearch() {
    p(SOURCE,query,srcColor,"query");

    try {
      const response = await fetch(`/api/storefronts?q=${query}`);
      const storefrontData = await response.json();
      p(SOURCE, storefrontData, srcColor, "Fetched storefront data:");

      const additionalStorefront = {
        brand: { siteUrl: query },
      };

      updateStorefronts(storefrontData.storefronts);//
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching storefront data:", error);
    }
  }

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