// This file is used to create a context for the entire application. It can be used to store global state and functions that can be accessed by any component in the application.

import { createContext } from "react";

export const AppContent = createContext();

export const AppContentProvider = (props)=>{
    const value = {

    }
    return (
        <AppContent.Provider value ={value}>
            {props.children}
        </AppContent.Provider>
    )
}
export default AppContent;
