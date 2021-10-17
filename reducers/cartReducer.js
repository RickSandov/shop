import { types } from "../types/types";



export const cartReducer = (state = [

], action) => {

    switch (action.type) {
        case types.cartUpdate:
            const miStorage = window.localStorage;

            console.log(miStorage);
            return {
                ...action
            }


        default:
            return state;
    }

}