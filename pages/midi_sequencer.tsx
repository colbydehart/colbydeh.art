import React from "react";
import { MIDIProvider, useOutput } from "../midi/context";
import { useClock } from "../midi/timer";
import { OutputSelector } from "../components/OutputSelector";
import { Header } from "../components/Header";
import styles from "../styles/sequencer.module.css";

export default function MIDISequencer() {
  return (
    <div className="page-container">
      <Header />

      <h2>Simple MIDI Sequencer</h2>
      <p>This is just a lil' goofaround sequencer.</p>
      <p>
        This will only work on Chrome or a browser that has{" "}
        <code>navigator.requestMIDIAccess</code>
      </p>
      <p>
        Source code can be found{" "}
        <a href="https://github.com/colbydehart/colbydeh.art/blob/main/pages/midi_sequencer.tsx">
          here
        </a>
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
  const [current, setCurrent] = React.useState(0);
  const [steps, setSteps] = React.useState<boolean[]>([
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
  const toggleStep = (idx: number) =>
    setSteps((steps) => steps.map((step, i) => (i === idx ? !step : step)));

  const handleTick = (tick: number) => {
    // quarter note
    if (tick % 192 === 0) {
      steps[current] && output?.send([0x90, 60, 0x7f]);
      setCurrent((current + 1) % 8);
    }
  };
  useClock(handleTick);

  return (
    <>
      {steps.map((step, i) => (
        <div
          key={i}
          className={step ? styles.active : ""}
          style={{
            borderColor: current === i ? "white" : "grey",
            borderStyle: "solid",
            borderWidth: "1px",
            width: "40px",
            height: "40px",
            display: "inline-block",
          }}
          onClick={() => toggleStep(i)}
        ></div>
      ))}
    </>
  );
};
