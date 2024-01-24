import { useState, useEffect } from "react";

const useTimer = (seconds: number) => {
  const [countdown, setCountdown] = useState(seconds);
  const [isActive, setIsActive] = useState(false);

  function startTimer() {
    setIsActive(true);
  }

  function resetTimer() {
    setIsActive(false);
    setCountdown(seconds);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, countdown]);

  const countdownHHMM = `${Math.floor(countdown / 60)
    .toString()
    .padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`;

  return { countdown, countdownHHMM, startTimer, resetTimer };
};

export default useTimer;
