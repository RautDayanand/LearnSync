import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
function TimerScreen (){

    const[time,setTime]=useState(0);
    const[paused,setPaused]=useState(false);
    
    useEffect(()=>{
        return 
    },[startTimer,stopTimer,resetTimer])

    const startTimer=()=>{

    }
    const stopTimer=()=>{
        
    }

    const resetTimer=()=>{
        
    }

    return(
        <>
        <div>
            <button onClick={startTimer}>start</button>
            <button onClick={stopTimer}>stop</button>
            <button onClick={resetTimer}>reset</button>
        </div>
        </>
    )
}
export default TimerScreen;