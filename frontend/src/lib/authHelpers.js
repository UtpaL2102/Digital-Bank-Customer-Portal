// TODO: Consider moving to httpOnly cookies in a future update
export const storeAuthTokens = (accessToken, refreshToken) => {
  sessionStorage.setItem('access_token', accessToken);
  sessionStorage.setItem('refresh_token', refreshToken);
};

export const getAuthToken = () => {
  const token = sessionStorage.getItem('access_token');
  console.log('Getting auth token:', token ? 'Token present' : 'Token missing');
  return token;
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