import React, { useState, useEffect } from "react";
import "./app.css";
// yarn add react react-dom
// yarn add @babel/preset-env @babel/preset-react @babel/core @babel/polyfill babel-loader -D
// yarn add webpack-dev-server -D
import { worker } from "./mocks/handler";
import { fetchUser } from "./services/getUser";
import { User } from "./models/user";

worker.start();

const App = (): React.ReactElement => {
  const [user, setUser] = useState<User>({} as User);
  useEffect(() => {
    fetchUser().then((res) => setUser(res));
  }, []);

  if (!user.id) return <></>;

  return <div className="app">{user.name}</div>;
};

export default App;
