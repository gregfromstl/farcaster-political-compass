import Compass from "@/components/Compass";
import ShareButton from "@/components/ShareButton";
import { Channel, Compass as TCompass } from "@/types";
import { getChannelCompass } from "@/util/compass";
import getChannel from "@/util/get-channel";
import getUserFromFid from "@/util/get-user-from-fid";
import {
    Frame,
    FrameButton,
    FrameConfig,
    FrameImage,
} from "@devcaster/next/frames";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export async function generateMetadata(
    { params }: { params: { channel: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: `${params.channel} is politically...`,
        description: `See /${params.channel}'s cast-based political compass on Farcompass.`,
    };
}

export default async function UserResult({
    params,
    searchParams,
}: {
    params: { channel: string };
    searchParams: Record<string, string>;
}) {
    const frame = new FrameConfig({}, searchParams);
    let channel: Channel | undefined = undefined;
    let compass: TCompass | undefined = undefined;

    if (params.channel) {
        try {
            channel = await getChannel(params.channel);
            compass = await getChannelCompass(params.channel);
        } catch (e: any) {
            redirect("/404");
        }
    }

    return (
        <>
            <Frame frame={frame}>
                <FrameButton
                    onClick={async (f: typeof frame) => {
                        const user = await getUserFromFid(
                            f.action!.untrustedData.fid
                        );
                        return `/user/${user.name}`;
                    }}
                >
                    What's yours?
                </FrameButton>
                <FrameImage
                    src={`${frame.origin}/images/result?pfp=${channel?.imageUrl}&name=${channel?.name}&y=${compass?.y}&x=${compass?.x}&type=channel`}
                />
            </Frame>
            <div className="flex flex-col items-center gap-12 h-full mx-auto">
                <Compass
                    channel={channel}
                    compass={compass || { y: 0, x: 0 }}
                />
                <ShareButton />
            </div>
        </>
    );
}
