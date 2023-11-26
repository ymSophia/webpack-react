import { User } from "../models/user";

export const fetchUser = async (): Promise<User> => {
  const response = await fetch("/api/users");
  return response.json();
};
