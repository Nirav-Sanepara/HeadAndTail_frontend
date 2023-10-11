import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor } from './store/store';
import { CircularLoader } from "./component/models/CircularLoader";
import { Toaster } from "react-hot-toast";
import { ROUTES } from "./routes";
import PrivateContainer from "./routes/PrivateContainer"
import PublicContainer from "./routes/PublicContainer"
import Navbar from './component/Navbar';


function App() {
  return (
    <div className="App">
        <Provider store={store}>   
          <PersistGate persistor={persistor}>
            <Routes>
                {ROUTES.map(({ Component, isPrivate, path }) => (
                  <Route
                    exact
                    path={path}
                    key={path}
                    element={
                      isPrivate ? (
                        <PrivateContainer>
                          <Navbar />

                          {/* <Navbar> */}
                            <Component />
                          {/* </Navbar> */}
                        </PrivateContainer>
                      ) : (
                        <PublicContainer>
                          <Component />
                        </PublicContainer>
                      )
                    }
                  />
                ))}
              </Routes>
            <Toaster
              toastOptions={{
                position: "top-right",
                // icon: null,
                duration: 3000,
                success: {
                  style: {
                    background: "#54D62C",
                    color: "black",
                  },
                },
                error: {
                  style: {
                    background: "#FF4842",
                    color: "white",
                    fontWeight: "600",
                  },
                },
              }}
            />
            <CircularLoader />
          </PersistGate>
        </Provider>  
    </div>
  );
}

export default App;
