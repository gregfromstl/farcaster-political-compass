"use client";
import { RingLoader } from "react-spinners";

export default function Loader({ loading = true }: { loading?: boolean }) {
    return <RingLoader color="#a79bf1" loading={loading} size={120} />;
}
