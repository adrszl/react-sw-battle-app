import { ADD_FIGHTER, FIGHTERS_LOADING, FETCHING_FIGHTERS_FAILED } from './actions';

export const profile = (state = { loading: true,
                                 errorMsg: null }, action) => {
    switch (action.type) {
        case ADD_FIGHTER:
            return {...state, loading: false, errorMsg: null, fighter: action.payload};

        case FIGHTERS_LOADING:
            return {...state, loading: true, errorMsg: null, fighter: []}

        case FETCHING_FIGHTERS_FAILED:
            return {...state, loading: false, errorMsg: action.payload};

        default:
            return state;
    }
};