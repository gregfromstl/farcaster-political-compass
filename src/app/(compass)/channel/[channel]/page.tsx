import Compass from "@/components/Compass";
import Generate from "@/components/Generate";
import ShareButton from "@/components/ShareButton";
import { Channel } from "@/types";
import getChannel from "@/util/get-channel";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(
    { params }: { params: { username: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: `${params.username} is politically...`,
        description: `See @${params.username}'s cast-based political compass on Farcompass.`,
    };
}

export default async function UserResult({
    params,
}: {
    params: { channel: string };
}) {
    let channel: Channel | undefined = undefined;

    if (params.channel) {
        try {
            channel = await getChannel(params.channel);
        } catch (e: any) {
            redirect("/404");
        }
    }

    return (
        <div className="flex flex-col items-center gap-12 h-full mx-auto">
            <Compass channel={channel} />
            <ShareButton />
        </div>
    );
}
