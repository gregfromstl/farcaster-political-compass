"use client";
import { FormEvent, useState } from "react";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Button } from "@/components/catalyst/button";
import { useRouter } from "next/navigation";

export default function Search({ existingQuery }: { existingQuery?: string }) {
    const router = useRouter();
    const [query, setQuery] = useState(existingQuery ?? "");
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        router.push("?query=" + query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Field>
                <Label>Farcaster Handle</Label>
                <div className="flex flex-row gap-2">
                    <Input
                        name="username"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <Button type="submit" color="purple">
                        Search
                    </Button>
                </div>
            </Field>
        </form>
    );
}
