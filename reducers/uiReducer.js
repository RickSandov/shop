import { types } from '../types/types';

const initialState = {
  toastActive: false,
  toastMsg: 'Se agrego el producto al carrito',
  toastErr: false,
  modalActive: false,
  orderId: undefined,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiActiveToast:
      return {
        ...state,
        toastActive: true,
        toastMsg: action.payload.msg ? action.payload.msg : state.toastMsg,
        toastErr: action.payload.err ? action.payload.err : false,
      };

    case types.uiStopToast:
      return {
        ...state,
        toastActive: false,
        toastErr: false,
      };

    case types.uiActiveModal:
      return {
        ...state,
        modalActive: true,
        orderId: action.payload.orderId,
      };

    case types.uiCloseModal:
      return {
        ...state,
        modalActive: false,
        orderId: '',
      };

    default:
      return state;
  }
};
