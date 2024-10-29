import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { FaSearch } from "react-icons/fa";
import CloseButton from "../CloseButton";

function WelcomeModal({visitorType}) {

    const [isOpen, setIsOpen] = useState(true);
    const [modalContent,setModalContent] = useState(null);

    useEffect(() => {
        switch(visitorType) {
            case "guest":
                setModalContent(
                    <div className={styles.guestStyle}>
                        <div className={styles.modalHeader}>Welcome to Sunrise Unlmtd</div>
                        <div className="w-24 h-6 font-thin italic text-white">Navigation</div>
                        <ol>
                            <li>By default, you’ll be taken to your destination storefront</li>
                            <li>At anytime, you can look around with the mouse</li>
                            <li>To change your destination, either click on the storefront brand sign as you pass it OR </li>                            
                        </ol>
                        <div className="w-full">
                            <div className="absolute flex items-center justify-end right-[68px] bottom-16 w-52 h-6 bg-white overflow-hidden">
                                <div className="p-2 bg-blue-300">
                                    <FaSearch color="white"/>
                                </div>
                            </div>
                        </div>
                    </div>
                  );
                break;
            case "member":
                setModalContent(
                    <div className={styles.memberStyle}>
                        
                    </div>
                  );
                break;
            case "storeowner":
                break;
            default:
                setModalContent(null);
                break;
        }
        
        
    },[]);

    return (<>
        {isOpen && 
            <div id="shaderBG" className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
                style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div className={styles.welcomeModalContainer}>
                <div className="ml-auto w-5 h-5 scale-75">
                    <CloseButton setIsOpen={setIsOpen}/>
                </div>
              <div>{modalContent}</div>
            </div>
          </div>
        }
    </>);
}

export default WelcomeModal;