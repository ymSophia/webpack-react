export const fetchUser = async () => {
  const response = await fetch('/api/users');
  return response.json();
};