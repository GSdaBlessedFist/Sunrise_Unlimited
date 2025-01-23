import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import CustomScrollBar from "../../components/CustomScrollbar/CustomScrollbar";
import styles from "../styles.module.scss";
import gsap from "gsap";

const posts = [
  {
    id: 1,
    name: "So-n-so",
    message: "This is a test message and I'd like to go onabort.",
    emoji: "👍",
  },
  {
    id: 2,
    name: "Dew Daddy",
    message: "Dew Dad dropping a line",
    emoji: "🔥",
  },
  {
    id: 3,
    name: "ThomasX",
    message: "Riddle me this AND that.",
    emoji: "🔥",
  },
  {
    id: 4,
    name: "LeetCoder",
    message: "New to this",
    emoji: "🔥",
  },
];

function RightPanel() {
  const pathname = usePathname();
  const scrollContainerRef = useRef(null);
  const [logIsOpen,setLogIsOpen] = useState(false);
  const signInRef = useRef(null);
  const [signInIsOpen,setSignInIsOpen] = useState(false);
  const [signInEntry,setSignInEntry] = useState({});
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////


  // Scroll up function
  
  function scrollUp(){
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: -50, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };
  // Scroll down function
  function scrollDown(){
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 50, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  function handleAddToLog(){
    //1)close ui
    //2)add "pending approval" message
    //3)POST to signInEntry
    console.log("3)POST to signInEntry")
  }
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  const contentWrapper = () => {
    if (pathname === "/") {
      return null;
    } else {
      return (
        <>
          <div className={styles.mallSpaceRightPanelItem}>
            {/* VISITOR LOG */}
            <div className={styles.visitorLogSection}>
              <div className={styles.uiButton} onClick={() => setLogIsOpen(!logIsOpen)}>
                Visitors Log
              </div>
              {logIsOpen ? (
                <div
                  ref={scrollContainerRef}
                  className={`${styles.visitorLogPosts}  overflow-y-auto `}>
                  <CustomScrollBar>
                    <VisitorLogPosts posts={posts} />
                  </CustomScrollBar>
                </div>
              ) : null}
              {/* SIGN IN */}
              <div className="w-full flex justify-end mt-4">
                <button
                  ref={signInRef}
                  style={{
                    background:"var(--blueSpot)"}}
                  className={styles.uiButton}
                  onClick={() => setSignInIsOpen(!signInIsOpen)}>
                  Sign In
                </button>
              </div>
              {signInIsOpen ? (
                <div className={styles.signInSection}>
                  <SignInForm setSignInEntry={setSignInEntry} />
                </div>
              ) : null}
              {signInEntry.name?.length > 5 
              && signInEntry.emoji?.length > 1
                ? (<button style={{background:"var(--greenSpot)",marginTop:"20px"}} className={styles.uiButton} onClick={handleAddToLog}>Add to Log</button>)
                : null}
            </div>
          </div>
        </>
      );
    }
  };
  //////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////

  useEffect(() => {
    // Animate the log opening and closing
    gsap.to(scrollContainerRef.current, {
      height: logIsOpen ? "300px" : "0px",
      duration: .75,
      ease: "power3.out"
    });
  }, [logIsOpen]);

  useEffect(() => {
    if(!signInIsOpen) {
      setSignInEntry({})
    }
  },[signInIsOpen]);
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  return (
    <div style={{ background: pathname === "/" ? "var(--baseBackground)" : "var(--blueSpotDark)", }} 
    className={styles.rightPanel} >
      {contentWrapper()}
    </div>
  );
}

export default RightPanel;

const VisitorLogPosts = ({ posts }) => {
  return (
    <>
      {posts.map((post, index) => (
        <VisitorLogPostItem
          key={index}
          name={post.name}
          message={post.message}
          emoji={post.emoji}
        />
      ))}
    </>
  );
};

const VisitorLogPostItem = ({ name, message, emoji, orientation = 0 }) => {
  return (
    <div className={styles.visitorLogPostItem}>
      <div className={styles.visitorLogEmoji}>{emoji}</div>
      <div className={styles.visitorLogPostItemMessage}>
        <div className="text-xl font-bold">
          {name}
          <span className="text-base font-normal opacity-70">
            <br/>&nbsp;says:
          </span>
        </div>
        <div>
          <span className="italic text-lg text-[var(--blueSpotLight)] leading-[3px]">
            &quot;{message}&quot;
          </span>
        </div>
      </div>
    </div>
  );
};

const SignInForm = ({setSignInEntry})=>{
  return (
    <>
      <div className={styles.signInForm}>
        <div className={styles.emojiRow}>
          <span onClick={() => setSignInEntry((prev) => ({ ...prev, emoji: "🔥" }))}>🔥</span>
          <span onClick={() => setSignInEntry((prev) => ({ ...prev, emoji: "👍" }))}>👍</span>
          <span onClick={() => setSignInEntry((prev) => ({ ...prev, emoji: "😎" }))}>😎</span>
          <span onClick={() => setSignInEntry((prev) => ({ ...prev, emoji: "😯" }))}>😯</span>
        </div>
        <div className={styles.signInInput}>
          <label htmlFor="name">Name:</label>
          <input type="text" placeholder="name" onChange={(e)=>setSignInEntry((prev)=>({...prev,name:e.target.value}))}/>
        </div>
        <div className={styles.signInInput}>
          <label htmlFor="message">Message:</label>
          <input type="text" maxLength={20} placeholder="What's up?" onChange={(e)=>setSignInEntry((prev)=>({...prev,message:e.target.value}))}/>
        </div>
        
      </div>
    </>
  );
}