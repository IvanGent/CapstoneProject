const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

export const login = (user) => async (dispatch) => {
    const { email, password } = user;
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
    dispatch(setUser(res.user));
    return res;
}

// export const restoreUser = () => async (dispatch) => {
//     const res = await fetch('/api/session', {});
//     dispatch(setUser(res.data.user));
//     return res;
// }

export const signup = (user) => async (dispatch) => {
    const { userName, firstName, password, email} = user;
    const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
            firstName,
            email,
            password
        })
    })
    dispatch(setUser(res.data.user));
    return res;
}

export const logout = () => async (dispatch) => {
    const res = await fetch('/api/auth/logout', {
        method: 'DELETE'
    })
    dispatch(removeUser());
    return res;
}

const initialState = { user: null};

const sessionReducer = (state = initialState, {type, payload}) => {
    let newState;
    switch(type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = payload;
            return newState;
        default:
            return state;
    };
};


export default sessionReducer;