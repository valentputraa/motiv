import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const UserNavbar = () => {
  const [id, setId] = useState('')
  const token = localStorage.getItem('token')
  const location = useLocation()

  const getMe = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/me",{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      setId(response.data.data.id)
    } catch (error) {
      console.log(error);
    }
  }

useEffect(() => {
  getMe()
},[])


  const logout = () => {
    localStorage.removeItem('token')
  }

  return (
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark"  >
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand ms-3">MOTIV.</Link>
        <div className='d-flex'>
          <Link to={"/make-article"} className='btn btn-dark me-3'>Write</Link>
          {location.pathname !== `/profil/${id}` && (
            <Link to={`/profil/${id}`} className="btn btn-outline-primary me-4">
              Profil
            </Link>
          )}
          <Link to={"/"} onClick={() => logout()} className="btn btn-outline-danger me-3">Logout</Link>
        </div>
      </div>
    </nav>
  )
}

export default UserNavbar