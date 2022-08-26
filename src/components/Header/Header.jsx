import React from "react";
import styles from "./Header.module.css";
import resSvg from "../../assets/undraw.svg";

const Header = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p className={styles.heading}>
          A <span>Resume</span> that stands out!
        </p>
        <p className={styles.heading}>
          Make your own Resume. <span>It's free</span>
        </p>
      </div>
      <div className={styles.right}>
        <img src={resSvg} alt="Resume" />
      </div>
    </div>
  );
};

export default Header;
