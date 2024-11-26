"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import p from "../../helpers/consoleHelper";
import { useStorefront } from "../../Providers/StorefrontProvider";
//import p from "../helpers/consoleHelper"; 
//@ p = function (sourceName,data, hue=25, variableName="")

var SOURCE;
var srcColor;

function TagRow({ setSearchResults, setQuery, setSearchPerformed }) {
  SOURCE = "Tag ROW";
  srcColor = 35;
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch("/api/initialTags")
        if (!response.ok) {throw new Error(`HTTP error! Status: ${response.status}`);}
        const data = await response.json();
        setTags(data.tags || []);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }
    fetchTags();
  }, []);

  return (
    <div className={styles.tagRow}>
      {tags.map((tag, index) => (
        <TagButton
          key={index}
          name={tag}
          setQuery={setQuery}
          setSearchResults={setSearchResults}
          setSearchPerformed={setSearchPerformed}
        />
      ))}
    </div>
  );
}

export default TagRow;

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

function TagButton({ name, setSearchResults, setQuery, setSearchPerformed }) {

  SOURCE = "Tag BUTTON off";
  srcColor = 40;
  const { updateStorefronts } = useStorefront();

  async function handleTagSearch() {
    try {
      const response = await fetch(`/api/storefronts?q=${encodeURIComponent(name)}`)
      if (!response.ok) {throw new Error(`HTTP error! Status: ${response.status}`);}

      const data = await response.json(); // Parse the JSON response

      p(SOURCE,data,srcColor,"fetched storefronts");

      setQuery(name); // Set the query state
      setSearchResults(data.storefronts|| []);
      updateStorefronts(data.storefronts|| []);
      setSearchPerformed(true); // Indicate search was performed
    } catch (error) {
      console.error('Error fetching storefronts:', error);
    }
  }

  return (
    <button className={styles.tagButton} onClick={handleTagSearch}>
      {name}
    </button>
  );
}
