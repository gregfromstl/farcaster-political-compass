import axios from "axios";
import evaluateCompass from "@/util/evaluate-compass";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    if (!id) {
        return new Response("Missing channel", { status: 400 });
    }

    try {
        const casts = [];
        let cursor = "";
        let i = 0;
        do {
            const result = await axios.get(
                `https://api.neynar.com/v2/farcaster/feed/channels?with_recasts=true&with_replies=true&limit=100&channel_ids=${id}&cursor=${cursor}`,
                {
                    headers: {
                        api_key: process.env.NEYNAR_API_KEY,
                    },
                }
            );

            casts.push(
                ...result.data.casts
                    .map((cast: { text: string }) => cast.text)
                    .filter((cast: string) => cast.length > 100)
            );

            cursor = result.data?.next?.cursor;
            i++;
        } while (cursor && i < 3);
        const compass = await evaluateCompass(casts);
        return new Response(JSON.stringify(compass), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e: any) {
        return new Response("Internal server error", { status: 500 });
    }
}
