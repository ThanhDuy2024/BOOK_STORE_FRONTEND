// 1. Khởi tạo state ban đầu từ localStorage (nếu có)
const savedCart = localStorage.getItem('cart_items');
const initialItems = savedCart ? JSON.parse(savedCart) : [];

const INITIAL_STATE = {
    totalCart: initialItems.length, // Số loại sản phẩm có tên khác nhau
    items: initialItems
};

const CartReducer = (state, action) => {
    switch (action.type) {
        case 'CART-SAVE': {
            const newItem = action.payload; // Sản phẩm vừa bấm Add

            // Tìm sản phẩm đã tồn tại chưa
            const existingIndex = state.items.findIndex(item => item.id === newItem.id);

            let updatedItems;

            if (existingIndex > -1) {
                // Nếu đã có -> tăng số lượng quantity
                updatedItems = [...state.items];
                updatedItems[existingIndex] = {
                    ...updatedItems[existingIndex],
                    quantity: updatedItems[existingIndex].quantity + (newItem.quantity || 1)
                };
            } else {
                // Nếu chưa có -> thêm sản phẩm mới
                updatedItems = [
                    ...state.items,
                    { ...newItem, quantity: newItem.quantity || 1 }
                ];
            }

            // 2. LƯU VÀO LOCALSTORAGE
            localStorage.setItem('cart_items', JSON.stringify(updatedItems));

            // 3. Cập nhật state mới
            return {
                ...state,
                items: updatedItems,
                totalCart: updatedItems.length // Tính theo số loại sản phẩm khác nhau
            };
        }

        // cartReducer.js
        case 'CART-REMOVE': {
            // 1. Lọc bỏ sản phẩm có id trùng với payload gửi lên
            const updatedItems = state.items.filter(item => item.id !== action.payload);

            // 3. Cập nhật lại localStorage
            localStorage.setItem('cart_items', JSON.stringify(updatedItems));

            return {
                ...state,
                totalCart: state.totalCart - 1,
                items: updatedItems
            };
        }

        // Trường hợp bạn muốn xóa giỏ hàng (ví dụ sau khi thanh toán xong)
        case 'CART-CLEAR': {
            localStorage.removeItem('cart_items');
            return {
                totalCart: 0,
                items: []
            };
        }

        default:
            return state;
    }
};

export { INITIAL_STATE };
export default CartReducer;