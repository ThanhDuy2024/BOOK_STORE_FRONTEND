
const INITIAL_STATE = {
    totalCart: 0,
    items: []
};

const CartReducer = (state, action) => {
    switch (action.type) {
        case 'CART-SAVE':
            return {
                ...state,
            }
        default:
            return state;
    }
}

export { INITIAL_STATE }
export default CartReducer;