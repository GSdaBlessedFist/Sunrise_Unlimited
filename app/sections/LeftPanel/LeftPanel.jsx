
import { usePathname } from "next/navigation";
import { useCamera } from "../../Providers/CameraProvider";
import { useStorefront } from "../../Providers/StorefrontProvider";
import styles from "../styles.module.scss";
import { useEffect, useState } from "react";

function LeftPanel() {
  const pathname = usePathname();
  const { setActiveCamera } = useCamera();
  const {storefronts} = useStorefront();

  

  function changeCamera(camera) {
    setActiveCamera(camera);
  }

  const contentWrapper = () => {
    if (pathname !== "/") {
      if (!storefronts || storefronts.length === 0) {
        return null; 
      }

      return (
        <>
          <div className={styles.mallSpaceLeftPanelItem }>
            <div className={styles.navigationSection}>
            {storefronts.length > 1 ? (
              <div className={styles.uiButton}>Load more...</div>
            ):null}
            <button onClick={() => changeCamera("gamePad_Camera")} className={styles.uiButton} >
              Game Pad
            </button>
            <button onClick={() => changeCamera("big-screens_Camera")} className={styles.uiButton} >
              Big Screen
            </button>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  // useEffect(() => {
  //   contentWrapper();
  // },[]);

  return (
    <div style={{background:(pathname === "/")?"var(--baseBackground)":"var(--blueSpotDark)"}} className={styles.leftPanel}>
      {contentWrapper()}
    </div>
  );
  
  
}

export default LeftPanel;

