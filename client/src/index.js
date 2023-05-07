import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import App from './App';
import FloatingChatBox from './components/FloatingChatBox';
import theme from './theme';
import { Provider } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";
import { BrowserRouter as Router } from "react-router-dom";


import { store } from "./store";
import { ThemeProvider } from "@mui/material/styles";

axios.defaults.baseURL =  process.env.REACT_APP_BASEURL;


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <ConfirmProvider>
                        <App />
                        <FloatingChatBox />
                    </ConfirmProvider>
                </ThemeProvider>
            </Router>
        </Provider>
    </React.StrictMode>,
  document.getElementById("root")
);
    