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

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
    });
    const res = await response.json();
    dispatch(setUser(res));
    return res
}

export const login = (user) => async (dispatch) => {
    const { email, password } = user;
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
    const res = await response.json();
    dispatch(setUser(res));
    return res;
}


export const signup = (user) => async (dispatch) => {
    const { userName, firstName, password, email} = user;
    const response = await fetch('/api/auth/signup', {
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
    const res = await response.json();
    dispatch(setUser(res.user));
    return res;
}

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout')
    const res = await response.json();
    dispatch(removeUser());
    console.log(res);
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
            newState.user = null;
            return newState;
        default:
            return state;
    };
};


export default sessionReducer;