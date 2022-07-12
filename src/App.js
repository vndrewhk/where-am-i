import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import db from "./firebase";
import { useEffect, useState } from "react";
function App() {
  const solutions = collection(db, "solutions");
  const submissions = collection(db, "submissions");
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [solutionDB, setSolutionDB] = useState({});

  const fetchSolutions = async () => {
    const solutionSnapshot = await getDocs(solutions);
    solutionSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      // set redux store to this whenever the page first loads so that we can get the answers?
      // or perhaps we will compare it to the firebase whenever a solution is sent in and then confirm afterwards
      console.log(doc.id);
      console.log(doc.data());
      console.log(doc.data()?.x);
    });
    setSolutionDB(solutionSnapshot);
    // return solutionSnapshot;
  };
  useEffect(() => {
    fetchSolutions();
  }, []);

  const validateNumber = (guess, target, margin) => {
    if (
      typeof target !== "number" ||
      typeof guess !== "number" ||
      typeof margin !== "number"
    ) {
      return false;
    }
    if (guess >= target - margin && guess <= target + margin) {
      return true;
    } else {
      return false;
    }
  };

  const validate = (submission, solutionSnapshot) => {
    solutionSnapshot.forEach((doc) => {
      let margin = doc.data()?.margin;
      // validateNumber = (guess, target, margin)
      //validates each guess
      if (
        validateNumber(submission.x, doc.data()?.x, margin) &&
        validateNumber(submission.y, doc.data()?.y, margin) &&
        doc.data()?.name == submission.name
      )
        console.log("true");
      return true;
    });
    console.log("false");
    return false;
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await MyAPI.getData(someId);
  //     // ...
  //   }
  //   fetchData();
  // }, [someId]); // Or [] if effect doesn't need props or state

  const submitDb = async (x, y, character) => {
    try {
      const docRef = await addDoc(collection(db, "submissions"), {
        character,
        x,
        y,
      });
    } catch (e) {
      console.error("Error adding document: " + e);
    }
  };

  const clickScreen = async (e) => {
    // pageX.innerText = e.pageX;
    // pageY.innerText = e.pageY;
    if (e.pageX > 100 && e.pageY > 100) {
      setCoordinates([e.pageX, e.pageY]);
    }
    // fetchSolutions();
    // submitDb(e.pageX, e.pageY);
  };

  return (
    <div className="App" onClick={clickScreen}>
      <Header></Header>
      <button onClick={submitDb}>click on me to add to db</button>
      <button
        onClick={() => {
          validate(
            { x: coordinates[0], y: coordinates[1], name: "Jinx" },
            solutionDB
          );
        }}
      >
        click on me try an answer
      </button>

      <div>
        Coordinates: X: {coordinates[0]}, Y: {coordinates[1]}
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;