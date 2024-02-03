"use client";
import React from "react";
import Image from "next/image";
import { Compass, User, Channel } from "@/types";

export default function Compass({
    user,
    channel,
    compass,
}: {
    user?: User;
    channel?: Channel;
    compass: Compass;
}) {
    return (
        <div className="relative w-64 h-64 md:w-96 md:h-96">
            <Image
                src="/compass.png"
                fill
                className="object-contain object-center"
                alt="Political Compass"
            />
            {user && (
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
            {channel && (
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
