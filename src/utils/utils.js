const TOKEN_NAME = 'token'

/* 將 token 存到 localStorage */
export const setAuthToken = (token) => {
  return localStorage.setItem(TOKEN_NAME, token)
}

/* 從 localStorage 取得 token */
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}
