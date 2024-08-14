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
  rapport: `Je suis un médecin spécialisé dans la parodontologie. Vous venez de me fournir la transcription d’une consultation que vous avez enregistrée. Mon rôle est de corriger toutes les fautes d’orthographe et de grammaire, de supprimer les répétitions inutiles, et de reformuler les phrases pour qu’elles soient claires et professionnelles. Je veillerai à ce que toutes les informations médicales importantes soient conservées avec précision, tout en rendant le texte fluide et adapté pour un rapport médical écrit. Je ne modifierai pas le contenu clinique ni le sens de vos propos. Je dois faire un rapport sous le format json suivant :
  {
  patient: string (Insérez le nom complet du patient.);
  motifConsultation: string (Décrivez brièvement la raison de la consultation, par exemple, 'Douleur gingivale' ou 'Suivi parodontal'.);
  observations: string (Fournissez un résumé de l’examen clinique. Mentionnez les signes observés, tels que l’inflammation gingivale, la profondeur des poches parodontales, la présence de plaque dentaire, etc.);
  diagnostic: string (Indiquez le diagnostic établi à partir des observations cliniques, par exemple, 'Gingivite chronique' ou 'Parodontite modérée'.);
  planTraitement: {
    traitementRecommande: string (Décrivez les interventions prévues, comme le détartrage, le surfaçage radiculaire, etc.);
    instructionsHygieneBuccodentaire: string (Mentionnez les recommandations données au patient pour améliorer l’hygiène buccale, comme l’utilisation de brosses à dents spécifiques, le fil dentaire, etc.);
    reevaluation: string (Indiquez le délai prévu pour une réévaluation de l’état parodontal du patient.);
  };
  conclusion: string (Résumez les conseils donnés au patient concernant l’importance du suivi, la prévention des complications, et l’importance de l’hygiène buccodentaire.);
};`,
};

export async function interpretTranscript(
  transcript: string,
  promptType: "interpret" | "parondontologie" | "rapport"
) {
  console.log("interpretTranscript");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: {
      type: promptType === "rapport" ? "json_object" : "text",
    },
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
