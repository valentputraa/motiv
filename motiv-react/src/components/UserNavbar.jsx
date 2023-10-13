const UserNavbar = () => {
    return (
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark"  >
      <div className="container-fluid">
        <a className="navbar-brand ms-3">MOTIV.</a>
          <div className='d-flex'>
                  <button className='btn btn-dark me-3' data-bs-toggle="modal" data-bs-target="#loginModal">Write</button>
                  <button className='btn btn-outline-primary me-4' data-bs-toggle="modal" data-bs-target="#signUpModal">Profil</button>
          </div>
      </div>
    </nav>
    )
  }
  
  export default UserNavbar