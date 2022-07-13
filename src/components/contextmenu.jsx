import React from "react";
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

function ContextMenu() {
  //this is where i want to submit the answer to the firestore
  //we can pass the solutions into here through the app component?
  //whenever we trigger the context menu to open, we should fetch the solutions and then pass them into the component?

  //no no we just pass a set of answers to the context menu, and when we click on one, it fires the submission

  //pass a function down FROM app that fires the submission, see udemy course again
 
  return <div>contextmenu</div>;
}

export default ContextMenu;
