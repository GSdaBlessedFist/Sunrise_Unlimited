"use client";
import React, { use, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls} from "@react-three/drei"
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useStorefront } from "../Providers/StorefrontProvider";
import Portal from "../components/modals/Portal";
import WelcomeModal from "../components/modals/WelcomeModal/WelcomeModal";
import { useUserInfo } from "../Providers/UserInfoProvider";
import { useRouter, useSearchParams } from "next/navigation";
import p from "../helpers/consoleHelper";

const SOURCE = "Render Page off";
const srcColor = 75;

//////////////////////////////////////////////////////////////////////////////////

function RenderPage() {
  const router = useRouter();
  const { storefronts, updateStorefronts, targetStore, updateTargetStore } = useStorefront();
  const { userInfo } = useUserInfo();
  const [loadedStores,setLoadedStores] = useState([]);
  const [loadedComponents, setLoadedComponents] = useState([]);
  const [LayoutComponent, setLayoutComponent] = useState(null);
  const [welcomeModalIsOpen, setWelcomeModalIsOpen] = useState(null);
  const [enterLayout,setEnterLayout] = useState(false);
  const searchParams = useSearchParams();


  // userInfo.userType options:  "guest","member","creator","storeowner";


  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  //fetching StorefrontData
  useEffect(() => {
    const query = searchParams.get("query");
  
    const fetchStorefrontData = async () => {
      try {
        const response = await fetch(`/api/storefronts?q=${query}`);
        const storefrontData = await response.json();
        p(SOURCE, storefrontData, srcColor, "Fetched storefront data:");
        setLoadedStores(storefrontData);
      } catch (error) {
        console.error("Error fetching storefront data:", error);
      }
    };
  
    if (!loadedStores.storefronts?.length && query) {
      // Fetch data only if storefronts are empty and query exists
      fetchStorefrontData();
    } else {
      p(SOURCE, storefronts, srcColor, "Using existing storefronts:");
    }
  }, [loadedStores,storefronts, searchParams]);
  
  useEffect(() => {
    var initial = 0;
    loadedStores.storefronts?.forEach((store,index) =>{
      p(SOURCE, store, srcColor + initial, `store #${index + 1}: `);
      initial += 10;
    })
  },[loadedStores]);

  /*Loading the Layouts*/
  useEffect(() => {
    const layoutMap = {
      1: dynamic(() => import("../components/mall_layouts/Mall_layout1.jsx"),{ssr:false}),
      2: dynamic(() => import("../components/mall_layouts/Mall_layout2.jsx"),{ssr:false}),
    };
    const layoutId = loadedStores.storefronts?.length;
    const selectedLayout = layoutMap[layoutId];
    
    p(SOURCE,layoutId,srcColor,'layoutId:');
    setLayoutComponent(() => selectedLayout);
  }, [loadedStores]);

  useEffect(() => {
    p(SOURCE,LayoutComponent,srcColor,'layoutComponent:');
  }, [LayoutComponent]);

  useEffect(() => {
    if(storefronts){
      setWelcomeModalIsOpen(true);
    }
  }, [storefronts]);

  

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
        <Suspense fallback={<div>Loading search params...</div>}>
          {/* <InfoDisplay /> */}
        </Suspense>
        <div style={{ width: "100vw", height: "100vh"}}>
          {/* <Canvas ref={cameraRef} camera={{ position: [0, 1.829, 18.206], fov: 45 }}> */}
          <Canvas shadows>
            {/* <OrbitControls/> */}
            <ambientLight />
            <directionalLight intensity={0.5} castShadow/>
            <Suspense fallback={null}>
              {LayoutComponent && <LayoutComponent key="layout" enterLayout={enterLayout} storefronts={loadedStores} />}
            </Suspense>
          </Canvas>
        </div>
      </Suspense>
    </>
  );
}
// export default RenderPage;

export default function RenderPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenderPage />
    </Suspense>
  );
}

/////////////////////////////////////////////////////////////////

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

