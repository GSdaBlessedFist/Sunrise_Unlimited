import { createContext, useContext, useEffect, useState } from "react";

const StorefrontContext = createContext();
export const StorefrontProvider = ({ children }) => {
    const [storefronts, setStorefronts] = useState([]);
    const [targetStore,setTargetStore] = useState({});
    
    const updateStorefronts = (newEntities) => {
        setStorefronts(newEntities);
    };

    const updateTargetStore = (storefront) => {
        setTargetStore(storefront);
    }

    useEffect(() => {
        // if (storefronts && storefronts.length > 0) {
        //     console.log(Object.entries(storefronts[0]));
        // }
        console.log(targetStore)
    }, [storefronts,targetStore]);

    return (
        <StorefrontContext.Provider value={{ storefronts, updateStorefronts,targetStore,updateTargetStore }}>
            {children}
        </StorefrontContext.Provider>
    );
};

export const useStorefront = () => {
    return useContext(StorefrontContext);
};


