export const setLocalStorage = (accessToken, refreshToken) => {
  localStorage.setItem('Auth-token', accessToken)
  localStorage.setItem('refresh-token', refreshToken)
}