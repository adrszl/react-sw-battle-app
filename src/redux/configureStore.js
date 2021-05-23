import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { fighters } from './reducers';

export const ConfigureStore = () => {
    const store = createStore(
        fighters,
        applyMiddleware(thunk)
    );

    return store;
}