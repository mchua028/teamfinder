
export const getUserFromStorage = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return;
  }
  return user;
};

export const getTokenFromStorage = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  return token;
};

export const removeUserStorage = () => localStorage.removeItem("user");

export const removeTokenStorage = () => localStorage.removeItem("token");