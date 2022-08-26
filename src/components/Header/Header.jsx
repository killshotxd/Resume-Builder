import React from "react";
import styles from "./Header.module.css";
import resSvg from "../../assets/undraw.svg";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { async } from "@firebase/util";
const Header = (props) => {
  const isAuth = props.auth ? true : false;

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p className={styles.heading}>
          A <span>Resume</span> that stands out!
        </p>
        <p className={styles.heading}>
          Make your own Resume. <span>It's free</span>
        </p>

        <div className={styles.btnDiv}>
          {isAuth ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={handleSignIn}>SignUp</button>
          )}
        </div>
      </div>
      <div className={styles.right}>
        <img src={resSvg} alt="Resume" />
      </div>
    </div>
  );
};

export default Header;
