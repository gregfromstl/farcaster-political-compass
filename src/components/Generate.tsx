"use client";
import { FormEvent, useState } from "react";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Button } from "@/components/catalyst/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import getUser from "@/util/get-user";

export default function Generate({
    existingQuery,
    showLabel = true,
}: {
    existingQuery?: string;
    showLabel?: boolean;
}) {
    const router = useRouter();
    const [query, setQuery] = useState(existingQuery ?? "");
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await getUser(query); // prefetch the user
            router.push(`/user/${query}`);
        } catch (e: any) {
            if (e.response?.status === 404) {
                toast.error("They're not on Farcaster ¯\\_(ツ)_/¯");
            } else {
                toast.error("Couldn't get that user ¯\\_(ツ)_/¯");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-[300px]">
            <Field>
                {showLabel && <Label>Farcaster Handle</Label>}
                <div className="flex flex-row gap-2">
                    <Input
                        name="username"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <Button type="submit" color="purple">
                        Generate
                    </Button>
                </div>
            </Field>
        </form>
    );
}
