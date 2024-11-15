import { createContext, useContext, useEffect, useState } from "react";

const StorefrontContext = createContext();

export const StorefrontProvider = ({ children }) => {
  const [storefronts, setStorefronts] = useState([]);
  const [targetStore, setTargetStore] = useState({});
  const [urls, setUrls] = useState([]);

  const updateStorefronts = (newEntities) => {
    setStorefronts(newEntities);
    const newUrls = newEntities.map((entity) => entity.brand.siteUrl);
    setUrls(newUrls);
    localStorage.setItem("storefronts", JSON.stringify(newUrls));
  };

  const updateTargetStore = (storefront) => {
    setTargetStore(storefront);
  };

  // 

  const value = {
    storefronts,
    updateStorefronts,
    targetStore,
    updateTargetStore,
  };

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
};

export const useStorefront = () => {
  return useContext(StorefrontContext);
};
