// get user Information from local storage
export const getUserAuthInfo = () => {
  return localStorage.getItem("userInfo") || "";
};

// set user Information to local storage
export const setUserAuthInfo = (data) => {
  localStorage.setItem("userInfo", JSON.stringify(data));
};

// remove user Information from local storage
export const removeUserAuthInfo = () => {
  localStorage.removeItem("userInfo");
};

// config the authentication token for api calls
export const configAuth = (userInfo) => {
  const config = {
    headers: {
      authorization: `Bearer ${JSON.parse(userInfo).acesstoken}`,
    },
  };
  return config;
};
