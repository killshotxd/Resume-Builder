import React, { useState } from "react";
import InputControl from "../InputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, updateUserDb } from "../../Firebase";
import styles from "./Auth.module.css";

const Auth = (props) => {
  const isSignUp = props.signUp ? true : false;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const navigate = useNavigate();

  // -----------------Login Part ---------------

  const handleLogin = () => {
    if (!values.email || !values.password) {
      setErrMsg("All fields are required");
      return;
    }

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async () => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrMsg(err.message);
      });
  };

  // ----------------Login Part End ---------------

  // -----------------SignUp Part ---------------

  const handleSignUp = () => {
    if (!values.name || !values.email || !values.password) {
      setErrMsg("All fields are required");
      return;
    }

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (response) => {
        const userId = response.user.uid;
        await updateUserDb({ name: values.name, email: values.email }, userId);
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrMsg(err.message);
      });
  };

  // -----------------SignUp Part End ---------------

  const handleSubmission = (event) => {
    event.preventDefault();

    if (isSignUp) handleSignUp();
    else handleLogin();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmission}>
        <p className={styles.heading}>{isSignUp ? "SignUp" : "Login"}</p>

        {isSignUp && (
          <InputControl
            label="Name"
            placeholder="Enter your name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        )}

        <InputControl
          label="Email"
          placeholder="Enter your email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />

        <InputControl
          label="Password"
          placeholder="Enter your password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
          isPassword
        />

        <p className={styles.error}> {errMsg} </p>

        <button type="submit" disabled={submitButtonDisabled}>
          {isSignUp ? "SignUp" : "Login"}
        </button>

        <div className={styles.bottom}>
          {isSignUp ? (
            <p>
              Already have an account ? <Link to="/login">Login here</Link>
            </p>
          ) : (
            <p>
              New here ? <Link to="/signUp">Create an account</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;