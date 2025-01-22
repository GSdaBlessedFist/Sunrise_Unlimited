import React, { createContext, useContext, useEffect, useState } from "react";

const CameraContext = createContext(undefined);

export const CameraProvider = ({ children }) => {
  const [activeCamera, setActiveCamera] = useState("entry_Camera");


  useEffect(() => {
    //console.log("ActiveCamera:", activeCamera);
  },[activeCamera]);

  return (
    <CameraContext.Provider value={{ activeCamera, setActiveCamera }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
};
