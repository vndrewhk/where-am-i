import { Tooltip } from "@material-tailwind/react";
import React from "react";

function LevelSelect({ changeLevel, card, levels }) {
  //   props.changeLevel = changeLevel;
  if (card === true) {
    console.log(levels);
    return (
      <div className="flex  gap-x-10">
        {levels.length > 0 &&
          levels.map((level, index) => (
            <Tooltip content={"Level " + (index + 1)}>
              <img
                src={level}
                key={level}
                className="h-[300px] w-[300px] object-cover rounded-xl cursor-pointer cardHover"
                onClick={() => changeLevel(index + 1)}
              ></img>
            </Tooltip>
          ))}
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => changeLevel(0)}>Level 0</button>
      <button onClick={() => changeLevel(1)}>Level 1</button>
      <button onClick={() => changeLevel(2)}>Level 2</button>
    </div>
  );
}

export default LevelSelect;
