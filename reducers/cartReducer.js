import { types } from "../types/types";


export const cartReducer = (state = {}, action) => {

    switch (action.type) {
        case types.cartUpdate:
            return {
                ...action
            }


        default:
            return state;
    }

}