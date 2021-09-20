import React from "react";
import { MIDIProvider, useOutput } from "../midi/context";
import { useClock } from "../midi/timer";
import { OutputSelector } from "../components/OutputSelector";
import { Header } from "../components/Header";

export default function PolySequencer() {
  return (
    <div className="page-container">
      <Header />

      <h2>Poly Sequencer</h2>
      <p>
        This sequencer has 4 sequencers that operate at once but at different
        rates. make sense?
      </p>

      <MIDIProvider>
        <OutputSelector />
        <hr />

        <Sequencer />
      </MIDIProvider>
    </div>
  );
}

const initialSteps = [false, false, false, false];

const initialSequencer = {
  steps: initialSteps,
  measure: 0.25,
};

const Sequencer: React.FC = () => {
  const output = useOutput();
  const [sequencers, setSequencers] = React.useState([
    initialSequencer,
    initialSequencer,
    initialSequencer,
    initialSequencer,
  ]);
  const onTick = (tick: number) => null;
  const { setBpm, bpm } = useClock(onTick, 4, 120);
  const playNote = () => {};

  return (
    <>
      <label htmlFor="bpm">BPM</label>
      <br />
      <input
        type="number"
        name="bpm"
        value={bpm}
        onChange={(e) => setBpm(+e.target.value)}
      />

      <hr />
    </>
  );
};
