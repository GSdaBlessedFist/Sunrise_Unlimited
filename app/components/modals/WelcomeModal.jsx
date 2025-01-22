import { useEffect, useState } from "react";
import styles from "./welcomeModal.module.scss";
import { FaSearch } from "react-icons/fa";
import CloseButton from "../CloseButton";
import { useEntryDoorsAction } from "../../Providers/EntryDoorsProvider";

function WelcomeModal({userInfo}) {

    // const [isOpen, setIsOpen] = useState(true);
    const [modalContent,setModalContent] = useState(null);
    const {welcomeIsOpen,setWelcomeIsOpen,handleSlidingDoors} = useEntryDoorsAction()

    const handleClose = () => {
      setWelcomeIsOpen(false); // Close the modal
      
    };

    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    //WelcomeModal content selection
    useEffect(() => {
        switch (userInfo.userType) {
          case "guest":
            setModalContent(
              <>
                <div className={styles.guestStyle}>
                  <div className={styles.modalHeader}>Welcome to Sunrise Unlmtd</div>
                  <div className="w-24 h-6 font-thin italic text-white">Navigation</div>
                  <ol>
                    <li>By default, you’ll be taken to your destination storefront</li>
                    <li>At anytime, you can look around with the mouse</li>
                    <li>
                      To change your destination, either click on the storefront brand sign as you
                      pass it OR{" "}
                    </li>
                  </ol>
                  <div id="mock-searchbar" className="w-full">
                    <div className="absolute flex items-center justify-end right-[68px] bottom-24 w-52 h-6 bg-white overflow-hidden">
                      <div className="p-2 bg-blue-300">
                        <FaSearch color="white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex items-center justify-center text-2xl italic">Thanks for visiting, enjoy.</div>
              </>
            );
            break;
          case "member":
            setModalContent(<>
                <div className={styles.memberStyle}>
                    <div className={styles.modalHeader}>Welcome back, {userInfo.screenName}</div>
                </div>
            </>);
            break;
          case "storeowner":
            break;
          default:
            setModalContent(null);
            break;
        }
        
        
    },[userInfo.screenName,userInfo.userType]);

    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    return (<>
        {welcomeIsOpen && 
            <div id="shaderBG" className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
                style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div className={styles.welcomeModalContainer}>
                <div className="ml-auto w-5 h-5 scale-75">
                    <CloseButton setIsOpen={setWelcomeIsOpen} onClick={handleClose}/>
                </div>
              <div>{modalContent}</div>
            </div>
          </div>
        }
    </>);
}

export default WelcomeModal;