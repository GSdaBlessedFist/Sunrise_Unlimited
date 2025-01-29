import React, { createContext, useContext, useEffect, useState } from "react";

const CameraContext = createContext(undefined);

export const CameraProvider = ({ children }) => {
  const [activeCamera, setActiveCamera] = useState("entry_Camera");
  const [activateWASDControls,setActivateWASDControls] = useState(false);

  useEffect(() => {
    //console.log("activateWASDControls:", activateWASDControls);
  },[activateWASDControls]);

  const values = { activeCamera, setActiveCamera,activateWASDControls,setActivateWASDControls }

  return (
    <CameraContext.Provider value={values}>
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
