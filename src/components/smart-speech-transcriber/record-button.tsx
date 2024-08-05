import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";

interface RecordButtonProps {
  isRecording: boolean;
  isPlaying: boolean;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  isPlaying,
  handleStartRecording,
  handleStopRecording,
}) => (
  <div className="flex items-center justify-center">
    {isRecording ? (
      <Button
        size="lg"
        variant="secondary"
        onClick={handleStopRecording}
        disabled={isPlaying}
      >
        <Square />
        <span className="sr-only">Stop Recording</span>
      </Button>
    ) : (
      <Button size="lg" onClick={handleStartRecording} disabled={isPlaying}>
        <Mic />
        <span className="sr-only">Record</span>
      </Button>
    )}
  </div>
);

export default RecordButton;
