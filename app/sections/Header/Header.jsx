"use client"
import { usePathname } from 'next/navigation'; 
import styles from "../styles.module.scss";
import Image from 'next/image';

const Header = ({height}) => {
  const pathname = usePathname();
  

  //*** The header will have differnt content/controls***//
  const renderHeaderContent = () => {
    switch (pathname) {
        case '/':
          // return <h1>Welcome to Sunrise Unlimited!</h1>;
          return null;
        case '/inside':
          return <h1>inside controls</h1>;
        default:
          return (<>
            
              <MallSpaceHeaderUI/>
            
          </>)
      }
  };

  return (
    <header style={{height:height,border:(pathname ==="/"?"none":"")}} className={styles.header}>
        {renderHeaderContent()}
    </header>
  );
};

export default Header;


function MallSpaceHeaderUI() {
  return (
    <div className={styles.mallSpaceHeaderUI}>
        <a href='/'>
          <Image src={"/assets/logo(blue-sansBorder).png"} style={{transform:"scale(.28)"}} width={763} height={336} alt="Sunrise Unlimited logo"/>
        </a>
        
    </div>
  );
}