"use client";
import { FormEvent, useState } from "react";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Button } from "@/components/catalyst/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import getUser from "@/util/get-user";
import Spinner from "./Spinner";

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
            await getUser(query); // prefetch the user
            router.push(`/user/${query}`);
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
                        name="username"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <Button type="submit" color="purple" disabled={loading}>
                        {loading && <Spinner />}
                        Generate
                    </Button>
                </div>
            </Field>
        </form>
    );
}
