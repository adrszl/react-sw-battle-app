import axios from 'axios';

export const FETCH_FIGHTERS = 'FETCH_FIGHTERS';
export const FETCH_FIGHTERS_PEOPLE = 'FETCH_FIGHTERS_PEOPLE';
export const FETCH_FIGHTERS_STARSHIPS = 'FETCH_FIGHTERS_STARSHIPS';
export const FIGHTERS_LOADING = 'FIGHTERS_LOADING';
export const FETCHING_FIGHTERS_FAILED = 'FETCHING_FIGHTERS_FAILED';
export const ADD_FIRST_FIGHTER = 'ADD_FIRST_FIGHTER';
export const ADD_SECOND_FIGHTER = 'ADD_SECOND_FIGHTER';

const FETCH_BASE_URL = 'https://swapi.dev/api';

export const fetchFightersRedux = (personId, category, playerCase) => (dispatch) => {
    
    dispatch(fightersLoading());

    let fighterCategory = '';
    category === 'people' ? fighterCategory = 'people' : fighterCategory = 'starships';

    return axios.get(FETCH_BASE_URL + `/${fighterCategory}/${personId}`)
        .then(({data}) => {
            if(playerCase === 'first player') {
                dispatch(addFirstFighter(data));
            } else if(playerCase === 'second player') {
                dispatch(addSecondFighter(data));
            }
        })
        .catch((err) => {
            dispatch(fighterFailed(err));
            
            if(category === 'people') {
                dispatch(fetchFightersRedux(1, 'people', playerCase));
            } else {
                dispatch(fetchFightersRedux(2, 'starships', playerCase));
            }
        })
};

export function fightersLoading() {
    return {
        type: FIGHTERS_LOADING
    }
}

export function addFirstFighter(fighter) {
    return { 
        type: ADD_FIRST_FIGHTER,
        payload: fighter
    }
}

export function addSecondFighter(fighter) {
    return { 
        type: ADD_SECOND_FIGHTER,
        payload: fighter
    }
}

export function fighterFailed(errorMsg) {
    return {
        type: FETCHING_FIGHTERS_FAILED,
        payload: errorMsg
    }
}