import React from "react";
import { useEffect, useState } from "react";
import db from "../firebase";
function ContextMenu(props) {
  let characters = props.characters;
  //   let margin = props.margin;
  let margin = 35;
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
          top: props.anchorPoint.y - margin,
          left:
            props.anchorPoint.x < window.screen.width / 2
              ? props.anchorPoint.x - margin
              : props.anchorPoint.x - margin,
        }}
      ></div>
      <ul
        className="menu"
        style={{
          top: props.anchorPoint.y - margin,
          left:
            props.anchorPoint.x < window.screen.width / 2
              ? props.anchorPoint.x + margin
              : props.anchorPoint.x - (200 - margin),
        }}
      >
        {/* map over props */}
        {characters &&
          // const map1 = array1.map(x => x * 2)
          characters.map((character) => (
            <li
              className="hoverAnimation"
              key={character.name}
              onClick={() =>
                props.submitAnswer(
                  props.coordinates.x,
                  props.coordinates.y,
                  character.name
                )
              }
            >
              {character.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
