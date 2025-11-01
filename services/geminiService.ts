import { GoogleGenAI } from "@google/genai";
import { LootBox } from '../types';

const getAiClient = () => {
    if (!process.env.API_KEY) {
        // This case should be handled by the AuthScreen, but as a safeguard:
        throw new Error("API key is not available. Please ensure an API key is selected.");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateRoseVideo = async (box: LootBox, onProgress: (message: string) => void): Promise<string> => {
    try {
        onProgress('Initializing video generation...');
        
        const ai = getAiClient();
        
        const roseCount = 99;
        const roseColor = 'red';

        const prompt = `Photorealistic, cinematic 3D animation. An ornate, glowing ${box.color} loot box is centered in the frame. The box trembles with magical energy, then bursts open. A spectacular popup explosion of ${roseCount} vibrant, deep ${roseColor} roses erupts from the box. The roses are hyper-realistic with detailed petals and dew drops. They float and dance in the air with ethereal, swirling particle effects. The lighting is dramatic and magical. 8k, ultra high detail, trending on artstation.`;

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
                const newAiClient = getAiClient();
                operation = await newAiClient.operations.getVideosOperation({ operation: operation });
            } catch(e: any) {
                const errorMessage = e.message || (typeof e === 'object' ? JSON.stringify(e) : String(e));
                if (errorMessage.includes("Requested entity was not found.")) {
                    throw new Error("API key error: The provided key is invalid or not configured for the Veo API. Please go back and select a different key.");
                }
                // Re-throw other polling errors
                throw e;
            }
        }

        if (operation.error) {
            console.error("Video generation failed with operation error:", operation.error);
            throw new Error(`Video generation failed: ${operation.error.message}. This could be due to issues like billing configuration or an invalid prompt.`);
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            throw new Error("Video generation completed, but no download link was returned from the API.");
        }

        onProgress('Downloading video...');
        try {
            const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}.`);
            }
            const videoBlob = await response.blob();
            onProgress('Video ready!');
            return URL.createObjectURL(videoBlob);
        } catch (downloadError: any) {
            console.error("Video download failed:", downloadError);
            throw new Error(`Download failed: Could not retrieve the generated video. Please check your network connection. Details: ${downloadError.message}`);
        }
    } catch (error: any) {
        console.error("An unexpected error occurred in generateRoseVideo:", error);
        
        const errorMessage = error.message || (typeof error === 'object' ? JSON.stringify(error) : String(error));
        if (errorMessage.includes("Requested entity was not found.")) {
             throw new Error("API key error: The provided key is invalid or not configured for the Veo API. Please go back and select a different key.");
        }

        // The message could already be user-friendly from an inner catch, or it's a new one.
        throw new Error(error.message || "An unexpected error occurred during video generation.");
    }
};
