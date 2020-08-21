import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { profile } from './reducers';

export const ConfigureStore = () => {
    const store = createStore(
        profile,
        applyMiddleware(thunk)
    );

    return store;
}