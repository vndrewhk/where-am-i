import { Typography } from "@mui/material";
import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Tooltip } from "@material-tailwind/react";
import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useStopwatch } from "react-timer-hook";
export default function Header({
  level,
  characters,
  children,
  changeLevel,
  seconds,
  minutes,
  hours,
  days,
  isRunning,
  start,
  pause,
  reset,
}) {
  //   const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
  //     useStopwatch({ autoStart: true });
  const CustomHeader = styled(Typography)`
    color: #20b2aa;
  `;
  const PaddedTooltip = styled(Tooltip)`
    padding-left: 2px;
    padding-right: 2px;
  `;
  //   console.log(level);
  let headerTitle = (
    <div className="flex items-center justify-center">
      <CustomHeader variant="h4" component="h1">
        Where&nbsp;
      </CustomHeader>
      <Typography variant="h4" component="h1">
        Am I?
      </Typography>
    </div>
  );
  if (level == 0) {
    return (
      <div className="border-b-gray-200 border-b w-full  pt-2 ">
        <div className="flex items-center justify-center">{headerTitle}</div>
        {children}
        <div className="absolute right-5 top-5 cursor-pointer buttonHover">
          <PaddedTooltip content="Help">
            <HelpOutlineIcon></HelpOutlineIcon>
          </PaddedTooltip>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex items-center  justify-around  w-full pt-2">
        <div className="absolute right-5 top-5 cursor-pointer buttonHover">
          <PaddedTooltip content="Help">
            <HelpOutlineIcon></HelpOutlineIcon>
          </PaddedTooltip>
        </div>
        <div
          className="absolute left-5 top-5 cursor-pointer buttonHover"
          onClick={() => changeLevel(0)}
        >
          <Tooltip content="Go back">
            <ArrowCircleLeftIcon></ArrowCircleLeftIcon>
          </Tooltip>
        </div>
        <div className="flex items-center gap-x-2 max-w-[400px] min-w-[400px]">
          {headerTitle}
          {/* <CustomHeader variant="h4" component="h1">
        Where&nbsp;
      </CustomHeader>
      <Typography variant="h4" component="h1">
        Am I?
      </Typography> */}
          {/* <Tooltip content="Material Tailwind">
        <Button variant="gradient">Show Tooltip</Button>
      </Tooltip> */}
          {characters.length > 0 &&
            characters.map((character) => (
              <Tooltip content={character.name} key={character.name}>
                <img
                  className="w-[40px] h-[40px] rounded-full"
                  src={character.icon}
                  alt={character.name}
                />
              </Tooltip>
            ))}
        </div>
        {/* <Typography variant="h6" component="h2">
          Level {level}
        </Typography> */}
        <div className="w-[75px] max-w-[75px] min-w-[75px]">
          <div>
            {hours && <span>{hours}:</span>}
            <span>{minutes}</span>:
            {seconds < 10 ? <span>0{seconds}s</span> : <span>{seconds}s</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
