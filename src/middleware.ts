import { NextRequest } from "next/server";
import { framesMiddleware } from "@devcaster/next/frames";

export default function middleware(request: NextRequest) {
    return framesMiddleware(request);
}
