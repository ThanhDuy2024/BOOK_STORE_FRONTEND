import { createContext, useReducer } from "react";
import CartReducer, { INITIAL_STATE } from "./cartReducer";

export const CartContext = createContext(INITIAL_STATE);

export const CartContextProvider = ({ children }) => {
    const [state, cartDispatch] = useReducer(CartReducer, INITIAL_STATE);

    return (
        <CartContext.Provider value={{
            totalCart: state.totalCart,
            items: state.items,
            cartDispatch
        }}
        >
            {children}
        </CartContext.Provider>
    )
}