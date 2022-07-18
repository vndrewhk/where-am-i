import React from "react";
import { useEffect, useState } from "react";
import db from "../firebase";
function ContextMenu(props) {
  let characters = props.characters;
  //   console.log(characters);
  //   console.log(typeof characters);

  //   const submitAnswer = async (x, y, character) => {
  //     submitDb(x, y, character);
  //     if (validate({ x, y }, solutionDB)) {
  //       console.log("Epic!");
  //     } else {
  //       console.log("Not epic!");
  //     }
  //   };
  return (
    <div>
      <div
        className="menu-circle"
        style={{
          top: props.anchorPoint.y - 25,
          left:
            props.anchorPoint.x < window.screen.width / 2
              ? props.anchorPoint.x - 25
              : props.anchorPoint.x - 25,
        }}
      ></div>
      <ul
        className="menu"
        style={{
          top: props.anchorPoint.y - 25,
          left:
            props.anchorPoint.x < window.screen.width / 2
              ? props.anchorPoint.x + 25
              : props.anchorPoint.x - 175,
        }}
      >
        {/* map over props */}
        {characters &&
          // const map1 = array1.map(x => x * 2)
          characters.map((character) => (
            <li
              className="hoverAnimation"
              key={character}
              onClick={() =>
                props.submitAnswer(
                  props.anchorPoint.x,
                  props.anchorPoint.y,
                  character
                )
              }
            >
              {character}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
