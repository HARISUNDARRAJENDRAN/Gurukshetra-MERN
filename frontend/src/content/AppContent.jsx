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
