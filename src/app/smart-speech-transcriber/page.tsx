"use client";

import PlayButton from "@/components/smart-speech-transcriber/play-button";
import RecordButton from "@/components/smart-speech-transcriber/record-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TitlePage from "@/components/ui/title-page";
import useRecording from "@/hooks/smart-speech-transcriber/useRecording";
import usePlayback from "@/hooks/smart-speech-transcriber/usePlayback";

function SmartSpeechTranscriber() {
  const { isRecording, startRecording, stopRecording } = useRecording();
  const { isPlaying, startPlaying, stopPlaying } = usePlayback();

  const handleStartRecording = () => {
    console.debug("Starting recording");
    startRecording();
  };

  const handleStopRecording = () => {
    console.debug("Stopping recording");
    stopRecording();
  };

  const handlePlayAudio = () => {
    console.debug("Playing audio");
    startPlaying();
  };

  const handleStopPlaying = () => {
    console.debug("Stopping playing");
    stopPlaying();
  };

  const handleSubmit = () => {
    console.debug("Submitting for transcription");
  };

  return (
    <>
      <TitlePage
        title="Smart Speech Transcriber"
        subtitle="Transcribe your speech to text using AI"
      />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Record Audio</CardTitle>
          <CardDescription>
            Record your voice and submit it for transcription.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RecordButton
            isRecording={isRecording}
            isPlaying={isPlaying}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
          />
          <PlayButton
            isPlaying={isPlaying}
            isRecording={isRecording}
            handlePlayAudio={handlePlayAudio}
            handleStopPlaying={handleStopPlaying}
          />
          <div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Submit for Transcription
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default SmartSpeechTranscriber;
