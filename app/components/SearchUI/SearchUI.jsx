"use client"
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import TagRow from "../TagRow/TagRow";
import styles from "./styles.module.scss";


function SearchUI() {

  const [query,setQuery] = useState("");
  const [searchResults,setSearchResults] = useState([""]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  

  useEffect(() => {
    console.log(`Inside Search_UI: ${searchResults}`)
  }, [searchResults]);

  

    return (
      <div id="search-ui" className={styles.searchUI}>
        <SearchBar 
          query={query} 
          setQuery={setQuery} 
          searchResults={searchResults} 
          setSearchResults={setSearchResults}
          setSearchPerformed={setSearchPerformed}
        />
        <TagRow 
          setSearchResults={setSearchResults}
          setQuery={setQuery}
          setSearchPerformed={setSearchPerformed}
        />
        <SearchResults query={query} searchResults={searchResults} searchPerformed={searchPerformed}/>
      </div>
    );
}

export default SearchUI;

