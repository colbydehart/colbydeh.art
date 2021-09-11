import React from "react";

type MIDIContextValue = {
  access?: WebMidi.MIDIAccess;
  output?: WebMidi.MIDIOutput;
  setOutput?: (output: WebMidi.MIDIOutput) => void;
};
export const MIDIContext = React.createContext<MIDIContextValue>({});

export const MIDIProvider: React.FC = (props) => {
  const [access, setAccess] = React.useState<WebMidi.MIDIAccess | undefined>();
  const [output, setOutput] = React.useState<WebMidi.MIDIOutput | undefined>();
  React.useEffect(() => {
    getMidiAccess(setAccess);
  }, []);
  return (
    <MIDIContext.Provider value={{ access, output, setOutput }}>
      {props.children}
    </MIDIContext.Provider>
  );
};

export const useOutputs = () => {
  const outputs = React.useContext(MIDIContext).access?.outputs.values();
  return outputs ? Array.from(outputs) : [];
};

export const useSetOutput = () => React.useContext(MIDIContext).setOutput;

export const useOutput = (): WebMidi.MIDIOutput | undefined =>
  React.useContext(MIDIContext).output;

// Utility

const getMidiAccess = async (
  setAccess: (access: WebMidi.MIDIAccess) => void
) => {
  const access = await window.navigator.requestMIDIAccess();
  setAccess(access);
};
