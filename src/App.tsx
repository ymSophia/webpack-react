import React, { useState, useEffect } from "react";
import "./app.css";
// yarn add react react-dom
// yarn add @babel/preset-env @babel/preset-react @babel/core @babel/polyfill babel-loader -D
// yarn add webpack-dev-server -D
import { worker } from "./mocks/handler.ts";
import { fetchUser } from "./services/getUser.ts";

worker.start();

const App = (): React.ReactElement => {
  const [user, setUser] = useState({ id: "", name: "" });
  useEffect(() => {
    fetchUser().then((res) => setUser(res));
  }, []);

  if (!user.id) return <></>;

  return <div className="app">{user.name}</div>;
};

export default App;
