import { createContext, useContext, useState } from "react";

const StorefrontContext = createContext();
export const StorefrontProvider = ({ children }) => {
    const [storefronts, setStorefronts] = useState([]);

    
    const updateStorefronts = (newEntities) => {
        setStorefronts(newEntities);
    };

    return (
        <StorefrontContext.Provider value={{ storefronts, updateStorefronts }}>
            {children}
        </StorefrontContext.Provider>
    );
};

export const useStorefront = () => {
    return useContext(StorefrontContext);
};


