import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Restaurants from "./components/restaurant";
import Reviews from "./pages/reviews";
import InfoRest from "./pages/infoRest";
import OrderOnline from "./pages/orderOnline";
import OrderDetails from "./pages/orderDetails"
import CollectionInfo from "./pages/collectionInfo";
import Thankyou from "./pages/thankyou";
import Profile from "./pages/profile";
import CuisineInfo from "./pages/cuisineInfo";
import Payment from "./pages/payment";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import AuthRoute from "./utils/AuthRoute";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Storage from "./config/storage";

import "bootstrap/dist/css/bootstrap.min.css";
import createHistory from "history/createBrowserHistory";
const history = createHistory();

axios.defaults.baseURL = "http://localhost:5000/auth";

const { config } = Storage();
config();

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Switch>
            <AuthRoute path="/" exact component={Login} />
            <AuthRoute path="/signup" exact component={Signup} />
            <Route path="/homepage" exact component={Restaurants} />
            <Route path="/profile" exact component ={Profile}/>
            <Route path="/restaurant/:id/:locId" exact component={InfoRest} />
            <Route path="/reviews/:id/:locId" exact component={Reviews} />
            <Route path="/order/:id/:locId" exact component={OrderOnline} />
            <Route path="/collection/:id" exact component={CollectionInfo} />
            <Route path="/types/:id" exact component={CollectionInfo} />
            <Route path="/cuisines/:id" exact component={CuisineInfo} />
            <Route path="/location/:id" exact component={CuisineInfo} />
            <Route path="/payment/:id/:locId" exact component={Payment} />
            <Route path ="/orderDetails/:id" exact component={OrderDetails}/>
            <Route path="/thankyou" exact component={Thankyou} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
