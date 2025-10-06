import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // reset error

    // Basic validation
    if (!name || !email || !password1 || !password2) {
      setError("Please fill in all fields");
      return;
    }

    if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    }

    if (!agreed) {
      setError("You must agree to the terms and conditions");
      return;
    }

    // If all validations pass
    console.log("SignUp Data:", { name, email, password1 });

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Create an Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              required
              type="text"
              className="form-control"
              id="floatingUsername"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingUsername">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input
              required
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingEmail">Email </label>
          </div>

          <div className="form-floating mb-3">
            <input
              required
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              required
              type="password"
              className="form-control"
              id="floatingConfirmPassword"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheck"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="termsCheck">
              I agree to the terms and conditions
            </label>
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <button className="w-100 btn btn-primary btn-lg mb-3" type="submit">
            Sign Up
          </button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <NavLink to="/login" className="text-primary">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
