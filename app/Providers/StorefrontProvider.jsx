import { createContext, useContext, useEffect, useState } from "react"; 
import p from "../helpers/consoleHelper"; 
//@ p = function (sourceName,data, hue=25, variableName="")

const SOURCE = "StorefrontProvider off";
const srcColor = 5;

const StorefrontContext = createContext();

export const StorefrontProvider = ({ children }) => {
  const [storefronts, setStorefronts] = useState([]);
  const [targetStore, setTargetStore] = useState({});
  const [urls, setUrls] = useState([]);

  const updateStorefronts = (newEntities) => {
    setStorefronts(newEntities);
    const storefrontUrls = newEntities.map((entity) => ({ url: entity.brand.siteUrl }));
   
    setUrls({storefrontUrls});
    localStorage.setItem("storefronts", JSON.stringify(storefrontUrls));
  };

  const updateTargetStore = (storefront) => {
    setTargetStore(storefront);
    localStorage.setItem("targetStore", JSON.stringify(storefront));
  };

  const loadTargetStore = () => {
    const stored = localStorage.getItem("targetStore");
    return stored ? JSON.parse(stored) : null;
  };

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

  // useEffect(()=>{
  //   localStorage.setItem("storefronts", JSON.stringify(urls));
  // },[urls])

  useEffect(() => {
    p(SOURCE,storefronts,srcColor,"Storefronts:");
  }, [storefronts]);


  useEffect(() => {
    // const stored = loadTargetStore();
    // if (stored) setTargetStore(stored);
  }, []);


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


  const value = {
    storefronts,
    updateStorefronts,
    targetStore,
    updateTargetStore,
  };

  return (<
    StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
};

export const useStorefront = () => {
  return useContext(StorefrontContext);
};
