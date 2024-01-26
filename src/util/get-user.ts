import { UserSchema } from "@/types";
import axios from "axios";

export default async function getUser(query: string) {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${query}`
    );
    const user = UserSchema.safeParse(response.data);
    if (!user.success) {
        throw new Error("Failed to parse user");
    }
    return response.data;
}
