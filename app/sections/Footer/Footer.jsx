"use client"
import { usePathname } from 'next/navigation';
import styles from "../styles.module.scss";

const Footer = ({height}) => {
  const pathname = usePathname();


  //*** The Footer will have differnt content/controls***//
  const renderFooterContent = () => {
    switch (pathname) {
        case '/':
          return <h1>Sunrise Unlimited!</h1>;
        case '/inside':
          return <h1>inside controls</h1>;
        default:
          return <h1>Default Footer</h1>;
      }
  };

  return (
    <footer style={{height:height}} className={styles.footer}>
        {renderFooterContent()}
    </footer>
  );
};

export default Footer;
