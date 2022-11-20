const initState = {
    showCart: false,
    showCheckout: false,
    reloadCartItem: false,
    cartItems: [],
    cart: {}
}

const cartItemsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'cartItems/setCartItems':
            return {
                ...state,
                cartItems: action.payload
            }
        case 'cartItems/setCart':
            return {
                ...state,
                cart: action.payload
            }
        case 'cartItems/setShowCart':
            return {
                ...state,
                showCart: action.payload
            }
        case 'cartItems/setShowModalCheckout':
            return {
                ...state,
                showCheckout: action.payload
            }
        case 'cartItems/setReloadCartItem':
            return {
                ...state,
                reloadCartItem: action.payload
            }
        
        default:
            return state;
    }
}

export default cartItemsReducer;