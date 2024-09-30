"use client"
import { usePathname } from 'next/navigation';

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
    <footer style={{height:height}} className="fixed bottom-0  w-full flex justify-center items-center border-t-4 border-t-white">
        {renderFooterContent()}
    </footer>
  );
};

export default Footer;
