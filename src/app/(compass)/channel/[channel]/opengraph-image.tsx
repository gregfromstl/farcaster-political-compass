import { Channel, User } from "@/types";
import { ImageResponse } from "next/og";
import { ReactNode } from "react";

// Route segment config
export const runtime = "edge";
export const dynamic = "force-dynamic";

// Image metadata
export const alt = "Farcompass";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

const BackgroundCanvas = ({ children }: { children?: ReactNode }) => {
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "100%",
                background: "linear-gradient(to right, #8458C4, #AE8CDF)",
                padding: "32px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    background: "white",
                }}
            >
                {children}
            </div>
        </div>
    );
};

const ChannelTag = ({ channel }: { channel: Channel }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 16,
                width: "100%",
            }}
        >
            {channel.imageUrl && (
                <img
                    src={channel.imageUrl}
                    alt={channel.name}
                    width={96}
                    height={96}
                    style={{ borderRadius: "100%" }}
                />
            )}
            /{channel.name}
        </div>
    );
};

const Logo = () => {
    return (
        <img
            src="https://i.ibb.co/gWkTZFW/FARCOMPASS.png"
            width={1024}
            height={105.3}
            alt="Farcompass"
            style={{}}
        />
    );
};

// Image generation
export default async function Image({
    params,
}: {
    params: { channel: string };
}) {
    let channel: Channel | undefined = undefined;

    if (params.channel) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/channel/${params.channel}`
            );
            if (!response.ok) throw new Error("User not found");
            channel = await response.json();
        } catch (e: any) {
            console.log(e);
        }
    }

    if (!channel) {
        return new ImageResponse(
            (
                <BackgroundCanvas>
                    <div
                        style={{
                            fontSize: 64,
                            background: "white",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Logo />
                    </div>
                </BackgroundCanvas>
            )
        );
    }

    return new ImageResponse(
        (
            <BackgroundCanvas>
                <div
                    style={{
                        fontSize: 96,
                        background: "white",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 24,
                        width: 1024,
                        margin: "auto",
                    }}
                >
                    <Logo />
                    <ChannelTag channel={channel} />
                </div>
            </BackgroundCanvas>
        )
    );
}
