import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  isAuth: true,
  checkAuth: (auth) => {},
});

export const authUser = () => {
  return useContext(AuthContext);
};

export const Userprovider = AuthContext.Provider;
