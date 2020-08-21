import axios from 'axios';

export const FETCH_FIGHTERS = 'FETCH_FIGHTERS';
export const FETCH_FIGHTERS_PEOPLE = 'FETCH_FIGHTERS_PEOPLE';
export const FETCH_FIGHTERS_STARSHIPS = 'FETCH_FIGHTERS_STARSHIPS';
export const FIGHTERS_LOADING = 'FIGHTERS_LOADING';
export const FETCHING_FIGHTERS_FAILED = 'FETCHING_FIGHTERS_FAILED';
export const ADD_FIGHTER = 'ADD_FIGHTER';

const FETCH_BASE_URL = 'https://swapi.dev/api';

export const fetchFightersPeople = (personId) => (dispatch) => {
    
    dispatch(fightersLoading());

    return axios.get(FETCH_BASE_URL + `/people/${personId}`)
        .then(({data}) => {
            dispatch(addFighter(data.items));
        })
        .catch((err) => {
            dispatch(fighterFailed(err));
        })
};

export function fightersLoading() {
    return {
        type: FIGHTERS_LOADING
    }
}

export function addFighter(fighter) {
    return { 
        type: ADD_FIGHTER,
        payload: fighter
    }
}

export function fighterFailed(errorMsg) {
    return {
        type: FETCHING_FIGHTERS_FAILED,
        payload: errorMsg
    }
}