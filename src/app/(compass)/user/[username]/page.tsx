import Compass from "@/components/Compass";
import Generate from "@/components/Generate";
import ShareButton from "@/components/ShareButton";
import { User, Compass as TCompass } from "@/types";
import { getUserCompass } from "@/util/compass";
import getUser from "@/util/get-user";
import getUserFromFid from "@/util/get-user-from-fid";
import {
    FrameConfig,
    Frame,
    FrameButton,
    FrameImage,
    FrameInput,
} from "@devcaster/next/frames";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

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
    searchParams,
}: {
    params: { username: string };
    searchParams: Record<string, string>;
}) {
    const frame = new FrameConfig({ isSelf: false }, searchParams);
    let user: User | undefined = undefined;
    let compass: TCompass | undefined = undefined;

    if (params.username) {
        try {
            user = await getUser(params.username);
            compass = await getUserCompass(user!.fid);
        } catch (e: any) {
            redirect("/404");
        }
    }

    return (
        <>
            <Frame frame={frame}>
                <FrameInput placeholder="Search a username" />
                {!frame.state.isSelf && (
                    <FrameButton
                        onClick={async (f: typeof frame) => {
                            const user = await getUserFromFid(
                                f.action!.untrustedData.fid
                            );
                            f.state.isSelf = true;
                            return `/user/${user.name}`;
                        }}
                    >
                        What's yours?
                    </FrameButton>
                )}
                <FrameButton
                    onClick={async (f: typeof frame) => {
                        f.state.isSelf = false;
                        return `/user/${f.action!.untrustedData.inputText}`;
                    }}
                >
                    Search
                </FrameButton>
                <FrameImage
                    src={`${frame.origin}/images/result?pfp=${user?.pfpUrl}&name=${user?.name}&y=${compass?.x}&x=${compass?.y}&type=user`}
                />
            </Frame>
            <div className="flex flex-col items-center gap-12 h-full mx-auto">
                <Compass user={user} compass={compass || { y: 0, x: 0 }} />
                <Generate existingQuery={params.username} showLabel={false} />
                <ShareButton />
            </div>
        </>
    );
}
