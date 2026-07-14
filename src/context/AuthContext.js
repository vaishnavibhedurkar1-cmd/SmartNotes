import React, { createContext, useEffect, useState } from "react";
import { getData, saveData, removeData } from "../storage/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await getData("token");

      if (token) {
        setUserToken(token);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const login = async (token) => {
    await saveData("token", token);
    setUserToken(token);
  };

  const logout = async () => {
    await removeData("token");
    setUserToken(null);
  };

  


  return (
    <AuthContext.Provider
      value={{
        userToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

