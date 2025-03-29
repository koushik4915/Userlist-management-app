import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import userSlice from './assets/UserSlice.jsx'


const store = configureStore({
  reducer:{
    users: userSlice,
  }
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
