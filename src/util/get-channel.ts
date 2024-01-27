import axios from "axios";
import { ChannelSchema } from "@/types";

export default async function getChannel(query: string) {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/channel/${query}`
    );
    const channel = ChannelSchema.safeParse(response.data);
    if (!channel.success) {
        throw new Error("Failed to parse channel");
    }
    return response.data;
}
