"use client"
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import TagRow from "../TagRow/TagRow";
import styles from "./styles.module.scss";

function SearchUI() {

  const [query,setQuery] = useState("");
  const [searchResults,setSearchResults] = useState([""]);

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
        />
        <TagRow 
          setSearchResults={setSearchResults}
          setQuery={setQuery}
        />
        <SearchResults searchResults={searchResults}/>
      </div>
    );
}

export default SearchUI;

