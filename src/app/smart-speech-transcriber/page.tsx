"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TitlePage from "@/components/ui/title-page";
import { Mic, Play, Square } from "lucide-react";
import { useState } from "react";

function SmartSpeechTranscriber() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handlePlayAudio = () => {
    setIsPlaying(true);
  };

  const handleStopPlaying = () => {
    setIsPlaying(false);
  };

  const handleSubmit = () => {
    console.log("Submitting for transcription");
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
              <Button
                size="lg"
                onClick={handleStartRecording}
                disabled={isPlaying}
              >
                <Mic />
                <span className="sr-only">Record</span>
              </Button>
            )}
          </div>
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
