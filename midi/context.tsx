import React from "react";

type MIDIContextValue = {};

const initial = {};

const MIDIContext = React.createContext<MIDIContextValue>(initial);

export const MIDIProvider: React.FC = () => {
  React.useEffect(() => {
    getMidiAccess();
  }, []);
  return <MIDIContext.Provider value={initial}></MIDIContext.Provider>;
};

const getMidiAccess = async () => {
  const acess = await window.navigator.requestMIDIAccess();
};
