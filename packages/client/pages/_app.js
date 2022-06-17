import React from "react";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { DialogProvider } from 'muibox'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <DialogProvider>
          <Component pageProps={pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            pauseOnVisibilityChange
            closeOnClick
            pauseOnHover
          />
        </DialogProvider>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
