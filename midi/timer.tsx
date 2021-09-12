import React from "react";

const useClock = (
  handleTick: (tick: number) => void,
  intialBars: number = 120,
  initialBpm: number = 4
) => {
  /** tick will be a number between 0 and 192 times the number of beats in the clock (bars * 4) */
  const [tick, setTick] = React.useState(0);
  const [lastTime, setLastTime] = React.useState(new Date());
  const [bpm, setBpm] = React.useState(initialBpm);
  /** number of measures  */
  const [bars, setBars] = React.useState(intialBars);

  const advanceClock = () => {
    const now = new Date();

    // 60 / bpm === one quarter note length in seconds, multiply that by 1000
    // to get the time of one quarter note in milliseconds, then divide that by
    // 192 which is the division we use for a tick, a 192nd note. It's 64 * 3
    // so you can do triplets
    if (+lastTime < +now - ((60 / bpm) * 1000) / 192) {
      handleTick(tick);
      setLastTime(now);
      setTick((tick + 1) % (192 * 4 * bars));
    }

    window.setTimeout(advanceClock, 0);
  };

  React.useEffect(() => {
    const timerId = window.setInterval(advanceClock, 0);
    return () => window.clearInterval(timerId);
  }, [handleTick]);
};
