"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {

    const [userInfo,setUserInfo] = useState({
        name: "Jason",
        screenName: "Jason45",
        userType:"guest"
    });
    
    const updateUserInfo = (userInfo)=> {
        setUserInfo(userInfo)
    }
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    
    
    useEffect(() => {
        console.log({userInfo})
    }, []);
    
    
    
    
    
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    
    

    return (
        <UserInfoContext.Provider value={{userInfo,updateUserInfo}}>
            {children}
        </UserInfoContext.Provider>
    );
};

export const useUserInfo = () => {
    return useContext(UserInfoContext);
};


