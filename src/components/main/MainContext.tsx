import React, { createContext, useContext } from "react";

export type GlobalContent = {
  status: number;
};

export const MyGlobalContext = createContext<GlobalContent>({
  status: 0,
});

export const useGlobalContext = () => useContext(MyGlobalContext);
