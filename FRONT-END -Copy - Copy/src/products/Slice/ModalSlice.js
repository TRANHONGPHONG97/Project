const initState = {
    showInfoProduct: false,
    showAddProduct: false,
    showEditProduct: false,
    showModerationProduct: false,
};

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case 'modals/showInfoProduct':
            return {
                ...state,
                showInfoProduct: action.payload,
            };
        case 'modals/showAddProduct':
            return {
                ...state,
                showAddProduct: action.payload,
            };
        case 'modals/showEditProduct':
            return {
                ...state,
                showEditProduct: action.payload,
            };
        case 'modals/showModerationProduct':
            return {
                ...state,
                showModerationProduct: action.payload,
            };
        default:
            return state;
    }
};

export default modalReducer;
