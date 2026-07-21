import { createContext, useReducer } from "react";
import AdminReducer, { INITIAL_STATE } from "./adminReducer";

export const AdminContext = createContext(INITIAL_STATE);

export const AdminContextProvider = ({ children }) => {
    const [state, adminDispatch] = useReducer(AdminReducer, INITIAL_STATE);

    return (
        <AdminContext.Provider value={{
            id: state.id,
            adminName: state.adminName,
            fullName: state.fullName,
            email: state.email,
            address: state.address,
            phone: state.phone,
            image: state.image,
            status: state.status,
            roleId: state.roleId,
            adminDispatch
        }}
        >
            {children}
        </AdminContext.Provider>
    )
}