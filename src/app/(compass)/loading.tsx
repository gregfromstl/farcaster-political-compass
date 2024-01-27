import Loader from "@/components/Loader";
import { Metadata, ResolvingMetadata } from "next";

import { RingLoader } from "react-spinners";

export async function generateMetadata(
    { params }: { params: { username: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: `${params.username} is politically...`,
        description:
            "See @${params.username}'s cast-based political compass on Farcompass.",
    };
}

export default async function UserResult({
    params,
}: {
    params: { username: string };
}) {
    return (
        <div className="flex flex-col items-center gap-12 h-full mx-auto">
            <div className="font-extrabold flex-col gap-4 text-black text-lg absolute inset-0 flex items-center justify-center">
                <Loader />
            </div>
        </div>
    );
}
