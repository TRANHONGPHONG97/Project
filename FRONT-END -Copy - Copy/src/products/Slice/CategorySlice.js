const initState = {
    loadCategories: false,
    categories: [],
}

const categoriesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'categories/setCategories':
            return {
                ...state,
                categories: action.payload
            }
        
        default:
            return state;
    }
}

export default categoriesReducer;