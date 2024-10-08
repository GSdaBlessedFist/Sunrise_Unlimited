import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useStorefront } from '../../Providers/StorefrontProvider'; 

function SearchResults({query,searchResults}) {
    const { storefronts, updateStorefronts,updateTargetStore } = useStorefront();
    const router = useRouter();
    
    const selectResult = (store) => {
        updateTargetStore(store)
        router.push(`/renderPage?query=${query}&destination=${store.brand?.name.split(/[. ]+/).join('')}`);
    };

    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    useEffect(() => {
        if (searchResults['storefrontEntities']) {
            updateStorefronts(searchResults['storefrontEntities']);
        }
    }, [searchResults, updateStorefronts]);

    useEffect(() =>{
        console.log(`storefronts: ${storefronts}`)
    },[storefronts]);


    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    

    return (
        <div className={styles.searchResults}>
            {storefronts.map((store, index) => (
                <Result key={index} onClick={() => selectResult(store)}>
                    <div className={styles.storeName}>{store?.brand?.name}</div>
                </Result>
            ))}
        </div>
    );
}

export default SearchResults;

function Result({children, onClick}) {
    return (
        <button className="mx-auto w-full" onClick={onClick}>
            <div className={styles.result}>
                {children}
            </div>
        </button>
    );
}