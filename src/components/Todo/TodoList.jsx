import React from "react";
import {useState} from'react';

import "./Todo.css"; // Changed to Todo.css
import { NavLink } from "react-router-dom";

function TodoList({ tasks, updateTask, deleteTask }) {

  const [time,setTime] =useState(0);
  // const setTimer= ()=>{

  // }
  

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

        <button >
          <NavLink to="/setTimerScreen" className="text-primary">
            Set Timer
          </NavLink>
          
        </button>


          




        </div>
      ))}
    </div>
  );
}

export default TodoList;