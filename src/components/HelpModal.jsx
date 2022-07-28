import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import { Tooltip } from "@material-tailwind/react";
import helpIcons from "../assets/helpIcons.png";
function HelpModal({ setHelpModal }) {
  const resetLevel = () => {
    setHelpModal(false);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">How to Play</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setHelpModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto w-[35vw]">
              <p className=" text-slate-500 text-lg leading-relaxed">
                <span className="text-[#20b2aa]">1 - </span> Select a Level from
                the Main Menu
              </p>
              <p className=" text-slate-500 text-lg leading-relaxed">
                <span className="text-[#20b2aa]">2 - </span> Find the characters
                from their icons at the top!
              </p>
              <img
                src={helpIcons}
                alt="Character Icons"
                className="w-[50%] ml-auto mr-auto border border-black"
              ></img>
              <p className=" text-slate-500 text-lg leading-relaxed">
                <span className="text-[#20b2aa]">3 - </span> Click on the
                character on the screen and check if you're right!
              </p>
              <p className=" text-slate-500 text-lg leading-relaxed">
                <span className="text-[#20b2aa]">4 - </span> Submit a score!
              </p>
              <p className=" text-slate-300 text-lg leading-relaxed">
                Hint - If you hover over the icons, you can see their names!
              </p>

              {/* ladderboards */}
            </div>
            {/*footer*/}
            <div className="flex items-center  p-6 border-t border-solid border-slate-200 rounded-b justify-between">
              <div className="flex items-center">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/vndrewhk"
                  className="buttonHover"
                >
                  <Tooltip content="Github">
                    <div className="buttonHover">
                      <GitHubIcon
                        style={{ color: "#20b2aa", marginRight: "0.5rem" }}
                      ></GitHubIcon>
                    </div>
                  </Tooltip>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/andrew-m-394714136"
                  className="buttonHover"
                >
                  <Tooltip content="LinkedIn">
                    <div className="buttonHover">
                      <LinkedInIcon
                        style={{ color: "#20b2aa", marginRight: "0.5rem" }}
                      ></LinkedInIcon>
                    </div>
                  </Tooltip>
                </a>

                <Tooltip content="My Website">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="http://andrewhkma.vercel.app/"
                    className="buttonHover"
                  >
                    <div className="buttonHover">
                      <CoPresentIcon
                        style={{ color: "#20b2aa" }}
                      ></CoPresentIcon>
                    </div>
                  </a>
                </Tooltip>
              </div>

              <button
                className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border border-green-500 rounded-lg"
                type="button"
                onClick={resetLevel}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default HelpModal;
