// components/TimerControls.tsx
import React from 'react';
import { Button } from '@nextui-org/react';

interface TimerControlsProps {
  startTimer: () => void;
  pauseResumeTimer: () => void;
  resetTimer: () => void;
  isActive: boolean;
  totalSeconds: number;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  startTimer,
  pauseResumeTimer,
  resetTimer,
  isActive,
  totalSeconds,
}) => (
  <div className="flex justify-evenly p-4 w-1/2 items-center">
    {!isActive && !totalSeconds && (
      <Button onClick={startTimer} color="primary">
        Start
      </Button>
    )}
    {totalSeconds && (
      <>
        <Button onClick={pauseResumeTimer}>
          {isActive ? 'Pause' : 'Resume'}
        </Button>
        {!isActive && <Button onClick={resetTimer}>Reset</Button>}
      </>
    )}
  </div>
);

export default TimerControls;
