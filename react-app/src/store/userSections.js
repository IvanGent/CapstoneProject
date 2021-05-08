const SET_VISITED = 'userSections/setVisited';
const SET_FAVS = 'userSections/setFavs';

const setVisited = (bool) => {
    return {
        type: SET_VISITED,
        payload: bool,
    }
}

const setFavs = (bool) => {
    return {
        type: SET_FAVS,
        payload: bool,
    }
}

export const showVisited = (bool) => (dispatch) => {
    dispatch(setVisited(bool));
    return;
}

export const showFavs = (bool) => (dispatch) => {
    dispatch(setFavs(bool));
    return;
}

const initialState = { showVisited: true, showFavs: false};

const showSectionsReducer = (state = initialState, {type, payload}) => {
    let newState;
    switch(type) {
        case SET_VISITED:
            newState = {showVisited: true, showFavs: false};
            return newState;
        case SET_FAVS:
            newState = {showVisited: false, showFavs: true};
            return newState;
        default:
            return state;
    };
};

export default showSectionsReducer;