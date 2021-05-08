const SET_LOGIN = 'formModals/setLogin';
const SET_SIGNUP = 'formModals/setSignUp';

const setLogin = () => {
    return {
        type: SET_LOGIN,
    }
}

const setSignUp = () => {
    return {
        type: SET_SIGNUP,
    }
}

export const showLogin = () => (dispatch) => {
    dispatch(setLogin());
    return;
}

export const showSignUp = () => (dispatch) => {
    dispatch(setSignUp());
    return;
}

const initialState = {
    showLogin: true,
    showSignUp: false,
}

const showFormModalsReducer = (state=initialState, {type}) => {
    let newState;
    switch(type) {
        case SET_LOGIN:
            newState = {showLogin: true, showSignUp: false};
            return newState;
        case SET_SIGNUP:
            newState = {showLogin: false, showSignUp: true};
            return newState;
        default:
            return state;
    };
}

export default showFormModalsReducer;