import MistralClient from "@mistralai/mistralai";
import cosineSimilarity from "./cosine-similarity";
import { Compass } from "@/types";
import sampleData from "./sample-data";

export default async function evaluateCompass(
    casts: string[]
): Promise<Compass> {
    const apiKey = process.env.MISTRAL_API_KEY;

    const client = new MistralClient(apiKey);

    const left = "liberal economic views";
    const right = "conservative economic views";
    const up = "pro-establishment political views";
    const down = "anti-establishment political views";
    const input = [left, right, up, down, ...casts];

    const embeddingsBatchResponse = await client.embeddings({
        model: "mistral-embed",
        input: input,
    });

    const embeddings = embeddingsBatchResponse.data.map((e) => e.embedding);
    const [leftEmbedding, rightEmbedding, upEmbedding, downEmbedding] =
        embeddings.slice(0, 4);
    const castEmbeddings = embeddings.slice(4);

    const cumulativeCoordinates = [0, 0, 0, 0];

    for (const castEmbedding of castEmbeddings) {
        cumulativeCoordinates[0] += cosineSimilarity(
            leftEmbedding,
            castEmbedding
        );
        cumulativeCoordinates[1] += cosineSimilarity(
            rightEmbedding,
            castEmbedding
        );
        cumulativeCoordinates[2] += cosineSimilarity(
            upEmbedding,
            castEmbedding
        );
        cumulativeCoordinates[3] += cosineSimilarity(
            downEmbedding,
            castEmbedding
        );
    }

    const leftScore = cumulativeCoordinates[0] / castEmbeddings.length;
    const rightScore = cumulativeCoordinates[1] / castEmbeddings.length;
    const upScore = cumulativeCoordinates[2] / castEmbeddings.length;
    const downScore = cumulativeCoordinates[3] / castEmbeddings.length;

    const maxCompass = {
        left: Math.min(...sampleData.map((d) => d.right - d.left)),
        right: Math.max(...sampleData.map((d) => d.right - d.left)),
        authoritarian: Math.max(
            ...sampleData.map((d) => d.authoritarian * 1.01 - d.libertarian)
        ), // Add a little bit of a boost to the authoritarian metric because it is crypto after all
        libertarian: Math.min(
            ...sampleData.map((d) => d.authoritarian * 1.01 - d.libertarian)
        ),
    };

    const scaleScore = (score: number, min: number, max: number) => {
        let scaledScore = ((score - min) / (max - min)) * 2 - 1;
        scaledScore = Math.max(-1, scaledScore);
        scaledScore = Math.min(1, scaledScore);
        return scaledScore;
    };

    const compass = {
        x: scaleScore(
            rightScore - leftScore,
            maxCompass.left,
            maxCompass.right
        ),
        y: scaleScore(
            upScore - downScore,
            maxCompass.libertarian,
            maxCompass.authoritarian
        ),
    };

    return compass;
}
