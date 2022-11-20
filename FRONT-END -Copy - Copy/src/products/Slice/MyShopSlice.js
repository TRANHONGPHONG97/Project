const initState = {
    openSidebar: false,
    menu: 'myProduct'
}

const myShopsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'myShops/setOpenSidebar':
            return {
                ...state,
                openSidebar: action.payload
            }
        case 'myShops/setMenu':
            return {
                ...state,
                menu: action.payload
            }
        default:
            return state;
    }
}

export default myShopsReducer;