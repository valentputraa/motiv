import { useState } from "react";
import axios from "axios";


const SignUpModal = ({ onSuccess }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const signUpUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/register", {
                username,
                email,
                password,
                password_confirmation: confirmationPassword,
            });
            onSuccess("Registrasi berhasil!");
            
            
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    return (
        <div className="modal fade" id="signUpModal" tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form onSubmit={signUpUser}>
                            {errors.username && (
                                <div className="text-danger">
                                    {errors.username}
                                </div>
                            )}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    id="floatingUsername"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                                <label htmlFor="floatingUsername">Username</label>
                            </div>
                            {errors.email && (
                                <div className="text-danger">
                                    {errors.email}
                                </div>
                            )}
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control rounded-3"
                                    id="floatingEmail"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="floatingEmail">Email address</label>
                            </div>
                            {errors.password && (
                                <div className="text-danger">
                                    {errors.password}
                                </div>
                            )}
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control rounded-3"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            {errors.password_confirmation && (
                                <div className="text-danger">
                                    {errors.password_confirmation}
                                </div>
                            )}
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control rounded-3"
                                    id="floatingConfPassword"
                                    placeholder="Password"
                                    value={confirmationPassword}
                                    onChange={(e) =>
                                        setConfirmationPassword(e.target.value)
                                    }
                                />
                                <label htmlFor="floatingConfPassword">
                                    Confirm Password
                                </label>
                            </div>
                            <button
                                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                type="submit"
                                data-bs-dismiss="modal"
                            >
                                Sign up
                            </button>
                            <small className="text-body-secondary">
                                By clicking Sign up, you agree to the terms of
                                use.
                            </small>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpModal;
