import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

export default function useVideoList(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      // database related works
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(8)
      );
      try {
        setError(false);
        setLoading(true);
        // request firebase
        const snapShot = await get(videoQuery);
        console.log(
          "🚀 ~ file: useVideoList.js:20 ~ fetchVideos ~ snapShot",
          snapShot
        );
        setLoading(false);
        if (snapShot.exists()) {
          setVideos((prevVideos) => {
            return [...prevVideos, ...Object.values(snapShot.val())];
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.log("🚀 ~ file: useVideoList.js:17 ~ fetchVideos ~ err", err);
        setLoading(false);
        setError(true);
      }
    }
    // setTimeout(() => {

    // }, 2000);
    fetchVideos();
  }, [page]);

  return {
    loading,
    error,
    videos,
    hasMore,
  };
}
