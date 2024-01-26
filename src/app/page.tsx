import ClientSideToast from "@/components/ClientSideToast";
import Compass from "@/components/Compass";
import Search from "@/components/Search";
import { UserSchema, User } from "@/types";
import axios from "axios";

const getUser = async (query: string) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${query}`
    );
    const user = UserSchema.safeParse(response.data);
    if (!user.success) {
        throw new Error("Failed to parse user");
    }
    return response.data;
};

export default async function Home({
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
