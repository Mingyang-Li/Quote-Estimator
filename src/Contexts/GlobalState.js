import React, { createContext, useReducer, useState } from 'react';
import AppReducer from './AppReducer';

// Create context
export const GlobalContext = createContext([]);

// Provider component
const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, []);
    
    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
        );
    }

export default GlobalProvider;