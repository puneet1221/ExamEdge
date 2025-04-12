import React, { createContext, useContext, useEffect, useState } from "react";

// Create the Context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  // Initialize states from localStorage or default values
  const [loginState, setLoginState] = useState(() => {
    const savedState = localStorage.getItem("loginState");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [menuActive, setMenuActive] = useState(null);
  const [userRole,setUserRole]=useState(null);
  const [selectedCategory,setSelectedCategory]=useState(null);



  const [userDetails, setUserDetails] = useState(() => {
    const savedDetails = localStorage.getItem("userDetails");
    return savedDetails
      ? JSON.parse(savedDetails)
      : {
        username: "",
        email: "",
        userRole: "",
        userToken: "",
        profile: "",
        isProfileUpdated:null
      };
  });
 
  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("loginState", JSON.stringify(loginState));
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [loginState, userDetails]);

  // Function to update login state and user data
  const updateLoginState = ({ token, role, details }) => {
    setLoginState(true);
    setUserDetails({
      ...details,
      userRole: role,
      userToken: token,
    });
    setUserRole(userDetails.userRole);
    
  };

  // Function to log out the user
  const logout = () => {
    setLoginState(false);
    setUserDetails({
      username: null,
      email: null,
      userRole: null,
      userToken: null,
      profile: null,
    });
    localStorage.clear(); // Clear stored data on logout
  };

  // Utility to check if the user has admin privileges
  const isAdmin = () => userDetails.userRole === "admin";

  return (
    <AppContext.Provider
      value={{
        loginState,
        setLoginState,
        userDetails,
        setUserDetails,
        updateLoginState,
        logout,
        isAdmin,
        menuActive,
        setMenuActive,
        setSelectedCategory,selectedCategory
       
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
