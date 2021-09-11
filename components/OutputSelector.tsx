import React from "react";
import { useSetOutput, useOutputs } from "../midi/context";

export const OutputSelector: React.FC = () => {
  const setOutput = useSetOutput();
  const outputs = useOutputs();
  const handler = (id: string) => setOutput(outputs.find((o) => o.id === id));
  return (
    <>
      <label htmlFor="midi-output">MIDI Output</label>
      <br />
      <select
        id="midi-output"
        name="midi-output"
        onChange={(e) => handler(e.target.value)}
      >
        <option value=""></option>
        {outputs.map((output) => (
          <option key={output.id} value={output.id}>
            {output.name}
          </option>
        ))}
      </select>
    </>
  );
};
