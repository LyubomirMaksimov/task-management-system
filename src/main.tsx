import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/Store.tsx";
import { Provider } from "react-redux";
import MUICustomStyles from "./utils/MUICustomStyles.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MUICustomStyles>
          <App />
        </MUICustomStyles>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
