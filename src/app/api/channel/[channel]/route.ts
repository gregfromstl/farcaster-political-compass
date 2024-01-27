import { ChannelSchema, UserSchema } from "@/types";
import axios from "axios";

export async function GET(
    request: Request,
    { params }: { params: { channel: string } }
) {
    const query = params.channel;

    if (!query) {
        return new Response("Missing query", { status: 400 });
    }

    try {
        const result = await axios.get(
            `https://api.neynar.com/v2/farcaster/channel/search?q=${query}`,
            {
                headers: {
                    api_key: process.env.NEYNAR_API_KEY,
                },
            }
        );

        if (result.data.channels.length === 0) {
            return new Response("Not found", { status: 404 });
        }

        const channel = ChannelSchema.safeParse({
            id: result.data.channels[0].id,
            name: result.data.channels[0].name,
            imageUrl: result.data.channels[0].image_url,
        });

        if (!channel.success) {
            return new Response("Invalid channel object", { status: 500 });
        }

        return new Response(JSON.stringify(channel.data), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e: any) {
        return new Response("Internal server error", { status: 500 });
    }
}
