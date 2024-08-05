import { useState } from "react";

const usePlayback = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const startPlaying = () => setIsPlaying(true);
  const stopPlaying = () => setIsPlaying(false);

  return { isPlaying, startPlaying, stopPlaying };
};

export default usePlayback;
