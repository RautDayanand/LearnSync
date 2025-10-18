import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useLocation } from "react-router-dom";

function TimerScreen() {
  const location = useLocation();
  const time = location.state?.totalSeconds || 0;

  const [paused, setPaused] = useState(false);
  const [key, setKey] = useState(0);

  const startTimer = () => setPaused(false);
  const stopTimer = () => setPaused(true);
  const resetTimer = () => {
    setPaused(true);
    setKey((prev) => prev + 1);
  };

  // Helper function to format time as MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const mm = m < 10 ? `0${m}` : m;
    const ss = s < 10 ? `0${s}` : s;
    return `${mm}:${ss}`;
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow text-center" style={{ width: "320px" }}>
        <h3 className="mb-3">Task Timer</h3>

        <div className="mb-3 d-flex justify-content-center">
          <CountdownCircleTimer
            key={key}
            isPlaying={!paused}
            duration={time}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
          >
            {({ remainingTime }) => (
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {formatTime(remainingTime)}
              </div>
            )}
          </CountdownCircleTimer>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-success" onClick={startTimer}>
            Start
          </button>
          <button className="btn btn-danger" onClick={stopTimer}>
            Stop
          </button>
          <button className="btn btn-primary" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimerScreen;
