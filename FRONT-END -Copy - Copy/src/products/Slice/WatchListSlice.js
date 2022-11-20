const initState = {
    reloadWatchList: false,
    watchLists: []
}

const watchListsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'watchLists/setWatchLists':
            return {
                ...state,
                watchLists: action.payload
            }
        case 'watchLists/setReloadWatchList':
            return {
                ...state,
                reloadWatchList: action.payload
            }
        
        default:
            return state;
    }
}

export default watchListsReducer;