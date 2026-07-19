
const INITIAL_STATE = {
    locale: 'vi'
};

const LangReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE-LOCALE':
            return {
                locale: action.payload.locale,
            }
        default:
            return state;
    }
}

export { INITIAL_STATE }
export default LangReducer;