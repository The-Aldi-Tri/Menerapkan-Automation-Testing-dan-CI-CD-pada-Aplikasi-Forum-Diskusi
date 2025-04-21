const AuthService = {
  getAccessToken: () => localStorage.getItem("accessToken"),
  putAccessToken: (accessToken) =>
    localStorage.setItem("accessToken", accessToken),
};

export default AuthService;
