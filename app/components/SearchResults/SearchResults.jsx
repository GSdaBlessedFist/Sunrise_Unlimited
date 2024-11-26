import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useStorefront } from '../../Providers/StorefrontProvider'; 
import p from "../../helpers/consoleHelper";

const SOURCE = "SearchResults ";
const srcColor = 56;
function SearchResults({query,searchPerformed}) {
    
    
    const { storefronts,updateTargetStore } = useStorefront();
    const router = useRouter();
    
    const selectResult = (store) => {
      updateTargetStore(store)
      const destination = store.brand?.name.split(/[. ]+/).join('') || '';
      router.push(`/renderPage?query=${query}&destination=${destination}`);
    };

    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    useEffect(() => {
      p(SOURCE,storefronts,srcColor,"Storefronts:");
    }, [storefronts]);
    

    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    // Handle no results after search
    if (searchPerformed && (!storefronts || storefronts.length === 0)) {
        return <div>No stores found for this tag.</div>;
      }
    
      return (
        <div className={styles.searchResults}>
          {searchPerformed && storefronts.map((store, index) => (
            <Result key={index} onClick={() => selectResult(store)}>
              <div className={styles.storeName}>{store.brand?.name}</div>
            </Result>
          ))}
        </div>
      );
    }
    
    function Result({ children, onClick }) {
      return (
        <button className="mx-auto w-full" onClick={onClick}>
          <div className={styles.result}>{children}</div>
        </button>
      );
    }
    
    export default SearchResults;