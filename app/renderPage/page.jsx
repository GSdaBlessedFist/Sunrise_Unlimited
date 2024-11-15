"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useStorefront } from "../Providers/StorefrontProvider";
import Portal from "../components/modals/Portal";
import WelcomeModal from "../components/modals/WelcomeModal";
import { useUserInfo } from "../Providers/UserInfoProvider";
import { useRouter } from "next/navigation";
// import MallLayout1 from "../components/mall_layouts/Mall_layout1.jsx";
// import MallLayout2 from "../components/mall_layouts/Mall_layout2.jsx";


function RenderPage() {
  const router = useRouter();
  const { storefronts, updateStorefronts, targetStore, updateTargetStore } = useStorefront();
  const [loadedStores,setLoadedStores] = useState([]);
  const [loadedComponents, setLoadedComponents] = useState([]);
  const [LayoutComponent, setLayoutComponent] = useState(null);
  const [welcomeModalIsOpen, setWelcomeModalIsOpen] = useState(null);

  //@ userInfo.userType options:  "guest","member","creator","storeowner";

  const { userInfo } = useUserInfo();

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  useEffect(() => {
    const fetchStorefrontData = async () => {
      // Retrieve the URLs from localStorage
      const urls = await JSON.parse(localStorage.getItem("storefronts"));
      console.log(urls)
      if (!urls || urls.length === 0) {
        console.error("No URLs found in localStorage");
        return;
      }
    
      try {
        const fetchPromises = urls.map(url =>
          fetch(`http://localhost:3001/storefrontEntities?brand.siteUrl=${url}`)
        );
    
        const responses = await Promise.all(fetchPromises);
        const data = await Promise.all(responses.map(response => response.json()));
        console.log("Fetched data:", data);
        setLoadedStores(data);
    
      } catch (error) {
        console.error("Error fetching storefront data:", error);
      }
    };

    fetchStorefrontData();
  }, [storefronts]);


  //////////////////////////////////////////

  const layoutMap = {
    1: dynamic(() => import("../components/mall_layouts/Mall_layout1.jsx"),{ssr:false}),
    2: dynamic(() => import("../components/mall_layouts/Mall_layout2.jsx"),{ssr:false}),
  };
  /*Loading the Layouts*/
  useEffect(() => {
    
    const layoutId = loadedStores.length;
    
    

    const selectedLayout = layoutMap[layoutId];
    //console.log('Selected layout:', selectedLayout);
    setLayoutComponent(() => selectedLayout);
  }, [loadedStores]);
  
//////////////////////////////////////////

useEffect(() => {
    console.log({LayoutComponent})

  }, [LayoutComponent]);

  

/////////////////////////////////////////////////////

  // useEffect(() => {
  //   if(storefronts){setWelcomeModalIsOpen(true);}

  // }, [storefronts]);

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  return (
    <>
      {welcomeModalIsOpen && (
        <Portal>
          <WelcomeModal userInfo={userInfo} />
        </Portal>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <div style={{ width: "100vw", height: "100vh" }}>
          <Canvas camera={{ position: [5, 2.25, 20], fov: 45 }}>
            <ambientLight />
            <directionalLight intensity={0.5} />
            <Suspense fallback={null}>
              {LayoutComponent && <LayoutComponent key="layout" storefronts={loadedStores} />}
            </Suspense>
          </Canvas>
          <InfoDisplay />
        </div>
      </Suspense>
    </>
  );
}
export default RenderPage;

function InfoDisplay() {
  const searchParams = useSearchParams();
  const query = searchParams ? searchParams.get("query") : null;
  const destination = searchParams ? searchParams.get("destination") : null;

  return (
    <>
      <div style={{ position: "absolute", top: "10px", left: "10px", color: "white" }}>
        <p>Query: {query}</p>
        <p>Destination: {destination}</p>
      </div>
    </>
  );
}
