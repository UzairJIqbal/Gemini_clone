// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.API_KEY,
  });
  const config = {
    responseMimeType: "text/plain",
  };
  const model = "gemini-2.5-pro";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let resultText = "";
  for await (const chunk of response) {
    console.log(chunk.text);
    resultText += chunk.text;
  }
  return resultText;
}

export default main;
