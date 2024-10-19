/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SignUpForm from "../../Components/Shared/Auth/Signup";
import SignInForm from "../../Components/Shared/Auth/Signin";
import FormPanels from "../../Components/Shared/Auth/FormPanels";

import "../../assets/CSS/Shared/sign.css";

export default function Sign() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className={`signContainer ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <SignUpForm handleSignInClick={handleSignInClick} />
          <SignInForm />
        </div>
      </div>
      <FormPanels
        handleSignUpClick={handleSignUpClick}
        handleSignInClick={handleSignInClick}
      />
    </div>
  );
}
