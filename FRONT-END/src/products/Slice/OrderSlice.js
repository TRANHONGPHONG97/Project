const initState = {
    checkPayment: false,
}

const orderReducer = (state = initState, action) => {
    switch (action.type) {
        case 'orders/setCheckPayment':
            return {
                ...state,
                checkPayment: action.payload
            }
    
        
        default:
            return state;
    }
}

export default orderReducer;