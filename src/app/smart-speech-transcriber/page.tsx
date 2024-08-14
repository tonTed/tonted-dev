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
import { getTranscript, interpretTranscript } from "@/api/openai";

function SmartSpeechTranscriber() {
  const { isRecording, startRecording, stopRecording } = useRecording();

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const [transcript, setTranscript] = useState<string | null>(null);
  const [isTranscripting, setIsTranscripting] = useState(false);

  const [interpretedTranscript, setInterpretedTranscript] = useState<
    string | null
  >(null);
  const [isInterpreting, setIsInterpreting] = useState(false);

  const [
    parondontologieInterpretedTranscript,
    setParondontologieInterpretedTranscript,
  ] = useState<string | null>(null);
  const [isParondontologieInterpreting, setIsParondontologieInterpreting] =
    useState(false);

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
    setTranscript(null);
    setInterpretedTranscript(null);
    setParondontologieInterpretedTranscript(null);
    console.debug("Submitting for transcription");

    if (!audioBlob) {
      return;
    }
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");
    setIsTranscripting(true);
    const transcript = await getTranscript(formData);
    if (transcript) {
      setTranscript(transcript);
      setIsInterpreting(true);
      setIsParondontologieInterpreting(true);
      const [interpretedTranscript, parondontologieInterpretedTranscript] =
        await Promise.all([
          interpretTranscript(transcript, "interpret"),
          interpretTranscript(transcript, "parondontologie"),
        ]);
      setInterpretedTranscript(interpretedTranscript);
      setParondontologieInterpretedTranscript(
        parondontologieInterpretedTranscript
      );
    } else {
      console.error("Failed to get transcript");
    }
    setIsTranscripting(false);
    setIsInterpreting(false);
    setIsParondontologieInterpreting(false);
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
      {(isTranscripting || transcript) && (
        <Card className="w-full max-w-2xl mt-4">
          <CardHeader>
            <CardTitle>Raw Transcript</CardTitle>
            <CardDescription>
              The raw transcript of the audio you recorded.
            </CardDescription>
          </CardHeader>
          <CardContent>{transcript || "Transcripting..."}</CardContent>
        </Card>
      )}
      {(isInterpreting || interpretedTranscript) && (
        <Card className="w-full max-w-2xl mt-4">
          <CardHeader>
            <CardTitle>Interpreted Transcript</CardTitle>
            <CardDescription>
              The interpreted transcript of the audio you recorded.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {interpretedTranscript || "Interpreting..."}
          </CardContent>
        </Card>
      )}
      {(isParondontologieInterpreting ||
        parondontologieInterpretedTranscript) && (
        <Card className="w-full max-w-2xl mt-4">
          <CardHeader>
            <CardTitle>Parondontologie Interpreted Transcript</CardTitle>
            <CardDescription>
              The interpreted transcript of the audio you recorded.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {parondontologieInterpretedTranscript || "Interpreting..."}
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default SmartSpeechTranscriber;
