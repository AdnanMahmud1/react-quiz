import { get, getDatabase, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      // database related works
      const db = getDatabase();
      const answerRef = ref(db, "answers/" + videoID + "/questions");
      const answerQuery = query(answerRef);
      try {
        setError(false);
        setLoading(true);
        // request firebase
        const snapShot = await get(answerQuery);
        setLoading(false);
        if (snapShot.exists()) {
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapShot.val())];
          });
        }
      } catch (err) {
        console.log("🚀 ~ file: useVideoList.js:17 ~ fetchVideos ~ err", err);
        setLoading(false);
        setError(true);
      }
    }
    fetchAnswers();
  }, [videoID]);

  return {
    loading,
    error,
    answers,
  };
}
