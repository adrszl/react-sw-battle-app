import { ADD_FIRST_FIGHTER, ADD_SECOND_FIGHTER, FIGHTERS_LOADING, FETCHING_FIGHTERS_FAILED } from './actions';

export const fighters = (state = { loading: true,
                                 errorMsg: null }, action) => {
    switch (action.type) {
        case ADD_FIRST_FIGHTER:
            return {...state, loading: false, errorMsg: null, firstFighter: action.payload};

        case ADD_SECOND_FIGHTER:
            return {...state, loading: false, errorMsg: null, secondFighter: action.payload};

        case FIGHTERS_LOADING:
            return {...state, loading: true, errorMsg: null, fighter: []}

        case FETCHING_FIGHTERS_FAILED:
            return {...state, loading: false, errorMsg: action.payload};

        default:
            return state;
    }
};