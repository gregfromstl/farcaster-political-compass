"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CompassSchema, Compass, User, Channel } from "@/types";
import toast from "react-hot-toast";
import Loader from "./Loader";

const getUserCompass = async (fid: number) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/compass/${fid}`
    );
    const compass = CompassSchema.safeParse(response.data);
    if (!compass.success) {
        throw new Error("Failed to parse compass");
    }
    return compass.data;
};

const getChannelCompass = async (id: string) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/compass/channel/${id}`
    );
    const compass = CompassSchema.safeParse(response.data);
    if (!compass.success) {
        throw new Error("Failed to parse compass");
    }
    return compass.data;
};

export default function Compass({
    user,
    channel,
}: {
    user?: User;
    channel?: Channel;
}) {
    const [loading, setLoading] = useState(false);
    const [compass, setCompass] = useState<Compass | undefined>(undefined);

    useEffect(() => {
        if (user) {
            setCompass(undefined);
            setLoading(true);
            getUserCompass(user.fid)
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

    useEffect(() => {
        if (channel) {
            setCompass(undefined);
            setLoading(true);
            getChannelCompass(channel.id)
                .then((compass) => {
                    console.log(compass);
                    setCompass(compass);
                })
                .catch((e) => {
                    toast.error("Something went wrong");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [channel]);

    return (
        <div className="relative w-64 h-64 md:w-96 md:h-96">
            <Image
                src="/compass.png"
                fill
                className="object-contain object-center"
                alt="Political Compass"
            />
            <div className="font-extrabold flex-col gap-4 text-black text-lg absolute inset-0 flex items-center justify-center">
                <Loader loading={loading} />
            </div>
            {user && compass && (
                <div
                    style={{
                        position: "absolute",
                        left: `${Math.min(
                            Math.max(50 + compass.x * 50, 20),
                            80
                        )}%`,
                        top: `${Math.min(
                            Math.max(50 - compass.y * 50, 20),
                            80
                        )}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {user.pfpUrl ? (
                        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
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
            {channel && compass && (
                <div
                    style={{
                        position: "absolute",
                        left: `${Math.min(
                            Math.max(50 + compass.x * 50, 20),
                            80
                        )}%`,
                        top: `${Math.min(
                            Math.max(50 + compass.y * 50, 20),
                            80
                        )}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {channel.imageUrl ? (
                        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
                            <Image
                                src={channel.imageUrl}
                                alt={channel.name}
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
