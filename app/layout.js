"use client"
import "./globals.css";
import Header from "./sections/Header/Header";
import Footer from "./sections/Footer/Footer";
import { useEffect, useState } from "react";



// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const headerFooterHeight = 70;

export default function RootLayout({ children }) {
  const [mainSectionHeight, setMainSectionHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const height = window.innerHeight - (headerFooterHeight * 2);
      setMainSectionHeight(height);
    };

    updateHeight(); // Set initial height
    window.addEventListener('resize', updateHeight); // Update height on window resize

    return () => {
      window.removeEventListener('resize', updateHeight); // Cleanup listener on unmount
    };
  }, []);

  return (
    <html lang="en">
      <body >
        <Header height={headerFooterHeight}/>
        <main  style={{height:mainSectionHeight  + "px"}}  className="w-full  bg-slate-800 flex justify-center items-center ">
          {children}
        </main>
        <Footer height={headerFooterHeight}/>
      </body>
    </html>
  );
}
