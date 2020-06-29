import axios from 'axios';

export const FETCH_FIGHTERS = 'FETCH_FIGHTERS';
export const FETCH_FIGHTERS_PEOPLE = 'FETCH_FIGHTERS_PEOPLE';
export const FETCH_FIGHTERS_STARSHIPS = 'FETCH_FIGHTERS_STARSHIPS';
export const FIGHTERS_LOADING = 'FIGHTERS_LOADING';
export const FETCHING_FIGHTERS_FAILED = 'FETCHING_FIGHTERS_FAILED';

const FETCH_BASE_URL = 'https://swapi.dev/api';

export const fetchFightersPeople = (personId) => (dispatch) => {
    
    dispatch(fightersLoading()); // TODO: fightersLoading()

    return axios.get(FETCH_BASE_URL + `/people/${personId}`)
        .then(({data}) => {
            dispatch(addFighter(data.items)); // TODO: addFighter()
        })
        .catch((err) => {
            dispatch(fighterFailed(err)); // TODO: fighterFailed()
        })
};