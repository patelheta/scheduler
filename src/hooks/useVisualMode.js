import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   * A function for transit new mode 
   * @param  mode 
   * @param  replace 
   */
  function transition(mode, replace = false) {
    const newHistory = [...history];
    if (replace) {
      newHistory.splice(-1, 1, mode);
    } else {
      newHistory.push(mode); //push new mode to history
    }
    setHistory(newHistory);
    setMode(mode);
  }

  /**
  * A function for transit previous mode 
  * @param  mode 
  * @param  replace 
  */
  function back() {
    const newHistory = [...history];
    if (history.length > 1) {
      newHistory.pop();
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  }

  return { mode, transition, back };
};
