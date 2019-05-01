import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store";

import RouterComponent from './Router'

ReactDOM.render(
    <Provider store={store}>
       <RouterComponent />
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
