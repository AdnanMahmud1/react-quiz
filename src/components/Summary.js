import React from "react";
import image from "../assets/images/success.png";
import Classes from "../styles/Summary.module.css";

export default function Summary({ score, noq }) {
  return (
    <div className={Classes.summary}>
      <div className={Classes.point}>
        <p className={Classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      <div className={Classes.badge}>
        <img src={image} alt="Success" />
      </div>
    </div>
  );
}
