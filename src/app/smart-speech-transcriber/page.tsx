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
import { useEffect, useState } from "react";
import { getTranscript } from "@/api/openai";

function SmartSpeechTranscriber() {
  const { isRecording, startRecording, stopRecording } = useRecording();
  const { isPlaying, startPlaying, stopPlaying } = usePlayback();

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const [transcript, setTranscript] = useState<string | null>(null);

  useEffect(() => {
    const initializeRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setMediaRecorder(new MediaRecorder(stream));
    };

    initializeRecording();
  }, []);

  const handleStartRecording = () => {
    console.debug("Starting recording");
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = (event) => {
        setAudio(new Audio(URL.createObjectURL(event.data)));
        setAudioBlob(event.data);
      };
      mediaRecorder.start();
    }
    startRecording();
  };

  const handleStopRecording = () => {
    console.debug("Stopping recording");
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    stopRecording();
  };

  const handlePlayAudio = () => {
    console.debug("Playing audio");
    if (audio) {
      audio.play();
      audio.onended = () => {
        stopPlaying();
      };
    }
    startPlaying();
  };

  const handleStopPlaying = () => {
    console.debug("Stopping playing");
    if (audio) {
      audio.pause();
    }
    stopPlaying();
  };

  const handleSubmit = async () => {
    console.debug("Submitting for transcription");

    if (!audioBlob) {
      return;
    }
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");
    const transcript = await getTranscript(formData);
    if (transcript) {
      setTranscript(transcript);
    } else {
      console.error("Failed to get transcript");
    }
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
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit}
              disabled={isRecording || isPlaying}
            >
              Submit for Transcription
            </Button>
          </div>
        </CardContent>
      </Card>
      {transcript && (
        <Card className="w-full max-w-md mt-4">
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
            <CardDescription>
              The transcript of the audio you recorded.
            </CardDescription>
          </CardHeader>
          <CardContent>{transcript}</CardContent>
        </Card>
      )}
    </>
  );
}

export default SmartSpeechTranscriber;
