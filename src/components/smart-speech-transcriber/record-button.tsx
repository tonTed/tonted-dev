import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";

interface RecordButtonProps {
  isRecording: boolean;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  handleStartRecording,
  handleStopRecording,
}) => (
  <>
    {isRecording ? (
      <Button size="lg" variant="secondary" onClick={handleStopRecording}>
        <Square />
        <span className="sr-only">Stop Recording</span>
      </Button>
    ) : (
      <Button size="lg" onClick={handleStartRecording}>
        <Mic />
        <span className="sr-only">Record</span>
      </Button>
    )}
  </>
);

export default RecordButton;
