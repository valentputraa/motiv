export const setToken = () => {
  const token = localStorage.getItem('token')// Anda perlu mengganti ini dengan cara Anda menghasilkan token

  // Setelah 5 detik, panggil fungsi deleteToken
  setTimeout(() => {
    localStorage.removeItem('token')
  }, 7200000); 

  return token;
}

export const checkToken = () => {
  const token = localStorage.getItem('token')

  if (!token) {
    return false
  }

  return true
}