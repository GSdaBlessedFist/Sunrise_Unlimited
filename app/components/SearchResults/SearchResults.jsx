import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function SearchResults({searchResults}) {
    const [storefronts,setStorefronts] = useState([""]);
    

    useEffect(() =>{
        setStorefronts(searchResults['storefrontEntities']);
    },[searchResults]);

    useEffect(() =>{
        console.log(`storefronts: ${storefronts}`)
    },[storefronts]);

    return (
        <div className={styles.searchResults}>
            {storefronts && storefronts.map((store,index)=>(
                <Result key={index}>
                    <button>
                        <div className={styles.storeName}>{store?.brand?.name}</div>
                    </button>
                </Result>))} 
        </div>
    );
}

export default SearchResults;

function Result({children}) {
    return (
        <button className="mx-auto w-full">
            <div className={styles.result}>
            {children}
        </div>
        </button>
    );
}