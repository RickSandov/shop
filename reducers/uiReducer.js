import { types } from "../types/types";


const initialState = {
    toastActive: false,
    toastMsg: 'El producto se ha agregado al carrito'
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.uiActiveToast:

            return {
                toastActive: true,
                toastMsg: action.payload.msg ? action.payload.msg : state.toastMsg
            }

        case types.uiStopToast:

            return {
                ...state,
                toastActive: false
            }


        default:
            return state;
    }

}