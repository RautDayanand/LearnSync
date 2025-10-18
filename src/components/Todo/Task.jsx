import React from 'react'
import {useState} from 'react'
import "./Todo.css" // Changed to Todo.css

function Task({addTask}){
    const[task,setTask]=useState("");
    const[isComplete,setIsComplete]=useState(false);
    
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        addTask({task:task,isComplete:isComplete});
        setTask("");
        setIsComplete(false);
    }
    
    return (
        <div className="task-form-container">
            <form onSubmit={handleSubmit} className="task-form">
                <div className="input-group">
                    <input
                        required
                        type="text"
                        value={task}
                        onChange={(e)=>{ setTask(e.target.value) }}
                        placeholder="What needs to be done?"
                        className="task-input"
                    >
                    </input>
                    <button type="submit" className="submit-btn">
                        <span>Add Task</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                    </button>

                    
                </div>
                
                
            </form>
        </div>
    )
}

export default Task;