import ClientSideToast from "@/components/ClientSideToast";
import Compass from "@/components/Compass";
import Search from "@/components/Search";
import { User } from "@/types";
import getUser from "@/util/get-user";
import { Metadata, ResolvingMetadata } from "next";

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
    searchParams,
}: {
    searchParams: { query: string };
}) {
    let user: User | undefined = undefined;
    let error;

    if (searchParams.query) {
        try {
            user = await getUser(searchParams.query);
            if (!user) throw new Error("User not found");
        } catch (e: any) {
            if (e.response?.status === 404) {
                error = "They're not on Farcaster ¯\\_(ツ)_/¯";
            } else {
                error = "Couldn't get that user ¯\\_(ツ)_/¯";
            }
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-16 p-24">
            <ClientSideToast error={error} />
            <Search existingQuery={searchParams.query} />
            <Compass user={user} />
        </main>
    );
}
