"use server";

import OpenAI from "openai";
import { Uploadable } from "openai/uploads.mjs";

const openai = new OpenAI({
  apiKey: process.env.PROJECT_OPENAI_API_KEY,
});

export async function getTranscript(formData: FormData) {
  console.log("getTranscript");

  const audio = formData.get("audio");
  if (!audio || !(audio instanceof File)) {
    return;
  }

  const bitrate = (128 * 1024) / 8;
  const audioTime = audio.size / bitrate;

  console.log("audioTime: ", audioTime.toFixed(2));

  const response = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file: audio as Uploadable,
    language: "fr",
    prompt:
      "Je suis un assistant spécialisé dans la transcription d'audios en français. Mon objectif est de fournir une transcription claire et précise en supprimant les répétitions et en corrigeant les erreurs d'orthographe et de grammaire. J'utilise le contexte pour comprendre et reformuler les phrases tout en conservant le style et l'expression de la personne qui enregistre. Si certaines parties de l'audio sont floues, je fais de mon mieux pour les transcrire fidèlement en respectant l'intention de l'orateur.",
  });

  //print the usage of the API

  return response.text;
}
