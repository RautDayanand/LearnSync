import React, { useState } from "react";
import Task from "./Task";
import TodoList from "./TodoList";
import SetTimerScreen from "../Timer/SetTimerScreen";

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    
    
    const addTask = (task) => setTasks([...tasks, task]);
    const updateTask = (index) => setTasks(
        tasks.map((t, i) => i === index ? { ...t, isComplete: !t.isComplete } : t)
    );
    const deleteTask = (index) => setTasks(tasks.filter((t, i) => i !== index));


    

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f9fafb",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px"
        }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Todo App</h1>
            <Task addTask={addTask} />
            <TodoList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
            
        </div>
    )
}

export default TodoApp;
