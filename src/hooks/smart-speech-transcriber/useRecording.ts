import { useState } from "react";

const useRecording = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const startRecording = () => setIsRecording(true);
  const stopRecording = () => setIsRecording(false);

  return { isRecording, startRecording, stopRecording };
};

export default useRecording;
