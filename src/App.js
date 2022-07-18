import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
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
import Modal from "./components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  // posts/postA/comments/commentA

  const [solutionDB, setSolutionDB] = useState({});
  const [characters, setCharacters] = useState([]);
  const [level, setLevel] = useState(0);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false); // hide menu
  // const [firstClicked, setFirstClicked] = useState(true);
  // if false, no modal, if true, check which one it is (correct,incorrect) then return that modal
  const [answerModal, setAnswerModal] = useState(false);
  const [finalModal, setFinalModal] = useState(false);

  const levels = [null, leagueWaldo];

  const solutions = collection(db, `level/${level}/solutions`);
  const submissions = collection(db, `level/${level}/submissions`);

  const fetchSolutions = async (level) => {
    const solutionSnapshot = await getDocs(solutions);
    let chars = [];
    solutionSnapshot.forEach((doc) => {
      // console.log(doc.id);
      // console.log(doc.data());
      chars = [...chars, doc.id];
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
    let margin = 25;

    let correctAnswer = false;
    solutionSnapshot.forEach((doc) => {
      if (
        validateNumber(submission.x, doc.data()?.x, margin) &&
        validateNumber(submission.y, doc.data()?.y, margin) &&
        doc.data()?.name == submission.name
      ) {
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

  // here we also want to update whether or not it was correct or incorrect
  const submitAnswer = async (x, y, character) => {
    if (validate({ x, y }, solutionDB)) {
      console.log("Epic!");
      submitDb(x, y, character, true);
      successPopup(character);
      setShow(false);
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
      setShow(true);
    },
    [setAnchorPoint]
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
  return (
    <div className="h-full w-full">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Header></Header>
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
        <LevelSelect changeLevel={changeLevel}></LevelSelect>
        <div>
          Coordinates: X: {anchorPoint.x}, Y: {anchorPoint.y} Level: {level}
        </div>
        <button
          onClick={() => submitAnswer(anchorPoint.x, anchorPoint.y, "Jinx")}
        >
          Submit Answer
        </button>
        {level > 0 && (
          <div
            className="w-[100vw] min-h-[90vh] h-full select-none"
            onClick={handleClick}
          >
            <GameScreen map={levels[level]}></GameScreen>
          </div>
        )}
        {finalModal && <Modal setModal={setFinalModal}></Modal>}
      </div>
      {show ? (
        <ContextMenu
          anchorPoint={anchorPoint}
          characters={characters}
          submitAnswer={submitAnswer}
        ></ContextMenu>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default App;
