import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen fixed bg-ctp-mantle">
      <div className="flex flex-row justify-center items-center w-40 h-10 bg-ctp-surface0 rounded-full gap-4">
        <img src="/loadingCircle.png" className="animate-spin size-7" />
        <h1 className="text-ctp-peach text-lg">LOADING...</h1>
      </div>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        {/* center of screen div */}
        <div className="flex flex-col justify-center items-center h-screen w-screen fixed gap-5">
          <div
            className="flex flex-col bg-ctp-base w-fit h-fit p-5 rounded-2xl gap-5"
            id="hoverArea"
          >
            <h1 className="text-ctp-text text-center text-5xl">
              Yo.... waddup...
            </h1>
            <h1 className="text-ctp-subtext0 text-center text-sm">
              welcome to the kart site thing
            </h1>
          </div>
          <div className="flex flex-col bg-ctp-base w-fit h-fit p-5 rounded-2xl gap-2">
            <h1 className="text-ctp-text text-center text-3xl">
              here are various cool things i may have done
            </h1>
            <h1 className="text-ctp-subtext0 text-center text-sm">
              im not too sure either
            </h1>
            <div className="grid grid-cols-2 grid-rows-2 gap-5]"></div>
          </div>
        </div>
        <ToolbarMenu />
      </div>
    </Suspense>
  );
}

function ToolbarMenu() {
  const [top, setTop] = useState(0);
  const [lerp, setLerp] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setLerp((p) => {
        const next = p * 1.05;
        setTop((t) => t + next);
		return next;
      });
    }, 10);
  }, []);

  useEffect(() => console.log(top), [top]);

  return (
    <h1 style={{ top: `${top}px` }} className="text-ctp-text text-lg fixed">
      a
    </h1>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
