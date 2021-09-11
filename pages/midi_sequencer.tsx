import React from "react";
import { MIDIProvider, useOutput } from "../midi/context";
import { OutputSelector } from "../components/OutputSelector";

export default function MIDISequencer() {
  return (
    <div className="page-container">
      <h2>MIDI Sequencer</h2>
      <p>This is just a goofaround sequencer.</p>
      <MIDIProvider>
        <OutputSelector />
        <hr />

        <Sequencer />
      </MIDIProvider>
    </div>
  );
}

const Sequencer: React.FC = () => {
  const output = useOutput();
  const [intr, setIntr] = React.useState<number | undefined>();
  const [currentTick, setCurrentTick] = React.useState<number>(0);
  const [ticks, setTicks] = React.useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // Events
  const toggleTick = (idx: number) =>
    setTicks((ticks) => ticks.map((tick, i) => (i === idx ? !tick : tick)));

  React.useEffect(() => {
    if (!!intr) window.clearInterval(intr);
    setIntr(
      window.setInterval(() => {
        if (ticks[currentTick]) output?.send([0x90, 60, 0x7f]);
        setCurrentTick((currentTick + 1) % 8);
      }, 200)
    );
  }, [output, ticks, currentTick]);
  return (
    <>
      {ticks.map((tick, i) => (
        <button
          key={i}
          style={{
            color: tick ? "white" : "grey",
            background: tick ? "009" : "#900",
          }}
          onClick={() => toggleTick(i)}
        >
          {tick ? "On" : "Off"}
        </button>
      ))}
    </>
  );
};
