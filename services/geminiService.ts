

import { GoogleGenAI } from "@google/genai";
import { LootBox } from '../types';

const getAiClient = () => {
    if (!process.env.API_KEY) {
        throw new Error("API key is not available. Please select an API key.");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateRoseVideo = async (box: LootBox, onProgress: (message: string) => void): Promise<string> => {
    onProgress('Initializing video generation...');
    
    // Create a new instance right before the call to ensure the latest API key is used.
    const ai = getAiClient();
    
    const oddRoseCounts = [3, 5, 7, 9, 11];
    const roseCount = oddRoseCounts[Math.floor(Math.random() * oddRoseCounts.length)];

    const prompt = `A cinematic, magical 3D animation of a single, ornate, glowing ${box.color} loot box. The box shakes and then bursts open, releasing a beautiful explosion of ${roseCount} realistic, matching ${box.color} roses. The roses gracefully float and swirl in the air. Hyper-detailed, 8k, fantasy, ethereal lighting.`;

    onProgress('Sending request to the video model...');
    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9',
        }
    });

    onProgress('Video generation in progress. This may take several minutes...');
    
    let pollCount = 0;
    while (!operation.done) {
        pollCount++;
        onProgress(`Waiting for video... (check ${pollCount})`);
        await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
        try {
            const newAiClient = getAiClient(); // Re-create client in case key changed
            operation = await newAiClient.operations.getVideosOperation({ operation: operation });
        } catch(e: any) {
            if (e.message.includes("Requested entity was not found.")) {
                throw new Error("API key error. Please try selecting your API key again.");
            }
            throw e;
        }
    }

    if (operation.error) {
        throw new Error(`Video generation failed: ${operation.error.message}`);
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
        throw new Error("Video generation completed, but no download link was found.");
    }

    onProgress('Downloading video...');
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
    }

    const videoBlob = await response.blob();
    onProgress('Video ready!');
    return URL.createObjectURL(videoBlob);
};