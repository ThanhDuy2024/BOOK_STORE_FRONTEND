const INITIAL_STATE = {
    id: -1,
    fullName: "",
    email: "",
    address: "",
    phone: "",
    image: "",
    status: false
};

const CustomerReducer = (state, action) => {
    switch (action.type) {
        case 'CUSTOMER-PROFILE':
            return {
                ...state,
                id: action.payload.id,
                fullName: action.payload.fullName,
                email: action.payload.email,
                address: action.payload.address,
                phone: action.payload.phone,
                image: action.payload.image,
                status: action.payload.status,
            }
        default:
            return state;
    }
}

export { INITIAL_STATE }
export default CustomerReducer;