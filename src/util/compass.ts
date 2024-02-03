import { CompassSchema } from "@/types";
import axios from "axios";

export const getUserCompass = async (fid: number) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/compass/${fid}`
    );
    const compass = CompassSchema.safeParse(response.data);
    if (!compass.success) {
        throw new Error("Failed to parse compass");
    }
    return compass.data;
};

export const getChannelCompass = async (id: string) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/compass/channel/${id}`
    );
    const compass = CompassSchema.safeParse(response.data);
    if (!compass.success) {
        throw new Error("Failed to parse compass");
    }
    return compass.data;
};
