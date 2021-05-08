const SET_VISITED = 'userSections/setVisited';
const SET_FAVS = 'userSections/setFavs';

const setVisited = (bool) => {
    return {
        type: SET_VISITED,
    }
}

const setFavs = (bool) => {
    return {
        type: SET_FAVS,
    }
}

export const showVisited = () => (dispatch) => {
    dispatch(setVisited());
    return;
}

export const showFavs = () => (dispatch) => {
    dispatch(setFavs());
    return;
}

const initialState = { showVisited: true, showFavs: false};

const showSectionsReducer = (state = initialState, {type}) => {
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