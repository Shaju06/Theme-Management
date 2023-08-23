import React, {createContext, useState, useContext } from "react";

 const themeColors = [
  "red",
  "blue",
   "yellow",
   "purple",
  "orange",
  "green"
 ];

  const AppContext = createContext();

 export function useAppContext() {
  return useContext(AppContext)
 }

export default function AppContextWrapper(props) {

  const token = sessionStorage.getItem('token');
  const primaryColor = sessionStorage.getItem('primaryColor');

 


  const [contextState, setContextState] = useState({
    primaryColor: primaryColor ?? themeColors[0],
    token: token,
    isLoggedIn: token  ? true : false, 
    themeColors
  })

  console.log(token,primaryColor, contextState)


  return (
    <AppContext.Provider
      value={{...contextState, setContextState}}
    >
      {props.children}
    </AppContext.Provider>
  );
}