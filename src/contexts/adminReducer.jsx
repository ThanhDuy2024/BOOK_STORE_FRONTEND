
const INITIAL_STATE = {
    id: -1,
    adminName: "",
    fullName: "",
    email: "",
    address: "",
    phone: "",
    image: "",
    status: false,
    roleId: -1,
};

const AdminReducer = (state, action) => {
    switch (action.type) {
        case 'ADMIN-PROFILE':
            return {
                ...state,
                id: action.payload.id,
                adminName: action.payload.adminName,
                fullName: action.payload.fullName,
                email: action.payload.email,
                address: action.payload.address,
                phone: action.payload.phone,
                image: action.payload.image,
                status: action.payload.status,
                roleId: action.payload.roleId,
            }
        default:
            return state;
    }
}

export { INITIAL_STATE }
export default AdminReducer;