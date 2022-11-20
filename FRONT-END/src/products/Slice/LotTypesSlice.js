const initState = {
    type: "Tất cả",
    lotTypes: ["Tất cả", "Đấu giá", "Cửa hàng"]
}

const typesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'lotTypes/changeType':
            return {
                ...state,
                type: action.payload
            }

        default:
            return state
    }
}

export default typesReducer;
