// TODO: Consider moving to httpOnly cookies in a future update
export const storeAuthTokens = (accessToken, refreshToken) => {
  sessionStorage.setItem('access_token', accessToken);
  sessionStorage.setItem('refresh_token', refreshToken);
};

export const getAuthToken = () => {
  return sessionStorage.getItem('access_token');
};

export const getRefreshToken = () => {
  return sessionStorage.getItem('refresh_token');
};

export const clearAuthTokens = () => {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};