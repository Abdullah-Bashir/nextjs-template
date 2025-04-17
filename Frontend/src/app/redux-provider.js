// reduxProvider.js
"use client"; // for Next.js client components

import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            {children}
            <ToastContainer position="top-right" theme="dark" autoClose={3000} />
        </Provider>
    );
}
