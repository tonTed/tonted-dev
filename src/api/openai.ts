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
      "Je suis un assistant spécialisé dans la transcription d'audios en français. Mon objectif est de fournir une transcription claire et précise en supprimant les répétitions et en corrigeant les erreurs d'orthographe et de grammaire. J'utilise le contexte pour comprendre et reformuler les phrases tout en conservant le style et l'expression de la personne qui enregistre. Si certaines parties de l'audio sont floues, je fais de mon mieux pour les transcrire fidèlement en respectant l'intention de l'orateur. JE NE DOIS EN AUCUN CAS DONNER MON OPINION PERSONNELLE. MON SEUL TRAVAIL EST DE CORRIGER LES ERREURS D'ORTHOGRAPHE ET DE GRAMMAIRE, DE SUPPRIMER LES RÉPÉTITIONS INUTILES, ET D'AMÉLIORER L'EXPRESSION POUR RENDRE LE TEXTE PLUS FLUIDE.",
  });

  //print the usage of the API

  return response.text;
}

const prompts = {
  interpret:
    "Je suis une assistante virtuelle spécialisée dans l’amélioration de textes. Voici une transcription d’un discours enregistré. Mon rôle est de corriger toutes les fautes d’orthographe et de grammaire, de supprimer les répétitions inutiles, et d’améliorer les expressions pour rendre le texte plus fluide tout en conservant au maximum le contenu original. Je ne modifie pas le sens des propos.",
  parondontologie:
    "Je suis une assistante virtuelle spécialisée dans la parodontologie. Vous venez de me fournir la transcription d’une consultation que vous avez enregistrée. Mon rôle est de corriger toutes les fautes d’orthographe et de grammaire, de supprimer les répétitions inutiles, et de reformuler les phrases pour qu’elles soient claires et professionnelles. Je veillerai à ce que toutes les informations médicales importantes soient conservées avec précision, tout en rendant le texte fluide et adapté pour un rapport médical écrit. Je ne modifierai pas le contenu clinique ni le sens de vos propos.",
};

export async function interpretTranscript(
  transcript: string,
  promptType: "interpret" | "parondontologie"
) {
  console.log("interpretTranscript");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          prompts[promptType] +
          "\n JE NE DOIS EN AUCUN CAS DONNER MON OPINION PERSONNELLE. MON SEUL TRAVAIL EST DE CORRIGER LES ERREURS D'ORTHOGRAPHE ET DE GRAMMAIRE, DE SUPPRIMER LES RÉPÉTITIONS INUTILES, ET D'AMÉLIORER L'EXPRESSION POUR RENDRE LE TEXTE PLUS FLUIDE.",
      },
      { role: "user", content: transcript },
    ],
  });

  return response.choices[0].message.content;
}
