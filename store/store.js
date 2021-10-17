import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { cartReducer } from '../reducers/cartReducer';
import thunk from 'redux-thunk';
import { stripeReducer } from '../reducers/stripeReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    cart: cartReducer,
    payment: stripeReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);