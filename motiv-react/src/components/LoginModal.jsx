import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  
  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login",{
        email,
        password
      })
      const token = response.data.token
      localStorage.setItem('token', token);
      navigate('/home')
      window.location.reload()
    } catch (error) {
      setErrors(error.response.data.errors);
      console.log(error);
    }
  };

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">Login</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-5 pt-0">
            <form onSubmit={loginUser}>
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-3"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button
                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                type="submit"
              >
                Login
              </button>
              <small className="text-body-secondary">

              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
