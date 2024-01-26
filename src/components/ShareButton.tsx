"use client";

import { Button } from "@/components/catalyst/button";
import { LinkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function ShareButton() {
    return (
        <Button
            onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Copied share link to clipboard");
            }}
            color="white"
        >
            <LinkIcon className="h-5 w-5 mr-2" />
            Share
        </Button>
    );
}
