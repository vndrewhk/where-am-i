import React from "react";

function LevelSelect({ changeLevel }) {
//   props.changeLevel = changeLevel;
  return (
    <div>
      <button onClick={() => changeLevel(0)}>Level 0</button>
      <button onClick={() => changeLevel(1)}>Level 1</button>
    </div>
  );
}

export default LevelSelect;
