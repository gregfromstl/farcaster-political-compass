"use client";
import { FormEvent, useState } from "react";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Button } from "@/components/catalyst/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import getUser from "@/util/get-user";
import Spinner from "./Spinner";
import getChannel from "@/util/get-channel";

export default function Generate({
    existingQuery,
    showLabel = true,
}: {
    existingQuery?: string;
    showLabel?: boolean;
}) {
    const router = useRouter();
    const [query, setQuery] = useState(existingQuery ?? "");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);

            if (query.slice(0, 1) === "/") {
                await getChannel(query.replace("/", "").toLowerCase());
                router.push(`/channel/${query.replace("/", "").toLowerCase()}`);
            } else {
                await getUser(query.toLowerCase());
                router.push(`/user/${query.toLowerCase()}`);
            }
        } catch (e: any) {
            if (e.response?.status === 404) {
                toast.error("They're not on Farcaster ¯\\_(ツ)_/¯");
            } else {
                toast.error("Couldn't get that user ¯\\_(ツ)_/¯");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-[350px]">
            <Field>
                {showLabel && <Label>Farcaster Handle</Label>}
                <div className="flex flex-row gap-2">
                    <Input
                        name="query"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <Button type="submit" color="purple" disabled={loading}>
                        {loading && <Spinner />}
                        Generate
                    </Button>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                    Add a / before the name to generate for a channel
                </div>
            </Field>
        </form>
    );
}
