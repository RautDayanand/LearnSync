import React from "react";
import {useState} from'react';

import "./Todo.css"; // Changed to Todo.css
import {useNavigate} from "react-router-dom"

function TodoList({ tasks, updateTask, deleteTask }) {
  const navigate =useNavigate();

  return (
    <div className="todo-list">
      {tasks.map((t, i) => (
        <div key={i} className={`todo-item ${t.isComplete ? "completed" : ""}`}>
          <div className="todo-content">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={t.isComplete}
                onChange={() => updateTask(i)}
              />
              <span className="checkmark"></span>
            </label>
            <span className={`task-text ${t.isComplete ? "completed-text" : ""}`}>
              {t.task}
            </span>
          </div>
          <button 
            className="delete-btn"
            onClick={() => deleteTask(i)}
            aria-label="Delete task"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>

        <button className="timer-btn"
        onClick={() => navigate("/setTimerScreen", { state: { taskName: t.task } })}
        >
          
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
            </svg>
          
        </button>


        </div>
      ))}
    </div>
  );
}

export default TodoList;