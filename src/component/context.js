import  { createContext } from "react";

export const MyContext = createContext({
    ShowLOrS : false,
    setShowLOrS : ()=>{},
    ShowAnimate : false,
    setShowAnimate : ()=>{},
    CheckBox : false,
    setCheckBox : ()=>{},
    ResGetDataFromL : [],
    setResGetDataFromL : ()=>{},
    ShowBoxLogOut : false,
    setShowBoxLogOut : ()=>{}
})