import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Who has scored most runs in IPL?",
    "What is the princess of the Spain?",
    "Which crypto should I buy according to recent trends?",
    "What is the meaning of life?",
    "Can you explain the concept of artificial intelligence?",
    "How does climate change affect the environment?",
    "What are the benefits of reading books?",
    "What is the capital of France?",
    "Can you provide some tips for improving productivity?",
    "What are the symptoms of COVID-19?",
    "What is the plot of 'To Kill a Mockingbird'?",
    "How does the stock market work?",
    "What are the different types of renewable energy sources?",
  ];

  const surprise = () => {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Error....Ask a Quesstion");
      return;
    }

    try {
      const options = {
        method: "Post",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("http://localhost:3000/gemini", options);
      const data = await response.text();
      console.log(data);
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: data,
        },
      ]);
      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong!! Please try again later");
    }
  };

  return (
    <div className="m-[10vw] w-[80vw] h-[80vh] flex flex-col">
      <p className="font-extralight text-sm">
        What do you want to know?
        <button
          className="pt-3 pb-3 pr-6 pl-6 mb-2 ml-5 bg-rose-200 rounded-md font-semibold"
          onClick={surprise}
          disabled={!chatHistory}
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your text here!"
          className="border-none pt-4 pb-4 pr-7 pl-7 box-border text-base outline-none w-[90%] font-extralight"
        ></input>
        {!error && (
          <button
            className="min-w-[10%] border-none border-x-2 border-solid border-red-200 bg-rose-200 font-semibold cursor-pointer"
            onClick={getResponse}
          >
            Ask Me
          </button>
        )}
        {error && (
          <button
            className="min-w-[10%] border-none border-x-2 border-solid border-red-200 bg-rose-200 font-semibold cursor-pointer"
            onClick={clear}
          >
            Clear
          </button>
        )}
      </div>
      {error && <p>{error}</p>}
      <div className="mt-10 overflow-scroll">
        {chatHistory.map((i, _index) => (
          <div key={_index}>
            <p className="font-extralight text-sm p-4 border-solid border-[0.5px] border-red-200 bg-rose-100 rounded-md font-extralight font-sm m-4">
              {i.role} : {i.parts}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
