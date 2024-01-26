"use client";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function ClientSideToast({
    error,
    style,
}: {
    error?: string;
    style?: React.CSSProperties;
}) {
    useEffect(() => {
        if (error) {
            toast.error(error, {
                style,
                id: error,
            });
        }
    }, []);

    return <></>;
}
