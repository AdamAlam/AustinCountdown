import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getDefaultNormalizer } from '@testing-library/react';
import './App.css';
import Lol from './LOL_1.mp4';

function CountdownTimer() {
  let timeUp = false;
  const calculateTimeLeft = () => {
    const difference = +new Date('July 14, 2020 12:38:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        WEEKS: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
        DAYS: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7),
        HOURS: Math.floor((difference / (1000 * 60 * 60)) % 24),
        MINUTES: Math.floor((difference / 1000 / 60) % 60),
        SECONDS: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeUp = true;
      timeLeft = {
        timeUp: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeUp) {
      timerComponents.push(
        <span>
          <span className="number">Naked Breakfast Time</span>
        </span>
      );
      return;
    } else if (timeLeft[interval] == 1) {
      timerComponents.push(
        <span>
          <span className="number">{timeLeft[interval]}</span>{' '}
          {interval.slice(0, -1)}{' '}
        </span>
      );
    } else {
      timerComponents.push(
        <span>
          <span className="number">{timeLeft[interval]}</span> {interval}{' '}
        </span>
      );
    }
  });

  return (
    <React.Fragment>
      <div className="bg-image"></div>
      <div className="div-video">
        <video autoPlay loop className="video" muted playsinline>
          <source src={Lol} type="video/mp4" />
        </video>
      </div>
      <div className="center digital">
        {timerComponents[0]}
        {timerComponents[1]}
        {timerComponents[2]}
        {timerComponents[3]}
        {timerComponents[4]}
      </div>
    </React.Fragment>
  );
}

const rootElement = document.getElementById('root');
export default CountdownTimer;
