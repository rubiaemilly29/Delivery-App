const setToken = (token) => {
  localStorage.setItem('user', JSON.stringify(token));
};

export default setToken;
