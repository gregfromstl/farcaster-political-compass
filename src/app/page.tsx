import ClientSideToast from "@/components/ClientSideToast";
import Compass from "@/components/Compass";
import Search from "@/components/Search";
import { User } from "@/types";
import getUser from "@/util/get-user";

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center gap-16 p-24"></main>
    );
}
