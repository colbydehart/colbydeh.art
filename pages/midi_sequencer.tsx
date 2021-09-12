import React from "react";
import { MIDIProvider, useOutput } from "../midi/context";
import { OutputSelector } from "../components/OutputSelector";
import styles from "../styles/sequencer.module.css";

export default function MIDISequencer() {
  return (
    <div className="page-container">
      <h2>Simple MIDI Sequencer</h2>
      <p>This is just a lil' goofaround sequencer.</p>
      <p>
        This will only work on Chrome or a browser that has{" "}
        <code>navigator.requestMIDIAccess</code>
      </p>
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
        <div
          key={i}
          className={tick ? styles.active : ""}
          style={{
            borderColor: currentTick === i ? "white" : "grey",
            borderStyle: "solid",
            borderWidth: "1px",
            width: "40px",
            height: "40px",
            display: "inline-block",
          }}
          onClick={() => toggleTick(i)}
        ></div>
      ))}
    </>
  );
};
