import { types } from "../types/types";


export const stripeReducer = (state = {}, action) => {

    switch (action.type) {

        case types.stripeSetPromise:
            return action.payload;


        default:
            return state;
    }

}