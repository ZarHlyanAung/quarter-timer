//create responsive header using tailwind , load icon from assets/logo.svg and "Quarter Timer"
import React from 'react';
import Logo from '../assets/logo.svg';
import { playSound } from '../utils/soundUtils';

export const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-5 w-full">
      <main className="flex items-center">
        <img src={Logo} alt="Quarter Timer" className="w-10 sm:w-15 mr-4 " />
        <h3 className="font-quicksand font-extrabold text-xl sm:text-2xl">
          Quarter Timer
        </h3>
      </main>
      <div
        className="border border-black rounded-md px-4 py-2 cursor-pointer hover:bg-slate-600 font-extrabold font-quicksand"
        onClick={playSound}
      >
        Sound
      </div>
    </div>
  );
};
