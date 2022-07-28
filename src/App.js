import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import HelpModal from "./components/HelpModal";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  where,
  getFirestore,
} from "firebase/firestore";
import db from "./firebase";
import { useCallback, useEffect, useState } from "react";
import ContextMenu from "./components/contextmenu";
import LevelSelect from "./components/levelSelect";
import GameScreen from "./components/gameScreen";
import leagueWaldo from "./assets/league_waldo.jpeg";
import overwatchWaldo from "./assets/overwatch.jpeg";
import Modal from "./components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStopwatch } from "react-timer-hook";
function App() {
  // posts/postA/comments/commentA

  const [solutionDB, setSolutionDB] = useState({});
  const [characters, setCharacters] = useState([]);
  const [level, setLevel] = useState(0);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false); // hide menu
  // const [firstClicked, setFirstClicked] = useState(true);
  // if false, no modal, if true, check which one it is (correct,incorrect) then return that modal
  const [answerModal, setAnswerModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [finalModal, setFinalModal] = useState(false);

  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true });

  const levels = [null, leagueWaldo, overwatchWaldo];
  let margin = 2;

  const solutions = collection(db, `level/${level}/solutions`);
  const submissions = collection(db, `level/${level}/submissions`);

  const fetchSolutions = async (level) => {
    const solutionSnapshot = await getDocs(solutions);
    let chars = [];
    solutionSnapshot.forEach((doc) => {
      // console.log(doc.id);
      console.log("fetching");
      console.log(doc.data());
      let id = doc.id;
      let icon = doc.data().icon;
      // chars = [...chars,doc.id]
      chars = [...chars, { name: id, icon: icon }];
    });
    setCharacters(chars);
    setSolutionDB(solutionSnapshot);
  };
  useEffect(() => {
    fetchSolutions();
  }, [level]);

  const validateNumber = (guess, target, margin) => {
    if (guess >= target - margin && guess <= target + margin) {
      return true;
    } else {
      return false;
    }
  };

  const validate = (submission, solutionSnapshot) => {
    let correctAnswer = false;
    console.log(margin);
    solutionSnapshot.forEach((doc) => {
      // console.log(doc.id);
      // console.log(submission.character);
      if (
        validateNumber(submission.x, doc.data()?.x, margin) &&
        validateNumber(submission.y, doc.data()?.y, margin) &&
        doc.id == submission.character
      ) {
        // console.log(doc.id);
        correctAnswer = true;
      }
    });

    return correctAnswer;
  };

  const submitDb = async (x, y, character, correct) => {
    try {
      const docRef = await addDoc(
        collection(db, `level/${level}/submissions`),
        {
          character,
          x,
          y,
          correct,
        }
      );
    } catch (e) {
      console.error("Error adding document: " + e);
    }
  };
  const submitTime = async (time, name) => {
    try {
      // custom id
      //   db.collection("cities").doc("LA").set({
      //     name: "Los Angeles",
      //     state: "CA",
      //     country: "USA"
      // })
      const docRef = await addDoc(
        collection(db, `level/${level}/leaderboard`),
        {
          time,
          name,
        }
      );
    } catch (e) {
      console.log("Error adding score");
    }
  };

  // here we also want to update whether or not it was correct or incorrect
  const submitAnswer = async (x, y, character) => {
    if (validate({ x, y, character }, solutionDB)) {
      console.log("Epic!");
      // here we should remove the character from the list of solutions

      // const result = words.filter(word => word.length > 6);
      submitDb(x, y, character, true);
      successPopup(character);
      setShow(false);

      if (
        characters.filter((characterName) => characterName.name !== character)
          .length == 0
      ) {
        setFinalModal(true);
      }
      setCharacters(
        characters.filter((characterName) => characterName.name !== character)
      );
    } else {
      console.log("Not epic!");
      submitDb(x, y, character, false);
      errorPopup(character);
      setShow(false);
    }
  };

  // should be able to use this context menu to determine the spot of waldo and submit it instead of separating them
  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setCoordinates({
        x: Math.round(
          (event.nativeEvent.offsetX / event.nativeEvent.target.offsetWidth) *
            100
        ),
        y: Math.round(
          (event.nativeEvent.offsetY / event.nativeEvent.target.offsetHeight) *
            100
        ),
      });
      setShow(true);
    },
    [setAnchorPoint, setCoordinates]
  );

  // const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);
  const handleClick = useCallback(
    (e) => {
      if (level > 0) {
        // if (firstClicked == true) {
        if (show) {
          setShow(false);
        } else {
          handleContextMenu(e);
        }
        // } else {
        //   setFirstClicked(true);
        // }
      }
    },
    [show, level]
  );

  const changeLevel = (level) => {
    // setFirstClicked(false);
    if (level == 0) {
      reset();
      pause();
    }
    if (level != 0) {
      reset();
      start();
    }
    setLevel(level);
  };

  const successPopup = (character) =>
    toast.success(`You found ${character}!`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const errorPopup = (character) =>
    toast.error(`That wasn't ${character}. Try again!`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  if (level === 0) {
    return (
      <div className="h-[100vh] w-[100vw] ">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Header
            level={level}
            characters={characters}
            setHelpModal={setHelpModal}
          ></Header>
          <div className="h-full w-full flex justify-center items-center  bg-gradient-to-r from-rose-100 to-teal-100">
            <LevelSelect
              changeLevel={changeLevel}
              card={true}
              levels={levels.slice(1)}
            ></LevelSelect>
          </div>
          {helpModal && <HelpModal setHelpModal={setHelpModal}></HelpModal>}
        </div>
      </div>
    );
  }
  // WITH LEVEL
  return (
    <div className="h-full w-full">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="sticky top-0 w-full bg-white border-b border-b-gray-200 pb-4  mx-auto bg-teal-50">
          {/* <button onClick={() => setFinalModal(true)}>end game</button> */}
          <Header
            level={level}
            characters={characters}
            changeLevel={changeLevel}
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            days={days}
            isRunning={isRunning}
            start={start}
            pause={pause}
            reset={reset}
            setHelpModal={setHelpModal}
          >
            <LevelSelect changeLevel={changeLevel}></LevelSelect>
          </Header>
          {helpModal && <HelpModal setHelpModal={setHelpModal}></HelpModal>}

          <div>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
          {/* <div>
            Coordinates: X: {anchorPoint.x}, Y: {anchorPoint.y} Level: {level}
          </div> */}
        </div>
        {level > 0 && (
          <div
            className="w-[100vw] min-h-[90vh] h-full select-none transition-all duration-1000 ease-in-out"
            onClick={handleClick}
          >
            <GameScreen map={levels[level]}></GameScreen>
            {helpModal && <HelpModal setHelpModal={setHelpModal}></HelpModal>}
          </div>
        )}
        {finalModal && (
          <Modal
            setModal={setFinalModal}
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            days={days}
            isRunning={isRunning}
            start={start}
            pause={pause}
            reset={reset}
            changeLevel={changeLevel}
            submitTime={submitTime}
            level={level}
          ></Modal>
        )}
      </div>
      {show ? (
        <ContextMenu
          anchorPoint={anchorPoint}
          coordinates={coordinates}
          characters={characters}
          setModal={setFinalModal}
          submitAnswer={submitAnswer}
          margin={margin}
        ></ContextMenu>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default App;
