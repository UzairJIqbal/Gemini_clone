import React, { useContext } from "react";
import { MdViewSidebar } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import Context from "../context/Context";

const Sidebar = ({extended , onToggle}) => {
  const {onsend,previousprompts,setRecentprompt,newChat} = useContext(Context)
  const LoadPrompt = async (prompt)=> {
    setRecentprompt(prompt)
    await onsend(prompt)
  }
  
  return (
    <div
      className={`fixed top-0 left-0 h-screen flex flex-col justify-between sm:display-none ${
        extended ? "w-64" : "w-20"
      } bg-gray-900 text-white p-4 transition-all duration-300 z-50`}
    >
      <div className="top space-y-6">
        <MdViewSidebar
          className="text-3xl cursor-pointer hover:text-gray-300 transition"
          onClick={onToggle}
        />
        <div onClick={()=>newChat()} className="flex items-center gap-3 bg-gray-700 px-3 py-2 rounded cursor-pointer hover:bg-gray-600 transition">
          <FaPlus />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent flex flex-col animate-fade-in">
            <p className="text-sm text-gray-400 mb-2">Recent</p>
            {previousprompts.map((item,index)=>{
              return(
              
                <div key={index} className="flex items-center gap-3 bg-gray-800 px-3 py-2 rounded cursor-pointer hover:bg-gray-700 transition" onClick={()=>LoadPrompt(item)}>
                <MdMessage />
                <p>{item.slice(0,18)}...</p>
              </div>
              
              )
            })}
          </div>
        )}
      </div>
      <div className="bottom space-y-3">
        <div className="flex items-center gap-4 bg-gray-800 px-3 py-2 rounded cursor-pointer hover:bg-gray-600 transition">
          <FaQuestion />
          {extended && <p>Help</p>}
        </div>
        <div className="flex items-center gap-4 bg-gray-800 px-3 py-2 rounded cursor-pointer hover:bg-gray-600 transition">
          <FaHistory />
          {extended && <p>Activity</p>}
        </div>
        <div className="flex items-center gap-4 bg-gray-800 px-3 py-2 rounded cursor-pointer hover:bg-gray-600 transition">
          <IoIosSettings />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;