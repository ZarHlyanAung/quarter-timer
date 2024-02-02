// src/MeditationTimer.tsx
import React, { useState, useEffect, useRef } from 'react';

const MeditationTimer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [quarterDuration, setQuarterDuration] = useState<number>(0);
  //   const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [counter, setCounter] = useState<number>(1);

  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const playTada = () => {
    const audio = new Audio('./tada.flac');
    audio.play();
  };

  const playQuarterSound = (times = 1) => {
    const play = () => {
      const audio = new Audio('./bell.wav');
      audio.play();
    };

    const playSequentially = (index = 0) => {
      if (index < times) {
        play();
        setTimeout(() => playSequentially(index + 1), 2920); // Adjust the delay time (in milliseconds) as needed
      }
    };

    playSequentially();
  };

  //I want to make a Quarter sound on every each quarter has passed on the duration user set

  const countDown = () => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(intervalRef.current);
        setCounter(0);
        playTada();
        // alert('Meditation time is up!');
        setIsActive(false);
      } else {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      }
    } else {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }

    // Check if a quarter of the time has passed
    const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
    const quarterDuration = totalSeconds / 4;

    if (elapsedSeconds > 0 && elapsedSeconds % quarterDuration === 0) {
      playQuarterSound(counter == 4 ? 0 : counter);
      setCounter((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        countDown();
      }, 1000);
    }
    return () => {
      // Clear the interval when the component is unmounted or when isActive is false
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, minutes, seconds]);

  const startTimer = () => {
    if (minutes > 0 || seconds > 0) {
      setIsActive(true);
      setTotalSeconds(minutes * 60 + seconds);
      setQuarterDuration((minutes * 60 + seconds) / 4);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div>
      <div>
        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Seconds:
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
          />
        </label>
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={playQuarterSound}>sound</button>
      </div>
      <div>
        <p>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        <p>totalSeconds: {totalSeconds}</p>
        <p>quarterDuartion: {quarterDuration}</p>
        <p>counter: {counter}</p>
      </div>
    </div>
  );
};

export default MeditationTimer;
