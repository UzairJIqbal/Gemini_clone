import React, { useContext } from "react";
import { FaUserAlt, FaCompass, FaCode, FaMicrophone } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { RiGeminiLine } from "react-icons/ri";
import Context from "../context/Context";

const Main = ({ isSidebarOpen }) => {
  const {
    onsend,
    recentprompt,
    showresult,
    loading,
    resultdata,
    setInput,
    input,
  } = useContext(Context);
  const cards = [
    {
      text: "Suggests beautiful places to see on an upcoming road trip",
      icon: <FaCompass className="absolute bottom-3 right-3 text-gray-600" />,
    },
    {
      text: "Briefly summarize this concept: urban planning",
      icon: <FaLightbulb className="absolute bottom-3 right-3 text-gray-600" />,
    },
    {
      text: "Brainstorm team bonding activities for our work retreat",
      icon: <MdMessage className="absolute bottom-3 right-3 text-gray-600" />,
    },
    {
      text: "Improve the readability of the following code",
      icon: <FaCode className="absolute bottom-3 right-3 text-gray-600" />,
    },
  ];

  return (
    <>
      <div
        className={`flex-1 max-h-[100vh] pb-[120px] relative transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-20"
        }`}
      >
        <div className="flex justify-between items-center text-2xl p-5 text-gray-600 mb-5">
          <p className="font-medium">Gemini</p>
          <FaUserAlt className="w-10 h-10 p-2 rounded-full hover:bg-gray-200 transition" />
        </div>

        <div
          className={`max-w-[900px] mx-auto px-5 ${
            isSidebarOpen ? "ml-[100px]" : "ml-[110px]"
          }`}
        >
          <div className="text-center mb-16">
            {!showresult ? (
              <>
                <h1 className="text-4xl sm:text-5xl font-medium text-gray-300 mb-4 mr-28 mt-10">
                  <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
                    Hello, Dev.
                  </span>
                </h1>
                <p className="text-2xl sm:text-3xl text-gray-300">
                  How can I help you today?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-20">
                  {cards.map((card, index) => (
                    <div
                      key={index}
                      className="h-[200px] p-4 bg-slate-100 rounded-lg relative cursor-pointer hover:bg-slate-300 transition duration-300"
                    >
                      <p className="text-gray-700 text-base">{card.text}</p>
                      {card.icon}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="result bg-white/10 p-4 rounded-lg  space-y-6">
                <div className="result-title flex items-center space-x-4">
                  <FaUserAlt className="w-10 h-10 p-2 rounded-full bg-gray-100 text-white hover:bg-gray-200 transition" />
                  <p className="text-lg text-black">{recentprompt}</p>
                </div>

                <div className="result-data flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-blue-500 text-white">
                    <RiGeminiLine className="w-6 h-6" />
                  </div>
                  {loading ? (
                    <div className="loading w-full flex flex-col gap-2">
                      <hr className="rounded-md border-none bg-slate-200 h-5" />
                      <hr className="rounded-md border-none bg-slate-200 h-5" />
                      <hr className="rounded-md border-none bg-slate-200 h-5" />
                    </div>
                  ) : (
                    <p
                      className="text-black text-base font-light text-[17px] leading-[1.8]"
                      dangerouslySetInnerHTML={{ __html: resultdata }}
                    ></p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full px-4 flex justify-center relative left-[5%] sm:static sm:left-0">
          <div className="bottom-2 w-full max-w-[550px] sm:relative sm:left-[40px] px-4 flex flex-col items-start sm:items-center gap-2 z-10 lg:mt-[50px]">
            <div className="flex items-center gap-4 bg-slate-100 px-5 py-2 rounded-full w-full shadow-md">
              <input
                type="text"
                placeholder="Enter a prompt here"
                className="flex-1 bg-transparent border-none outline-none text-base h-10"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <div className="flex items-center gap-3">
                <RiGalleryFill className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                <FaMicrophone className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                <IoSend
                  className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => onsend()}
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 text-left sm:text-center w-full pl-1 sm:pl-0">
              Gemini may display inaccurate info. Always double-check responses.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
