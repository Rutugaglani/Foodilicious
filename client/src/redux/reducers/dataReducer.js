import {
  GET_TYPES,
  GET_ORDER,
  GET_CART,
  GET_LOCATIONS,
  LOADING_DATA,
  GET_CUISINES,
  GET_MENU,
  GET_COLLECTIONINFO,
  GET_CATEGORIES,
  GET_SUBCATEGORIES,
  GET_SUBCATEGORY,
  GET_CATEGORY,
  GET_COLLECTION,
  GET_RESTAURANTS,
  GET_RESTAURANT,
  GET_RESTAURANTREVIEW,
} from "../types";

const initialState = {
  loading: true,
  categories: [],
  subCategories: [],
  category: [],
  restaurants: undefined,
  restaurant: undefined,
  menu: [],
  cart: [],
  totalQty: 0,
  restaurantReview: [],
  collections: [],
  collection: {},
  types: [],
  cuisines: [],
  locations: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case GET_CART:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };
    case GET_RESTAURANTS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };
    case GET_RESTAURANT:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
      };

    case GET_MENU:
      return {
        ...state,
        loading: false,
        menu: action.payload,
      };

    case GET_RESTAURANTREVIEW:
      return {
        ...state,
        loading: false,
        restaurantReview: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        loading: false,
        types: action.payload,
      };
    case GET_LOCATIONS:
      return {
        ...state,
        loading: false,
        locations: action.payload,
      };
    case GET_CUISINES:
      return {
        ...state,
        loading: false,
        cuisines: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    case GET_SUBCATEGORIES:
      return {
        ...state,
        loading: false,
        subCategories: action.payload,
      };
    case GET_SUBCATEGORY:
      return {
        ...state,
        loading: false,
        subCategory: action.payload,
      };
    case GET_COLLECTION:
      return {
        ...state,
        loading: false,
        collections: action.payload,
      };
    case GET_COLLECTIONINFO:
      return {
        ...state,
        loading: false,
        collection: action.payload,
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
