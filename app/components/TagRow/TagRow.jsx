"use client"
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {getInitialTags, getStorefrontEntities} from "../../lib/actions"

function TagRow({setSearchResults,setQuery}) {
    // randomly selected tags from storefrontEntities collection
    const [initialListOfTags,setInitialListOfTags] = useState([""]);

    useEffect(() => {
        async function fetchTags() {
            const result = await getInitialTags();
            setInitialListOfTags(result.tags);
        }
        fetchTags();
    }, []);

    return (
        <div className={styles.tagRow}>
            {initialListOfTags.map((tag, index) => (
                <TagButton key={index} name={tag} setQuery={setQuery} setSearchResults={setSearchResults}/>
            ))}
        </div>
    );
}

export default TagRow;

function TagButton({name,setSearchResults,setQuery}) {

    async function handleTagSearch(){
        try {
            const response = await getStorefrontEntities(name); 
            //console.log(`Inside handleSearch: ${response}`);
            console.table(response);
            setQuery(name);
            setSearchResults(response)
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