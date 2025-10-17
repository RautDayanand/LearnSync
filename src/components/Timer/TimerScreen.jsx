import React, { useState, useEffect, useRef } from 'react';

// --- INLINE SVG ICON DEFINITIONS ---

const PlayIcon = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

const PauseIcon = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
);

const ResetIcon = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M3 2v6h6"></path>
        <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
        <path d="M21 22v-6h-6"></path>
        <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
    </svg>
);
// -----------------------------------------------------------------

// Constants
const TOTAL_TIME_SECONDS = 100;
const CIRCLE_RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; 

// Utility function to format seconds into MM:SS
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Custom hook for handling the timer logic
const useTimer = (initialTime, onFinish) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const timeRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            timeRef.current = setInterval(() => {
                setTime(prev => {
                    if (prev <= 1) {
                        clearInterval(timeRef.current);
                        timeRef.current = null;
                        setIsRunning(false);
                        onFinish();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timeRef.current) {
            clearInterval(timeRef.current);
            timeRef.current = null;
        }

        return () => {
            if (timeRef.current) {
                clearInterval(timeRef.current);
            }
        };
    }, [isRunning, onFinish]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setTime(initialTime);
    };

    return { time, isRunning, startTimer, stopTimer, resetTimer };
};


// Main Application Component
const App = () => {
    const handleTimerFinish = () => {
        console.log("Timer has finished!");
    };

    const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer(
        TOTAL_TIME_SECONDS,
        handleTimerFinish
    );

    // Calculate progress for the circular SVG timer
    const progress = ((TOTAL_TIME_SECONDS - time) / TOTAL_TIME_SECONDS) * CIRCUMFERENCE;
    const strokeDashoffset = CIRCUMFERENCE - progress;

    const isFinished = time === 0;
    const buttonText = isRunning ? "Pause" : (time === TOTAL_TIME_SECONDS ? "Start" : "Resume");
    
    // Simplified status text
    const statusText = isRunning ? "Counting Down" : isFinished ? "Finished" : "Ready";

    // Dynamic Colors
    const primaryColor = '#3b82f6'; // Blue
    const dangerColor = '#ef4444'; // Red
    const darkTextColor = '#1f2937'; // Dark Gray Text

    const accentColor = isFinished ? dangerColor : primaryColor; 
    const statusColor = isFinished ? dangerColor : darkTextColor;

    // --- PURE INLINE STYLES (Minimalist Light Mode) ---

    const containerStyle = {
        minHeight: '100vh',
        backgroundColor: '#ffffff', // White Background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        width: '100%',
        fontFamily: 'Inter, Arial, sans-serif', // Modern font stack
    };
    
    // Card style is removed for a floating effect, only max width remains
    const mainContentStyle = {
        width: '100%',
        maxWidth: '320px',
        textAlign: 'center',
    };

    const titleStyle = {
        fontSize: '2rem', // Slightly larger title
        fontWeight: '900', // Extra bold
        color: darkTextColor, 
        marginBottom: '0.25rem', // Smaller margin
    };

    const statusTextStyle = {
        fontSize: '1rem', // Slightly larger status text
        fontWeight: '500',
        color: statusColor,
        marginBottom: '2.5rem', // Push status text down from title
        transition: 'color 0.5s ease',
    };

    const timerContainerStyle = {
        position: 'relative',
        width: '200px', // Slightly larger circle
        height: '200px',
        margin: '0 auto 2.5rem',
    };

    const timeTextStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '3rem', // Large, prominent time
        fontWeight: 'bolder',
        color: darkTextColor, 
        letterSpacing: '-1px',
    };

    const controlsStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem', // Slightly wider gap
    };

    const baseButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.65rem 1.25rem',
        borderRadius: '9999px', // Fully rounded/pill shape
        fontWeight: '600',
        transition: 'background-color 0.2s ease, transform 0.1s ease',
        border: 'none',
        cursor: 'pointer',
        boxShadow: 'none', // Removed shadow for minimalism
        textDecoration: 'none',
        fontSize: '1rem',
    };

    const primaryButtonStyle = {
        ...baseButtonStyle,
        backgroundColor: isRunning ? dangerColor : primaryColor, 
        color: 'white',
        // Hover and Active styles
        onMouseOver: (e) => e.currentTarget.style.backgroundColor = isRunning ? '#b91c1c' : '#2563eb', 
        onMouseOut: (e) => e.currentTarget.style.backgroundColor = primaryButtonStyle.backgroundColor,
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
    };

    const resetButtonStyle = {
        ...baseButtonStyle,
        padding: '0.75rem', // Reset button remains square (for icon only)
        width: '44px',
        height: '44px',
        backgroundColor: '#f3f4f6', 
        color: darkTextColor, 
        border: `1px solid #e5e7eb`,
        // Hover and Active styles
        onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#e5e7eb',
        onMouseOut: (e) => e.currentTarget.style.backgroundColor = resetButtonStyle.backgroundColor,
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
    };

    // Helper for applying button styles within JSX
    const getPrimaryButtonProps = () => ({
        onClick: isRunning ? stopTimer : startTimer,
        disabled: isFinished && !isRunning,
        style: {
            ...primaryButtonStyle,
            backgroundColor: isRunning ? dangerColor : primaryColor,
            opacity: (isFinished && !isRunning) ? 0.6 : 1,
            cursor: (isFinished && !isRunning) ? 'not-allowed' : 'pointer',
        },
        onMouseOver: (e) => e.currentTarget.style.backgroundColor = isRunning ? '#b91c1c' : '#2563eb',
        onMouseOut: (e) => e.currentTarget.style.backgroundColor = isRunning ? dangerColor : primaryColor,
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
    });
    
    // Helper for applying reset button styles within JSX
    const getResetButtonProps = () => ({
        onClick: resetTimer,
        disabled: time === TOTAL_TIME_SECONDS && !isRunning,
        style: {
            ...resetButtonStyle,
            opacity: (time === TOTAL_TIME_SECONDS && !isRunning) ? 0.6 : 1,
            cursor: (time === TOTAL_TIME_SECONDS && !isRunning) ? 'not-allowed' : 'pointer',
        },
        onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#e5e7eb',
        onMouseOut: (e) => e.currentTarget.style.backgroundColor = resetButtonStyle.backgroundColor,
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
    });


    // --- Component JSX (Using Inline Styles) ---

    return (
        <div style={containerStyle}>
            <div style={mainContentStyle}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={titleStyle}>
                        Minimal Timer
                    </h1>
                    <p style={statusTextStyle}>
                        {statusText}
                    </p>
                </div>

                {/* Circular Timer Display */}
                <div style={timerContainerStyle}>
                    <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} width="200" height="200">
                        {/* Background Circle */}
                        <circle 
                            cx="100" 
                            cy="100" 
                            r={CIRCLE_RADIUS} 
                            stroke="#e5e7eb" 
                            strokeWidth="12" // Thicker stroke for prominence
                            fill="transparent"
                        />
                        {/* Progress Circle */}
                        <circle 
                            cx="100" 
                            cy="100" 
                            r={CIRCLE_RADIUS} 
                            stroke={accentColor} 
                            strokeWidth="12" 
                            fill="transparent"
                            strokeDasharray={CIRCUMFERENCE}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            transform="rotate(-90 100 100)"
                            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
                        />
                    </svg>
                    
                    {/* Time Text */}
                    <div style={timeTextStyle}>
                        {formatTime(time)}
                    </div>
                </div>

                {/* Control Buttons */}
                <div style={controlsStyle}>
                    
                    {/* Start / Pause Button */}
                    <button {...getPrimaryButtonProps()}>
                        {isRunning ? <PauseIcon style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem' }} /> : <PlayIcon style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem' }} />}
                        {buttonText}
                    </button>

                    {/* Reset Button */}
                    <button {...getResetButtonProps()} aria-label="Reset Timer">
                        <ResetIcon style={{ width: '1.25rem', height: '1.25rem', stroke: darkTextColor }} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
