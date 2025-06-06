import { useRef, useEffect } from "react";
import Odometer from "./Odometer";
import useStopWatchStore from "../store/stopWatchStore.js";
import useSessionStore from "../store/sessionStore.js";

const formatTime = (timestamp) => {
  const totalSeconds = Math.floor(timestamp / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (s || parts.length === 0) parts.push(`${s}s`);

  return parts.join(" ");
};

const StopWatch = () => {
  const stopWatchRef = useRef(0);
  const intervalRef = useRef(null);
  const {
    time,
    setTime,
    isPaused,
    setIsPaused,
    isLoaded,
    setIsLoaded,
    task,
    setTask,
  } = useStopWatchStore();
  const { sessions, setSession, clearSessions } = useSessionStore();

  const handleStart = () => {
    stopWatchRef.current = new Date().getTime() - time;
    intervalRef.current = setInterval(() => {
      setTime(new Date().getTime() - stopWatchRef.current);
    }, 10);
  };

  const handlePause = () => clearInterval(intervalRef.current);

  const handleReset = () => {
    if (time > 0 && task.trim()) {
      if (sessions.length >= 3) {
        alert(
          "You’ve reached the session limit. Get the full version of this app — Follow me on X!"
        );
        return;
      }

      setSession({ task: task.trim(), duration: formatTime(time) });
      setTask("");
    }

    clearInterval(intervalRef.current);
    setTime(0);
    setIsPaused(true);
    setIsLoaded(true);
  };

  const handleToggle = () => {
    isPaused ? handleStart() : handlePause();
    setIsPaused(!isPaused);
    setIsLoaded(false);
  };

  const handleClearAll = () => clearSessions();

  useEffect(() => {
    if (!isPaused) {
      stopWatchRef.current = new Date().getTime() - time;
      intervalRef.current = setInterval(() => {
        setTime(new Date().getTime() - stopWatchRef.current);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, []);

  const ms = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
  const s = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
  const m = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, "0");
  const h = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      {/* Task Input */}
      <input
        type="text"
        name="title"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What are you working on?"
        className="w-[214px] text-gray-400 text-center px-3 py-2 mb-1 rounded-sm transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-orange-600"
        disabled={!isPaused}
      />

      {/* Stopwatch Display */}
      <div
        className={`text-[3rem] mb-8 flex gap-2 ${
          isLoaded || (isPaused ? "blink" : "")
        }`}
      >
        <Odometer number={h} height="4.5rem" fontSize="3rem" /> :
        <Odometer number={m} height="4.5rem" fontSize="3rem" /> :
        <Odometer number={s} height="4.5rem" fontSize="3rem" /> :
        <Odometer number={ms} height="4.5rem" fontSize="3rem" />
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          className={`bg-orange-500 text-white text-sm font-medium px-8 py-3.5 transition duration-300 ease-in-out cursor-pointer ${
            isPaused ? "rounded-full" : "rounded-xl"
          }`}
          onClick={handleToggle}
        >
          {isPaused ? "Start" : "Pause"}
        </button>

        <button
          className="bg-gray-900 text-gray-400 text-sm font-medium px-8 py-3.5 rounded-full cursor-pointer"
          onClick={handleReset}
        >
          {task ? "Save & Reset" : "Reset"}
        </button>
      </div>

      {/* Sessions */}
      {sessions.length > 0 && (
        <div className="w-md mt-16">
          <div className="mb-2 flex justify-between">
            <h3 className="text-gray-400">Saved sessions</h3>
            <button
              className="text-red-500 cursor-pointer"
              onClick={handleClearAll}
            >
              Clear all
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {sessions.map((session, index) => (
              <li
                key={index}
                className="bg-gray-900 text-white text-sm px-4 py-2.5 flex justify-between rounded-md"
              >
                <span className="max-w-[60%] truncate">{session.task}</span>
                <span className="text-orange-500 font-mono">
                  {session.duration}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StopWatch;
