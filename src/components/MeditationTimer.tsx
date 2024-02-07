// src/MeditationTimer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { playTada, playSound } from '../utils/soundUtils';
import { saveRecord } from '../utils/saveRecord';
import { Button } from '@nextui-org/react';

const MeditationTimer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [quarterDuration, setQuarterDuration] = useState<number>(0);
  //   const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [counter, setCounter] = useState<number>(1);

  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const playQuarterSound = (times = 1) => {
    const playSequentially = (index = 0) => {
      if (index < times) {
        playSound();
        setTimeout(() => playSequentially(index + 1), 2920); // Adjust the delay time (in milliseconds) as needed
      }
    };

    playSequentially();
  };

  const countDown = () => {
    if (seconds === 0) {
      if (minutes === 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setCounter(0);
        playTada();
        // alert('Meditation time is up!');
        setIsActive(false);
        saveRecord(totalSeconds / 60);
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
  const pauseTimer = () => {
    if (minutes > 0 || seconds > 0) {
      setIsActive(false);
    }
  };
  const resumeTimer = () => {
    if (minutes > 0 || seconds > 0) {
      setIsActive(true);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
    setTotalSeconds(0);
    setQuarterDuration(0);
    setCounter(1);
  };

  return (
    <div>
      <div>
        <label className="">
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
            className="w-20 h-10 m-4 text-center rounded-md p-1"
          />
        </label>
        <label>
          Seconds:
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
            className="w-20 h-10 m-4 text-center rounded-md p-1"
          />
        </label>
      </div>
      <div className="m-4">
        <p className="text-4xl m-8 font-mono font-semibold ">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>

        <div className="flex justify-evenly p-4 w-1/2 items-cente m-auto">
          {!isActive && !totalSeconds && (
            <Button onClick={startTimer} color="primary">
              Start
            </Button>
          )}
          {totalSeconds ? (
            <>
              <Button onClick={isActive ? pauseTimer : resumeTimer}>
                {isActive ? 'Pause' : 'Resume'}
              </Button>
              {!isActive && <Button onClick={resetTimer}>Reset</Button>}
            </>
          ) : null}
        </div>
        <button onClick={playSound}>sound</button>
      </div>
      <section className="flex-col sm:flex-row sm:flex  justify-evenly p-4 bg-[#1a1a1a] w-[80vw] rounded-lg">
        <p>totalSeconds: {totalSeconds}</p>
        <p>quarterDuartion: {quarterDuration}</p>
        <p>counter: {counter}</p>

        {localStorage.getItem('minutes') && (
          <p>{localStorage.getItem('minutes')} : minutes meditated</p>
        )}
      </section>
    </div>
  );
};

export default MeditationTimer;
