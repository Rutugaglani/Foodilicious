import axios from "axios";

import {
  GET_CUISINES,
  GET_ORDER,
  GET_CART,
  LOADING_DATA,
  GET_LOCATIONS,
  GET_MENU,
  GET_CATEGORIES,
  GET_COLLECTION,
  GET_COLLECTIONINFO,
  GET_RESTAURANTS,
  GET_RESTAURANT,
  GET_RESTAURANTREVIEW,
  GET_TYPES,
} from "../types";
axios.defaults.baseURL = "http://localhost:5000/auth/";
//axios.defaults.headers.common['user-key'] ='49ebd7da20eaf697a9ba27910ec9fb14';

export const getCategories = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .post("categories")
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data.categories,
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchRestaurants = (keyword) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .post(
      `search?entity_id=3&entity_type=subzone&q=${keyword}&lat=19.0983770525&lon=72.8460968658&radius=10&sort=real_distance`
    )
    .then((res) => {
      dispatch({
        type: GET_RESTAURANTS,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getCart = (user_id, restaurant_id) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`cart/${user_id}/${restaurant_id}`)
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addCart = (user_id, food_id, restaurant_id, quantity) => (
  dispatch
) => {
  const cart = {
    user_id,
    food_id,
    restaurant_id,
    quantity,
  };
  console.log(user_id, food_id, restaurant_id, quantity);
  axios
    .post(`cart`, cart)
    .then((res) => {
      console.log("cart added");
      axios
        .get(`cart/${user_id}/${restaurant_id}`)
        .then((res) => {
          dispatch({
            type: GET_CART,
            payload: res.data,
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateCart = (user_id, food_id, quantity, restaurant_id) => (
  dispatch
) => {
  const cart = {
    user_id,
    food_id,
    quantity,
    restaurant_id,
  };

  axios
    .post(`updateQuantity`, cart)
    .then((res) => {
      console.log(res.data);
      axios
        .get(`cart/${user_id}/${restaurant_id}`)
        .then((res) => {
          dispatch({
            type: GET_CART,
            payload: res.data,
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCollectionInfo = (id) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`subCategory/${id}`)
    .then((res) => {
      dispatch({
        type: GET_COLLECTIONINFO,
        payload: res.data[0],
      });

      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getMenu = (id) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  console.log(id);
  axios
    .get(`getMenu/${id}`)
    .then((res) => {
      dispatch({
        type: GET_MENU,
        payload: res.data,
      });

      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getVegMenu = (id) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`getVegMenu/${id}`)
    .then((res) => {
      dispatch({
        type: GET_MENU,
        payload: res.data,
      });

      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCollectionRest = (id) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`subCatList/${id}`)
    .then((res) => {
      dispatch({
        type: GET_RESTAURANTS,
        payload: res.data,
      });

      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getRestaurantInfo = (id, locId) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios.get(`restaurantInfo/${id}/${locId}`).then((res) => {
    dispatch({
      type: GET_RESTAURANT,
      payload: res.data[0],
    });
    console.log(res.data);
  });

  axios
    .get(`getReviewByRestaurant/${id}`)
    .then((res) => {
      dispatch({
        type: GET_RESTAURANTREVIEW,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postReview = (body, rating, rest_id, user_id) => (dispatch) => {
  const postReview = {
    review_body: body,
    rating: rating,
    restaurant_id: parseInt(rest_id),
    user_id: user_id,
  };
  console.log(postReview);
  axios
    .post(`postAreview`, postReview)
    .then((res) => {
      console.log(res);
    })
    .then(() => {
      axios
        .get(`getReviewByRestaurant/${rest_id}`)
        .then((res) => {
          dispatch({
            type: GET_RESTAURANTREVIEW,
            payload: res.data,
          });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getCollections = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`category/1`)
    .then((res) => {
      dispatch({
        type: GET_COLLECTION,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getTypes = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`category/5`)
    .then((res) => {
      dispatch({
        type: GET_TYPES,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getLocations = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`category/2`)
    .then((res) => {
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getCuisines = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`category/3`)
    .then((res) => {
      dispatch({
        type: GET_CUISINES,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const placeOrder = (idData,loc_id) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .post(`placeOrder`, idData)
    .then((res) => {
      console.log("ORDERPLACED");
      axios
        .get(`order/${idData.user_id}/${idData.restaurant_id}/${loc_id}`)
        .then((res) => {
          dispatch({
            type: GET_ORDER,
            payload: res.data[0],
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateOrder = (idData,loc_id) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .post(`updateOrder`,idData)
    .then((res) => {
      console.log("ORDERUPDATED");
      axios
        .get(`order/${idData.user_id}/${idData.restaurant_id}/${loc_id}`)
        .then((res) => {
          dispatch({
            type: GET_ORDER,
            payload: res.data[0],
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getOrder = (user_id, rest_id,loc_id) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  console.log(user_id, rest_id);
  axios
    .get(`order/${user_id}/${rest_id}/${loc_id}`)
    .then((res) => {
      dispatch({
        type: GET_ORDER,
        payload: res.data[0],
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCart = (idData) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });

  axios
    .post(`deleteCart`, idData)
    .then((res) => {
      console.log(res);
      axios
        .get(`cart/${idData.user_id}/${idData.restaurant_id}`)
        .then((res) => {
          dispatch({
            type: GET_CART,
            payload: res.data,
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const postPayment = (payData) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });

  axios
    .post(`payment`, payData)
    .then((res) => {
      console.log(res.data);
    })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
