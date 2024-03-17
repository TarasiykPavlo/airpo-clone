import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";

import { authGoogle } from "../../services/apiAuth";
import LoginForm from "../../features/authentication/LoginForm";
import SignupForm from "../../features/authentication/SignupForm";

import "./Auth.scss";

function Auth() {
  const navigate = useNavigate();
  const { refid } = useParams();
  const refLink = refid !== undefined ? "/" + refid : "";

  // when isActive === true -> signup form active
  const [isActive, setIsActive] = useState(
    window.location.pathname === "/signup" + refLink
  );

  const handleLoginClick = () => {
    setIsActive(false);
    navigate("/login" + refLink, { replace: true });
  };

  const handleRegisterClick = () => {
    setIsActive(true);
    navigate("/signup" + refLink, { replace: true });
  };

  return (
    <div className="auth">
      <div className={`auth__container ${isActive ? "auth__active" : ""}`}>
        <div className="auth__form-container auth__sign-up">
          <SignupForm>
            <h1>Create Account</h1>

            {refLink == "" ? (
              <div className="auth_form" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div className="auth__social-icons">
                  <a href="#" className="auth__icon" onClick={authGoogle}>
                    <i className="fa-brands fa-google"></i>
                  </a>
                  <a href="#" className="auth__icon" disabled>
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </div>

                <span>or use your email for registration</span>
              </div>
            ) : (
              ""
            )}
          </SignupForm>
        </div>

        <div className="auth__form-container auth__sign-in">
          <LoginForm>
            <h1>Sign In</h1>

            <div className="auth__social-icons">
              <a href="#" className="auth__icon" onClick={authGoogle}>
                <i className="fa-brands fa-google"></i>
              </a>
              <a href="#" className="auth__icon" disabled>
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>

            <span>or use your email password</span>
          </LoginForm>
        </div>

        <div className="auth__toggle-container">
          <div className="auth__toggle">
            <div className="auth__toggle-panel auth__toggle-left">
              <h1>Welcome, Friend!</h1>
              <p>Enter your card details to use all of site features</p>
              <Button
                ghost
                type="default"
                shape="round"
                className={`auth__button--toggle auth__hidden ${
                  isActive ? "" : "auth__active"
                }`}
                onClick={handleLoginClick}
              >
                Log In
              </Button>
            </div>

            <div className="auth__toggle-panel auth__toggle-right">
              <h1>Welcome Back!</h1>
              <p>Enter your card details to use all of site features</p>
              <Button
                ghost
                type="default"
                shape="round"
                className={`auth__button--toggle auth__hidden ${
                  isActive ? "auth__active" : ""
                }`}
                onClick={handleRegisterClick}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
