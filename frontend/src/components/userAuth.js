export const getUserAuthInfo = () => {
  return localStorage.getItem("userInfo") || "";
};

export const setUserAuthInfo = (data) => {
  localStorage.setItem("userInfo", JSON.stringify(data));
};

export const removeUserAuthInfo = () => {
  localStorage.removeItem("userInfo");
};

export const configAuth = (userInfo) => {
  const config = {
    headers: {
      authorization: `Bearer ${JSON.parse(userInfo).acesstoken}`,
    },
  };
  return config;
};
