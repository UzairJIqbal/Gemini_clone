import { createContext } from "react";
import main from "../config/gemini";
import { useState } from "react";

const Context = createContext();
export default Context;

export const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentprompt, setRecentprompt] = useState("");
  const [previousprompts, setPreviousprompts] = useState([]);
  const [showresult, setShowresult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultdata, setResultdata] = useState("");

  const Delaypara = (index, nextWord) => {
    setTimeout(() => {
      setResultdata(prev=>prev+nextWord)
    }, 75*index);
  };

  const NewChat = () => {
    setloading(false)
    setShowresult(false)
  }
  const onsend = async (prompt) => {
    setResultdata("");
    setloading(true);
    setShowresult(true);
    let response;
    if (prompt !== undefined) {
      response = await main(prompt)
      setRecentprompt(prompt)
    }
    else{
      setPreviousprompts(prev => [...prev,input])
      setRecentprompt(input)
      response = await main(input)
    }
    let responseArray = response.split("**");
    let newResponse = " "
    for (let i = 0; i < responseArray.length; i++) {
      if (i == 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>"+responseArray[i]+"</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>")
    let newResponseArray = newResponse2.split(" ")
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i]
      Delaypara(i,nextWord+" ")
      
    }
    setloading(false);
    setInput("");
  };

  const ContextValue = {
    previousprompts,
    setPreviousprompts,
    onsend,
    setRecentprompt,
    recentprompt,
    showresult,
    loading,
    resultdata,
    input,
    setInput,
    NewChat
  };

  return (
    <Context.Provider value={ContextValue}>{props.children}</Context.Provider>
  );
};
