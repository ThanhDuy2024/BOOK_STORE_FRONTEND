import { createContext, useReducer } from "react";
import LangReducer, { INITIAL_STATE } from "./langReducer";

export const LangContext = createContext(INITIAL_STATE);

export const LangContextProvider = ({ children }) => {
    const [state, langDispatch] = useReducer(LangReducer, INITIAL_STATE);

    return (
        <LangContext.Provider value={{
            locale: state.locale,
            langDispatch
        }}
        >
            {children}
        </LangContext.Provider>
    )
}