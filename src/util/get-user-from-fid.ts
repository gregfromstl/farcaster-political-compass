import { User, UserSchema } from "@/types";
import axios from "axios";

export default async function getUserFromFid(fid: number): Promise<User> {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/fid/${fid}`
    );
    const user = UserSchema.safeParse(response.data);
    if (!user.success) {
        throw new Error("Failed to parse user");
    }
    return response.data;
}
