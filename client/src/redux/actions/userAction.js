import axios from "axios";
import {
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  LOADING_USER,
  CLEAR_ERRORS,
  SET_ERROR_SIGNUP,
  SET_ERROR_LOGIN,
  GET_USER,
  GET_CUSADDRESS,
  GET_USERREVIEW,
  GET_USERORDER,
  GET_ORDERITEMS
} from "../types";
import Storage from "../../config/storage";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
const { setAuthorizationHeader } = Storage();

axios.defaults.baseURL = "http://localhost:5000/auth/";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  console.log(userData);
  axios
    .post("login", userData)
    .then((res) => {
      if (res.data.token) {
        console.log(res.data);
        setAuthorizationHeader(res.data.token).then(() =>
          history.push("/homepage"),
          window.location.reload()
        );

        dispatch({
          type: SET_AUTHENTICATED,
        });

        dispatch({ type: CLEAR_ERRORS });
        console.log(userData.email);
      } else {
        console.log(res);
        dispatch({
          type: SET_ERROR_LOGIN,
          payload: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem("Token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  history.push("/");
};
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("register", newUserData)
    .then((res) => {
      if (res.data.message) {
        console.log(res.data.message);
        dispatch({
          type: SET_ERROR_SIGNUP,
          payload: res.data.message,
        });
      } else {
        console.log(res);
        setAuthorizationHeader(res.data.token).then(() =>
          history.push("/homepage")
        );
        dispatch({ type: SET_AUTHENTICATED });
        dispatch({ type: CLEAR_ERRORS });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR_SIGNUP,
        payload: err.response.data,
      });
    });
};

export const getUser = () => (dispatch) => {
  axios
    .get("getUser")
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data[0],
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getCustomerAddress = () => (dispatch) => {
  axios
    .get(`getCustomerAddress`)
    .then((res) => {
      dispatch({
        type: GET_CUSADDRESS,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateAddress = (address) => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  axios
    .post(`updateCustomerAddress`, address)
    .then((res) => {
      console.log(res);
      console.log("doneeeeeeeeeeeeee");
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addAddress = (address) => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  axios
    .post(`insertCustomerAddress`, address)
    .then((res) => {
      console.log(res);
      console.log("doneeeeeeeeeeeeee");
      axios
      .get(`getCustomerAddress`)
      .then((res) => {
        dispatch({
          type: GET_CUSADDRESS,
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
export const getUserReview=()=>(dispatch)=>{
  dispatch({
    type: LOADING_USER,
  });
  axios.get(`getReviewByUser`)
  .then((res) => {
    dispatch({
      type: GET_USERREVIEW ,
      payload: res.data,
    });
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

}

export const getUserOrder=(user_id)=>(dispatch)=>{
  dispatch({
    type: LOADING_USER,
  });
  axios.get(`/order/${user_id}`)
  .then((res) => {
    dispatch({
      type: GET_USERORDER ,
      payload: res.data ,
    });
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

}
export const getOrderItems=(order_id)=>(dispatch)=>{
  dispatch({
    type: LOADING_USER,
  });
  axios.get(`/getPresentInAn/${order_id}`)
  .then((res) => {
    dispatch({
      type: GET_ORDERITEMS,
      payload: res.data,
    });
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

}