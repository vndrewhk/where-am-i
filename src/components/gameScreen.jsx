import React from "react";

function GameScreen(props) {
  return (
    <div className="w-full h-full bg-red-500">
      <img className="bg-cover" src={props.map} alt="Game map" />
    </div>
  );
}

export default GameScreen;
