"use client"
import { useEffect } from "react";
import SearchUI from "./components/SearchUI/SearchUI";
import { useUserInfo } from "./Providers/UserInfoProvider";

export default function Home() {

  const {userInfo,updateUserInfo} = useUserInfo();

  useEffect(()=>{
    console.log(userInfo)
  },[userInfo]);

  return (<>
    <SearchUI />
  </>);
}


