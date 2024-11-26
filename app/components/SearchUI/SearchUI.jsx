"use client"
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import TagRow from "../TagRow/TagRow";
import styles from "./styles.module.scss";
import { useStorefront } from "../../Providers/StorefrontProvider";
import p from "../../helpers/consoleHelper";
//@ p = function (sourceName,data, hue=25, variableName="")

const SOURCE = "SearchUI off";
const srcColor = 25;

function SearchUI() {

  const [query,setQuery] = useState("");
  const [searchResults,setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  const { storefronts } = useStorefront();

////////////////////////////////////////////////
////////////////////////////////////////////////
//////////////////////////////////////////////////

  useEffect(() => {
    p(SOURCE,storefronts,srcColor,"Storefronts:");
  }, [storefronts]);

  useEffect(() => {
    p(SOURCE,searchResults,srcColor,"SearchResults:");
  }, [searchResults]);

////////////////////////////////////////////////
////////////////////////////////////////////////
//////////////////////////////////////////////////


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
        <SearchResults query={query} searchPerformed={searchPerformed}/>
      </div>
    );
}

export default SearchUI;

