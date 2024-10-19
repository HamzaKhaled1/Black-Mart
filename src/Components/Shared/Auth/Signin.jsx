import { useState } from "react";
import { signin } from "../../../Helper/Apis/Shared/Auth/Signin";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addItemToLS } from "../../../Helper/Funcation/LocalStorage/AddItemToLS";
import { getRole } from "../../../Helper/Funcation/LocalStorage/GetRole";
import { getToken } from "../../../Helper/Funcation/LocalStorage/getToken";

export default function SignInForm() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    backEndErrors: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const checkErrors = () => {
    const { email, password } = userData;
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/.test(
        password
      )
    ) {
      errors.password = "Password Not Following The Pattern";
    }

    return errors;
  };

  const handleEmailRoute = (email) => {
    if (!email.includes("@blackmart.com")) {
      return email + "@blackmart.com";
    }
    return email;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formErrors = checkErrors();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const updatedUserData = {
        ...userData,
        email: handleEmailRoute(userData.email),
      };

      try {
        const response = await signin(updatedUserData);
        addItemToLS("loginData", response.data); // Save login data to localStorage or state

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully signed in!",
          showConfirmButton: true,
          confirmButtonColor: "#299fff",
          confirmButtonText: "Enter the App",
        }).then(() => {
          // Ensure getRole is called after loginData has been added
          const role = getRole(); // Get the user role from localStorage or API response
          console.log(role);

          let token = getToken();
          console.log(token);

          // Check user role and navigate accordingly
          if (role === "admin") {
            navigate("/admin/dashboard"); // Admin redirect
          } else {
            navigate("/"); // User redirect
          }

          // Reset form state
          setUserData({
            email: "",
            password: "",
          });
          setErrors({
            email: "",
            password: "",
            backEndErrors: "",
          });
        });
      } catch (error) {
        console.error(error);
        setErrors({
          ...errors,
          backEndErrors: "Invalid email or password",
        });
      }
    }
  };

  return (
    <form action="#" className="sign-in-form" onSubmit={handleFormSubmit}>
      <h2 className="form-title">Sign in</h2>
      <div className="input-field email">
        <div className="left">
          <i className="fas fa-envelope"></i>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={userData.email}
          />
        </div>
        <div className="right">@blackmart.com</div>
      </div>
      {errors.email && <p className="error">{errors.email}</p>}
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={userData.password}
        />
      </div>
      {errors.password && <p className="error">{errors.password}</p>}
      {errors.backEndErrors && <p className="error">{errors.backEndErrors}</p>}
      <input type="submit" value="Login" className="btn solid" />
    </form>
  );
}
