import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";

interface PlayButtonProps {
  isPlaying: boolean;
  isRecording: boolean;
  handlePlayAudio: () => void;
  handleStopPlaying: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  isPlaying,
  isRecording,
  handlePlayAudio,
  handleStopPlaying,
}) => (
  <div className="flex items-center justify-center">
    {isPlaying ? (
      <Button
        variant="ghost"
        size="lg"
        onClick={handleStopPlaying}
        disabled={isRecording}
      >
        <Square />
        <span className="sr-only">Stop</span>
      </Button>
    ) : (
      <Button
        variant="ghost"
        size="lg"
        onClick={handlePlayAudio}
        disabled={isRecording}
      >
        <Play />
        <span className="sr-only">Play</span>
      </Button>
    )}
  </div>
);

export default PlayButton;
