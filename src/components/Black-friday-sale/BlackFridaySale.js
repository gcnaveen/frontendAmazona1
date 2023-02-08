import React, { useEffect, useRef, useState } from 'react';
import './BlackFridaySale.css';

export default function BlackFridaySale() {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();
  const startTimer = () => {
    const countDowndate = new Date('Feb 10 2023 00:00:00').getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDowndate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop timer
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div>
      {/* <h1>Black friday sale</h1> */}
      <section className="timer-container">
        <section className="timer">
          <div>
            <span className="mdi mdi-calendar-clock timer-icon"></span>
            <h2>BLACK FRIDAY SALE</h2>
            <p> </p>
          </div>
          <div>
            <section>
              <p>{timerDays}</p>
              <p>
                {' '}
                <small>Days</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerHours}</p>
              <p>
                {' '}
                <small>Hours</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerMinutes}</p>
              <p>
                {' '}
                <small>Minutes</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerSeconds}</p>
              <p>
                {' '}
                <small>Seconds</small>
              </p>
            </section>
          </div>
        </section>
      </section>
    </div>
  );
}
