import { createContext, useReducer } from "react";
import CustomerReducer, { INITIAL_STATE } from "./customerReducer";

export const CustomerContext = createContext(INITIAL_STATE);

export const CustomerContextProvider = ({ children }) => {
    const [state, customerDispatch] = useReducer(CustomerReducer, INITIAL_STATE);

    return (
        <CustomerContext.Provider value={{
            id: state.id,
            fullName: state.fullName,
            email: state.email,
            address: state.address,
            phone: state.phone,
            image: state.image,
            status: state.status,
            customerDispatch
        }}
        >
            {children}
        </CustomerContext.Provider>
    )
}