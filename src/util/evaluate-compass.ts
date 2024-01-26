import MistralClient from "@mistralai/mistralai";
import cosineSimilarity from "./cosine-similarity";
import { Compass } from "@/types";

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

    const maxScore = Math.max(leftScore, rightScore, upScore, downScore);
    const minScore = Math.min(leftScore, rightScore, upScore, downScore);

    const compass = {
        left: (leftScore - minScore) / (maxScore - minScore),
        right: (rightScore - minScore) / (maxScore - minScore),
        up: (upScore - minScore) / (maxScore - minScore),
        down: (downScore - minScore) / (maxScore - minScore),
    };

    return compass;
}
