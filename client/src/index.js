import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";


import { store } from "./store";
import { ThemeProvider } from "@mui/material/styles";

// initialize firebase web sdk
// import "./utils/firebase.util";

// axios.defaults.baseURL = "http://localhost:3002/api/v1";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </Router>
        </Provider>
    </React.StrictMode>,
  document.getElementById("root")
);
    