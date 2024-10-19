/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import SignSVG from "../../../assets/SVGs/Mobile login-rafiki.svg";
import LoginSVG from "../../../assets/SVGs/Forgot password-rafiki.svg";
import Header from "../Header/Header";
export default function FormPanels({ handleSignUpClick, handleSignInClick }) {
  return (
    <>
    <div className="panels-container sm:mt-20">
      <div className="panel left-panel">
        <div className="content">
          <h3>Black Mart</h3>
          <p>
            Discover a world of possibilities! Join us and explore a vibrant
            community where ideas flourish and connections thrive.
          </p>
          <button
            className="btn transparent"
            id="sign-up-btn"
            onClick={handleSignUpClick}
          >
            Sign up
          </button>
        </div>
        <img
          // src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
          src={LoginSVG}
          className="image"
          alt=""
        />
      </div>
      <div className="panel right-panel">
        <div className="content">
          <h3 className="">Black Mart</h3>
          <p>
            Thank you for being part of our System. Your presence enriches our
            shared experiences. Let's continue this journey together!
          </p>
          <button
            className="btn transparent"
            id="sign-in-btn"
            onClick={handleSignInClick}
          >
            Sign in
          </button>
        </div>
        <img
          // src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
          src={SignSVG}
          className="image"
          alt=""
        />
      </div>
    </div>
    </>
  );
}
