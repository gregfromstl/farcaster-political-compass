import Generate from "@/components/Generate";

export default async function Home() {
    return (
        <div className="flex flex-col items-center max-w-2xl justify-center gap-16 mx-auto h-full w-full">
            <h2 className="text-5xl font-bold text-center">
                Generate a political compass from your casts.
            </h2>
            <Generate />
        </div>
    );
}
