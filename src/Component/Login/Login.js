import React, { useState, useEffect } from "react";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import "./Login.css";
// import XML from "./dummy.xml";
import axios from "../../utils/Axios";

function Login() {
  const [loginError, setloginError] = useState('')
  const [errors, setErrors] = useState({
    emailError: "",
    userNameError: "",
    passwordError: "",
  });
  const [Form, setForm] = useState("Login");
  const [values, setValue] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [focus, setFocus] = useState({
    email: false,
    userName: false,
    password: false,
  });

  useEffect(() => {
    validate();
  }, [values, focus]);

  const handleForm = (e) => {
    e.preventDefault();
    let run = false;
    if (errors.emailError === "" && errors.passwordError === "" && values.email !== '' && values.password!=='') {
      run = true;
    } else {
      run = false;
    }
    e.preventDefault();
    if (Form === "Login" && run) {

      axios
        .post("/user_login", {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.data !== -1) {
            window.sessionStorage.setItem("token", res.data.token);
            window.sessionStorage.setItem("isLogedIn", true);
            window.sessionStorage.setItem("userName", res.data.user.name);
            window.location.reload();
          }
          else{
            setloginError('Incorrect Password / Email')
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    } else {
      if (errors.userNameError === "" && run) {
        axios
          .get(`/user_val/${values.userName}/${values.email}`)
          .then((res) => {
            if (res.data === -1) {
              axios
                .post("/users", {
                  name: values.userName,
                  email: values.email,
                  password: values.password,
                })
                .then((res) => {
                  window.sessionStorage.setItem("token", res.data.token);
                  window.sessionStorage.setItem("isLogedIn", true);
                  window.sessionStorage.setItem("userName", res.data.user.name);
                  window.location.reload();
                })
                .catch((res) => {
                  console.log(res);
                });
            } else {
              setErrors({
                ...errors,
                userNameError: "The User Name is already Taken",
                emailError: "The Email is already Taken",
              });
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
    }
  };

  const valueHandler = (e) => {
    setValue({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    setFocus({
      ...focus,
      [e.target.name]: true,
    });
  };

  const validate = () => {
    let validErrors = {
      email: "",
      userName: "",
      password: "",
    };
    if (
      focus.email && values.email !== '' &&
      !/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(values.email)
    ) {
      validErrors.email =
        "Please enter a valid email with an @ and a valid domain";
    } else {
      validErrors.email = "";
    }

    if (focus.userName && values.userName !== "" && values.userName.length < 3) {
      validErrors.userName = "User Name should be >= 3 characters";
    } else if (focus.userName && values.userName.length > 15) {
      validErrors.userName = "User Name should be <= 10 characters";
    } else {
      validErrors.userName = "";
    }
    if (focus.password && values.password !== "" && values.password.length < 6) {
      validErrors.password = "The password cannot be less than 6 characters";
    } else if (focus.password && values.password.length > 20) {
      validErrors.password = "The password cannot be more than 20 characters";
    } else {
      validErrors.password = "";
    }

    setErrors({
      ...errors,
      emailError: validErrors.email,
      userNameError: validErrors.userName,
      passwordError: validErrors.password,
    });
  };
  return (
    <>
      {window.sessionStorage.getItem("isLogedIn") ? (
        <div className="logedin_text">
          <span>{window.sessionStorage.getItem("userName")}</span>
          <p>Login Succesful</p>
          <p>Press the <span>Logout</span> button in the navigation bar to logout</p>
        </div>
      ) : (
        <div className="login_signup">
          <div className="selection_btn">
            <button
              id="login"
              onClick={(e) => {
                setForm("Login");
              }}
              className={Form === "Login" ? "active_tab" : null}
            >
              Login
            </button>
            <button
              id="signup"
              onClick={(e) => {
                setForm("Signup");
              }}
              className={Form === "Signup" ? "active_tab" : null}
            >
              Signup
            </button>
          </div>
          <form className="form_container">
            <div className="form_header">
              <p>{Form}</p>
            </div>
            <div className="form_inputs_container">
              {Form === "Signup" ? (
                <div className="input_wrap">
                  <label className="input_label">User Name</label>
                  <div>
                    <input
                      className="form_input"
                      name="userName"
                      type="text"
                      onChange={valueHandler}
                      value={values.userName}
                      placeholder="User Name"
                      onBlur={handleBlur}
                      required
                    />
                    <p className="form_feedback">{errors.userNameError}</p>
                  </div>
                </div>
              ) : null}
              <div className="input_wrap">
                <label className="input_label">Email</label>
                <div>
                  <input
                    className="form_input"
                    name="email"
                    type="email"
                    onChange={valueHandler}
                    value={values.email}
                    placeholder="Email"
                    onBlur={handleBlur}
                    required
                  />
                  <p className="form_feedback">{errors.emailError}</p>
                </div>
              </div>
              <div className="input_wrap">
                <label className="input_label">Password</label>
                <div>
                  <input
                    className="form_input"
                    name="password"
                    type="password"
                    onChange={valueHandler}
                    value={values.password}
                    placeholder="Password"
                    onBlur={handleBlur}
                    required
                  />
                  <p className="form_feedback">{errors.passwordError}</p>
                </div>
              </div>
              <div className="form_btn">
                <button type="submit" onClick={handleForm}>
                  {Form}
                </button>
              </div>
              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                render={renderProps => (
                  <button onClick={renderProps.onClick} disabled={renderProps.disabled} class="google-btn">
                    Login with Google
                    </button>
                )}
                buttonText="Login"
                cookiePolicy={'single_host_origin'}
              />
              <FacebookLogin
                cssClass="fb-btn"
                appId="1088597931155576"
                autoLoad={true}
                fields="name,email,picture" />
              {Form === "Login" ? (
                <div>
                  <p className="signup_text">
                    Don't have an account?{" "}
                    <span onClick={(e) => setForm("Signup")}>Signup</span>
                  </p>
                </div>
              ) : null}
              <p style={{ textAlign: "center" }} className="form_feedback">
                {loginError}
              </p>
            </div>
          </form>
          {/* <a href={XML} target="_blank">
        XML
      </a> */}
        </div>
      )}
    </>
  );
}

export default Login;
