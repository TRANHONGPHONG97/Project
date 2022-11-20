const initState = {
    account: {}
};

const accountReducer = (state = initState, action) => {
    switch (action.type) {
        case 'account/setAccount':
            return {
                ...state,
                account: action.payload,
            };

        default:
            return state;
    }
};

export default accountReducer;
