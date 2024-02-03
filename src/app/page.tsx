import Generate from "@/components/Generate";
import getUserFromFid from "@/util/get-user-from-fid";
import {
    Frame,
    FrameButton,
    FrameConfig,
    FrameImage,
    FrameInput,
} from "@devcaster/next/frames";

export default async function Home({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) {
    const frame = new FrameConfig({}, searchParams);

    return (
        <>
            <Frame frame={frame}>
                <FrameInput placeholder="Search a username" />
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

                <FrameButton
                    onClick={async (f: typeof frame) => {
                        return `/user/${f.action!.untrustedData.inputText}`;
                    }}
                >
                    Search
                </FrameButton>
                <FrameImage src={`${frame.origin}/images/home`} />
            </Frame>
            <div className="flex flex-col items-center max-w-2xl justify-center gap-16 mx-auto h-full w-full">
                <h2 className="text-5xl font-bold text-center">
                    Generate a political compass from your casts.
                </h2>
                <Generate />
            </div>
        </>
    );
}
