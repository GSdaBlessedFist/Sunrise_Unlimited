import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LeftPanel from "../LeftPanel/LeftPanel";
import RightPanel from "../RightPanel/RightPanel";
import styles from "../styles.module.scss"
import p from "../../helpers/consoleHelper";

const SOURCE = "UI Grid off";
const srcColor = 25;


function UIGrid({children,height}) {

    

    useEffect(() => {
        p(SOURCE,height,srcColor,"headerFooterHeight:")
        
    },[])
    return (
        <div className={styles.uiGrid}>
            <Header height={height}/>
            <LeftPanel/>
            {children}
            <RightPanel/>
            <Footer height={height}/>
        </div>
    );
}

export default UIGrid;