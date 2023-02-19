export const setLocalStorage = (accessToken, refreshToken) => {
  localStorage.setItem('Auth-token', accessToken)
  localStorage.setItem('refresh-token', refreshToken)
}

export const deleteLocalStorage = () => {
  localStorage.removeItem('Auth-token')
  localStorage.removeItem('refresh-token')
}