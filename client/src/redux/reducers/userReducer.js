/* eslint-disable */
import axios from "axios";
import {
  GET_USER,
  SET_UNAUTHENTICATED,
  GET_CUSADDRESS,
  SET_AUTHENTICATED,
  LOADING_USER,
  CLEAR_ERRORS,
  SET_ERROR_LOGIN,
  SET_ERROR_SIGNUP,
  GET_USERREVIEW,
  GET_USERORDER,
  GET_ORDERITEMS
  
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  address: {},
  userOrders:[],
  orderItems:[],
  userReviews:[],
  loading: true,
  errLogin: null,
  errSignup: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        loading: false,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...initialState,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR_SIGNUP:
      return {
        ...state,
        errSignup: action.payload,
        loading: false,
      };

    case GET_USER:
      return {
        ...state,
        credentials: action.payload,
        loading: false,
      };
    case GET_CUSADDRESS:
      return {
        ...state,
        address: action.payload,
        loading: false,
      };
    case SET_ERROR_LOGIN:
      return {
        ...state,
        errLogin: action.payload,
        loading: false,
      };
      case GET_USERREVIEW:
        return {
          ...state,
          loading: false,
          userReviews: action.payload,
        };
        case GET_USERORDER:
          return {
            ...state,
            loading: false,
            userOrders: action.payload,
          };
          case GET_ORDERITEMS:
            return {
              ...state,
              loading: false,
              orderItems: action.payload,
            };

    case CLEAR_ERRORS:
      return {
        ...state,
        errAuth: null,
        loading: false,
      };
    default:
      return state;
  }
}
