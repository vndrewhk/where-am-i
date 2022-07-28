import { CircularProgress } from "@mui/material";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import Score from "./score";

function Leaderboards({ level }) {
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, `level/${level}/leaderboard`),
        orderBy("time", "asc")
      ),
      (snapshot) => {
        console.log(snapshot);
        setScores(snapshot.docs);
      }
    );
    setIsLoading(false);

    return () => unsubscribe();
  }, [db]);

  return (
    <div className="w-[45vw] h-[40vh] overflow-y-scroll overflow-x-hidden">
      <div className=" px-28 flex justify-between text-xl font-extrabold text-cyan-600 border-b-cyan-600 border-b pt-4 pb-2 mb-2">
        <div>Name</div>
        <div>Seconds</div>
      </div>
      {scores.length > 0 && isLoading == false ? (
        scores.map((score) => {
          return <Score scoreInfo={score.data()}>Score</Score>;
        })
      ) : (
        <CircularProgress color="secondary"></CircularProgress>
      )}
    </div>
  );
}

export default Leaderboards;
