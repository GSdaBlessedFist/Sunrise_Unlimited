"use client"
import { usePathname } from 'next/navigation';

const Header = ({height}) => {
  const pathname = usePathname();
  

  //*** The header will have differnt content/controls***//
  const renderHeaderContent = () => {
    switch (pathname) {
        case '/':
          return <h1>Welcome to Sunrise Unlimited!</h1>;
        case '/inside':
          return <h1>inside controls</h1>;
        default:
          return <h1>Default Header</h1>;
      }
  };

  return (
    <header style={{height:height}} className="w-full flex justify-center items-center border-b-4 border-b-white">
        {renderHeaderContent()}
    </header>
  );
};

export default Header;
