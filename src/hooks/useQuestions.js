import { get, getDatabase, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestions(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      // database related works
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoID + "/questions");
      const quizQuery = query(quizRef);
      try {
        setError(false);
        setLoading(true);
        // request firebase
        const snapShot = await get(quizQuery);

        setLoading(false);
        if (snapShot.exists()) {
          setQuestions((prevQuestions) => {
            return [...prevQuestions, ...Object.values(snapShot.val())];
          });
        }
      } catch (err) {
        console.log("🚀 ~ file: useVideoList.js:17 ~ fetchVideos ~ err", err);
        setLoading(false);
        setError(true);
      }
    }
    // setTimeout(() => {

    // }, 2000);
    fetchQuestions();
  }, [videoID]);

  return {
    loading,
    error,
    questions,
  };
}
