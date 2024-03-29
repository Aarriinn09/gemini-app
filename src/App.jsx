import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Who has scored most runs in IPL",
    "What is the princess of the Spain",
    "Which crypto should I buy according to recent trends",
  ];

  const surprise = () => {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  return (
    <div className="m-[10vw] w-[80vw] h-[80vh] flex flex-col">
      <p className="font-extralight text-sm">
        What do you want to know?
        <button
          className="pt-3 pb-3 pr-6 pl-6 mb-2 ml-5 bg-rose-200 rounded-md font-semibold"
          onClick={surprise}
          disabled={chatHistory}
        >
          Surprise Me
        </button>
      </p>
      <div
        style={{
          "box-shadow": "rgba(0,0,82,0.15) 0 2px 4px",
        }}
        className="w-[100%] border-red-200 border-2 border-solid box-border rounded-md flex overflow-hidden"
      >
        <input
          value={""}
          onChange={""}
          placeholder="Type your text here!"
          className="border-none pt-4 pb-4 pr-7 pl-7 box-border text-base outline-none w-[90%] font-extralight"
        ></input>
        {!error && (
          <button className="min-w-[10%] border-none border-x-2 border-solid border-red-200 bg-rose-200 font-semibold cursor-pointer">
            Ask Me
          </button>
        )}
        {error && <button className="">Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="mt-10 overflow-scroll">
        <div key={""}>
          <p className="font-extralight text-sm p-4 border-solid border-[0.5px] border-red-200 bg-rose-100 rounded-md font-extralight font-sm m-4"></p>
        </div>
      </div>
    </div>
  );
}

export default App;
