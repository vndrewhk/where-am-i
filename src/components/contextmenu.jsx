import React from "react";
import { useEffect, useState } from "react";
import db from "../firebase";
function ContextMenu(props) {
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
        <li
          onClick={() => {
            console.log("Share");
          }}
        >
          Share to..
        </li>
        <li
          onClick={() => {
            console.log("Cut");
          }}
        >
          Cut
        </li>
        <li
          onClick={() => {
            console.log("Copy");
          }}
        >
          Copy
        </li>
        <li
          onClick={() => {
            console.log("Paste");
          }}
        >
          Paste
        </li>
        <hr className="divider" />
        <li>Refresh</li>
        <li>Exit</li>
      </ul>
    </div>
  );
}

export default ContextMenu;
