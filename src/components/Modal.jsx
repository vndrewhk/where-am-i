import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Leaderboards from "./leaderboards";

export default function Modal({
  changeLevel,
  setModal,
  answerState,
  seconds,
  minutes,
  hours,
  days,
  isRunning,
  start,
  pause,
  reset,
  submitTime,
  level,
}) {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [postModal, setPostModal] = useState(false);
  const handleInput = (e) => {
    setInput(e.target.value);
    setName(e.target.value);
    // console.log(e.target.value);
  };
  let time = hours * 3600 + minutes * 60 + seconds;
  const submitScore = (time, input) => {
    console.log(time);
    console.log(input);
    submitTime(time, input);
    setInput("");
    // setModal(false);
    setPostModal(true);
  };
  useEffect(() => {
    // first;

    return () => {
      pause();
    };
  }, []);

  const resetLevel = () => {
    setModal(false);
    changeLevel(0);
    reset();
  };

  if (postModal) {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Leaderboards </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className=" text-slate-500 text-lg leading-relaxed">
                  Good Job {name}!
                </p>
                {/* ladderboards */}
                <Leaderboards level={level}></Leaderboards>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={resetLevel}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>)
      </>
    );
  }

  return (
    <>
      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                You finished in {hours > 0 && <span>{hours} hours, </span>}{" "}
                {minutes > 0 && minutes > 1 && (
                  <span>{minutes} minutes, and</span>
                )}
                {minutes == 1 && <span>{minutes} minute, and</span>} {seconds}{" "}
                {seconds == 1 ? <span>second</span> : <span>seconds</span>}!
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto justify-center mr-auto ml-auto">
              <p className="text-slate-500 text-lg leading-relaxed pb-2 mr-auto ml-auto">
                Enter your name to submit a new score to the leaderboards!
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitScore(time, input);
                }}
                className=" bg-transparent outline-none text-[#d9d9d9] inset-0 mr-auto ml-auto border-transparent w-full"
              >
                <input
                  type="text"
                  onChange={(e) => handleInput(e)}
                  value={input}
                  placeholder="Username"
                  className="ml-auto mr-auto px-5 bg-transparent outline-none  text-black inset-0   border-2  border-teal-200  rounded-xl w-full p-2  shadow-lg"
                ></input>
              </form>{" "}
              {/* ladderboards */}
              <Leaderboards level={level}></Leaderboards>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => submitScore(time, input)}
              >
                Submit Score
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>)
    </>
  );
}
