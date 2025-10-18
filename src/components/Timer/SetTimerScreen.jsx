import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SetTimerScreen() {
  const [time, setTime] = useState("00:00:00");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const parts = time.split(":").map(Number);
    if (parts.length !== 3) {
      alert("Please enter time in HH:MM:SS format");
      return;
    }

    const [hours, minutes, seconds] = parts;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    navigate("/TimerScreen", { state: { totalSeconds } });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="card-title text-center mb-4">Set Your Timer</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg text-center"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="HH:MM:SS"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Start Timer
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetTimerScreen;
