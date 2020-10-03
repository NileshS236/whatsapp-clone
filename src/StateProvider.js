import React, { createContext, useReducer, useContext } from "react";

// Prepares the datalayer
export const StateContext = createContext();

// wrap or app and provide the datalayer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from the datalayer
export const useStateValue = () => useContext(StateContext);
