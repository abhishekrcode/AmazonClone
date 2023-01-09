import React ,{createContext, useContext,useReducer} from "react";

//prepare the datalayer 
export const StateContext = createContext();

//wrap out app and provide the data layer (Remember ki yeh humesha return karta hai essi mai bht time lag gaya tha blank page show ho raha tha pata nehi chal raha tha kya erro hai)
export const StateProvider = ({reducer, initialState, children}) =>{
    return (
    <StateContext.Provider value = {useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
    )
};

//Pull information from data layer
export const useStateValue = () => useContext(StateContext);