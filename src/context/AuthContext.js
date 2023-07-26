import React, { createContext, useContext, useState } from 'react'
const AuthContext = createContext();
const AuthContextProvider = ({children}) => {
  const token = localStorage.getItem("token");
    const [isLoggedIn, setIsLoggedIn] = useState(token);
  return (
    <div>
      <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}
const useAuth = () => useContext(AuthContext);
export  {AuthContextProvider,useAuth};
