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
function App() {
  // posts/postA/comments/commentA

  const [solutionDB, setSolutionDB] = useState({});
  const [characters, setCharacters] = useState([]);
  const [level, setLevel] = useState(0);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false); // hide menu
  const [firstClicked, setFirstClicked] = useState(false);
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

  const submitDb = async (x, y, character) => {
    try {
      const docRef = await addDoc(
        collection(db, `level/${level}/submissions`),
        {
          character,
          x,
          y,
        }
      );
    } catch (e) {
      console.error("Error adding document: " + e);
    }
  };

  const submitAnswer = async (x, y, character) => {
    submitDb(x, y, character);
    if (validate({ x, y }, solutionDB)) {
      console.log("Epic!");
    } else {
      console.log("Not epic!");
    }
    setShow(false);
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
      }
      // else {
      //   setFirstClicked(true);
      // }
      // }
    },
    [show, level, firstClicked]
  );

  const changeLevel = (level) => {
    // setFirstClicked(false);
    setLevel(level);
  };

  // use state to determine whether or not handleClick should open contextmenu or click
  // useEffect(() => {
  //   document.addEventListener("click", handleClick);
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // });

  return (
    <div className="h-full w-full">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Header></Header>
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
