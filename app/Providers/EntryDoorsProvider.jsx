import { createContext, useContext, useEffect, useState } from "react"; 
import p from "../helpers/consoleHelper"; 
//@ p = function (sourceName,data, hue=25, variableName="")

const SOURCE = "EntrydoorsProvider ";
const srcColor = 45;

const EntryDoorsContext = createContext();

export const EntryDoorsProvider=({children})=> {
  const [welcomeIsOpen, setWelcomeIsOpen] = useState(true);
    const [slidingDoorsOpen,setSlidingDoorsOpen] = useState(false);

    function handleSlidingDoors(){
        if(!welcomeIsOpen){
          setSlidingDoorsOpen(!slidingDoorsOpen);
        }
    }

    useEffect(()=>{
        p(SOURCE,slidingDoorsOpen,srcColor,"slidingDoorsOpen:")
    },[slidingDoorsOpen]);

    const value = {
      welcomeIsOpen,
      setWelcomeIsOpen,
      slidingDoorsOpen,
      handleSlidingDoors
    }
    return (<
        EntryDoorsContext.Provider value={value}>
          {children}
        </EntryDoorsContext.Provider>
      );
}

export const useEntryDoorsAction = () => {
  return useContext(EntryDoorsContext);
};