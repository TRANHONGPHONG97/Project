const initState = {
    login: false,
    showSignupInfo: false,
    showLocation: false,
};

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case 'login/loginStatus':
            return {
                ...state,
                login: action.payload,
            };
        case 'login/setShowSignupInfo':
            return {
                ...state,
                showSignupInfo: action.payload,
            };
        case 'login/setShowLocation':
            return {
                ...state,
                showLocation: action.payload,
            };

        default:
            return state;
    }
};

export default loginReducer;
