import React, { useEffect, useState } from "react";
import { fetchUser } from "../services/getUser";
import { User } from "../models/user";

const Profile = () => {
  const [user, setUser] = useState<User>({} as User);
  useEffect(() => {
    fetchUser().then((res) => setUser(res));
  }, []);

  if (!user.id) return <></>;

  return <div className="app">{user.name}</div>;
};

export default Profile;
