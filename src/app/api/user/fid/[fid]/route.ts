import { UserSchema } from "@/types";
import axios from "axios";

export async function GET(
    request: Request,
    { params }: { params: { fid: string } }
) {
    const fid = params.fid;

    try {
        const result = await axios.get(
            `https://api.neynar.com/v1/farcaster/user?fid=${fid}`,
            {
                headers: {
                    api_key: process.env.NEYNAR_API_KEY,
                },
            }
        );

        const user = UserSchema.safeParse({
            fid: result.data.result.user.fid,
            name: result.data.result.user.username,
            pfpUrl: result.data.result.user.pfp.url,
        });

        if (!user.success) {
            return new Response("Invalid user object", { status: 500 });
        }

        return new Response(JSON.stringify(user.data), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e: any) {
        if (e.response.data.code === "NotFound") {
            return new Response("Not found", { status: 404 });
        }
        return new Response("Internal server error", { status: 500 });
    }
}
