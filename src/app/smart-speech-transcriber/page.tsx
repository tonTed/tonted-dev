"use client";

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
import { useEffect, useState } from "react";
import { getTranscript } from "@/api/openai";

function SmartSpeechTranscriber() {
  const { isRecording, startRecording, stopRecording } = useRecording();

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

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
        setAudioBlob(event.data);
        setAudioUrl(URL.createObjectURL(event.data));
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

  const handleSubmit = async () => {
    console.debug("Submitting for transcription");

    if (!audioBlob) {
      return;
    }
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");
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
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Record Audio</CardTitle>
          <CardDescription>
            Record your voice and submit it for transcription.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 justify-center">
          <RecordButton
            isRecording={isRecording}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
          />
          {audioUrl && !isRecording && (
            <audio className="" src={audioUrl} controls />
          )}
          <div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit}
              disabled={isRecording}
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
