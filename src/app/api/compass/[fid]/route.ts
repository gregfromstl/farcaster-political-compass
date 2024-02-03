import axios from "axios";
import evaluateCompass from "@/util/evaluate-compass";
export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: { fid: string } }
) {
    const fid = parseInt(params.fid);

    if (!fid) {
        return new Response("Missing fid", { status: 400 });
    }

    try {
        const casts = [];
        let cursor = "";
        let i = 0;
        do {
            const result = await axios.get(
                `https://api.neynar.com/v1/farcaster/casts?fid=${fid}&cursor=${cursor}&limit=100`,
                {
                    headers: {
                        api_key: process.env.NEYNAR_API_KEY,
                    },
                }
            );
            casts.push(
                ...result.data.result.casts
                    .map((cast: { text: string }) => cast.text)
                    .filter((cast: string) => cast.length > 100)
            );

            cursor = result.data.result?.next?.cursor;
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
