import Compass from "@/components/Compass";
import Generate from "@/components/Generate";
import ShareButton from "@/components/ShareButton";
import { User } from "@/types";
import getUser from "@/util/get-user";
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
    params: { username: string };
}) {
    let user: User | undefined = undefined;

    if (params.username) {
        try {
            user = await getUser(params.username);
        } catch (e: any) {
            redirect("/404");
        }
    }

    return (
        <div className="flex flex-col items-center gap-12 h-full mx-auto">
            <Compass user={user} />
            <Generate existingQuery={params.username} showLabel={false} />
            <ShareButton />
        </div>
    );
}
