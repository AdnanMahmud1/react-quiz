import React from "react";
import successImage from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";
import Classes from "../styles/Summary.module.css";

export default function Summary({ score, noq }) {
  const getKeyword = () => {
    if ((score / (noq * 5)) * 100 < 50) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 75) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  };
  const { loading, error, result } = useFetch(
    `https://api.pexels.com/v1/search?query=${getKeyword()}&per_page=1`,
    "GET",
    {
      Authorization: process.env.REACT_APP_PEXELS_API_KEY,
    }
  );

  const image = result ? result?.photos[0].src.medium : successImage;

  return (
    <div className={Classes.summary}>
      <div className={Classes.point}>
        <p className={Classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>
      {loading && <div className={Classes.badge}>Loading your badge...</div>}
      {error && <div className={Classes.badge}>Error</div>}
      {!loading && !error && (
        <div className={Classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}
