export const setToken = () => {
  const token = localStorage.getItem('token')// Anda perlu mengganti ini dengan cara Anda menghasilkan token

  setTimeout(() => {
    localStorage.removeItem('token')
  }, 720000); 

  return token;
}

