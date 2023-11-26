import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
// yarn add react react-dom
// yarn add @babel/preset-env @babel/preset-react @babel/core @babel/polyfill babel-loader -D
// yarn add webpack-dev-server -D
import { worker } from "./mocks/handler";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Header from "./components/Header";

worker.start();

const AppRoutes = (): React.ReactElement => {
  return (
    <BrowserRouter basename="/">
      <div>
        {/* 这里可以加很多全局的东西，比如 */}
        {/* <Toast /> */}
        {/* <SessionTimeoutPopup /> */}
        <Header />
        {/* <SideMenu /> */}
        {/* <Footer /> */}
        <section>
          <div>
            <Routes>
              <Route path="/profile" Component={Profile} />
              <Route path="/product/:id" Component={Product} />
              <Route Component={NotFound} />
            </Routes>
          </div>
        </section>
      </div>
    </BrowserRouter>
  );
};

const App = (): React.ReactElement => {
  // 以后可以加global的东西和全局的provider

  return <AppRoutes />;
};

export default App;
