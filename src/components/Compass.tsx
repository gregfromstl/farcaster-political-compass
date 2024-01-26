"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CompassSchema, Compass, User } from "@/types";
import { RingLoader } from "react-spinners";
import toast from "react-hot-toast";

const getCompass = async (fid: number) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/compass/${fid}`
    );
    const compass = CompassSchema.safeParse(response.data);
    if (!compass.success) {
        throw new Error("Failed to parse compass");
    }
    return compass.data;
};

export default function Compass({ user }: { user?: User }) {
    const [loading, setLoading] = useState(false);
    const [compass, setCompass] = useState<Compass | undefined>(undefined);

    useEffect(() => {
        if (user) {
            setCompass(undefined);
            setLoading(true);
            getCompass(user.fid)
                .then((compass) => {
                    setCompass(compass);
                })
                .catch((e) => {
                    toast.error("Something went wrong");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user]);

    return (
        <div className="relative w-96 h-96">
            <Image
                src="/compass.png"
                fill
                className="object-contain object-center"
                alt="Political Compass"
            />
            <div className="font-extrabold flex-col gap-4 text-black text-lg absolute inset-0 flex items-center justify-center">
                <RingLoader color="#a79bf1" loading={loading} size={120} />
            </div>
            {user && compass && (
                <div
                    style={{
                        position: "absolute",
                        left: `${Math.min(
                            Math.max(50 + compass.x * 50, 20),
                            80
                        )}%`,
                        top: `${50 - compass.y * 50}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {user.pfpUrl ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                                src={user.pfpUrl}
                                alt={user.name}
                                fill
                                className="object-cover object-center"
                            />
                        </div>
                    ) : (
                        <div className="w-10 h-10 bg-blue-500 rounded-full" />
                    )}
                </div>
            )}
        </div>
    );
}
