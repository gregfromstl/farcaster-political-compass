import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import * as fs from "fs";
import { revalidatePath } from "next/cache";
import satori from "satori";
import sharp from "sharp";
export const dynamic = "force-dynamic";

const fontPath = join(process.cwd(), "NunitoSans.ttf");
let fontData = fs.readFileSync(fontPath);

export async function GET(request: NextRequest) {
    revalidatePath(request.url);

    const pfp = request.nextUrl.searchParams.get("pfp");
    const name = request.nextUrl.searchParams.get("name");
    const x = parseFloat(request.nextUrl.searchParams.get("x") || "0");
    const y = parseFloat(request.nextUrl.searchParams.get("y") || "0");
    const type = request.nextUrl.searchParams.get("type") || "user";

    if (!pfp || !name || !x || !y) {
        return new NextResponse("Missing query parameters", { status: 400 });
    }

    const svg = await satori(
        <div
            style={{
                display: "flex",
                position: "relative",
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                color: "black",
            }}
        >
            <img
                src="https://i.ibb.co/mqNLDd5/background.png"
                style={{ position: "absolute", left: 0, right: 0 }}
            />
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    gap: "8px",
                }}
            >
                <img
                    src="https://i.ibb.co/mqNLDd5/background.png"
                    style={{ position: "absolute", left: 0, right: 0 }}
                />
                <img
                    src="https://i.ibb.co/kq9T23J/farcompass.png"
                    style={{
                        position: "absolute",
                        left: 12,
                        top: 12,
                        width: "102.4px",
                        height: "10.6px",
                    }}
                    alt="Farcompass"
                />
                <div
                    style={{
                        display: "flex",
                        position: "relative",
                        width: "207px",
                        height: "225.3px",
                    }}
                >
                    <img
                        src="https://i.ibb.co/Njyr1zm/compass.png"
                        alt="compass"
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                        }}
                    />
                    <img
                        src={pfp}
                        alt={name}
                        style={{
                            left: `${Math.min(Math.max(50 + x * 50, 20), 80)}%`,
                            top: `${Math.min(Math.max(50 - y * 50, 20), 80)}%`,
                            width: "25px",
                            height: "25px",
                            position: "absolute",
                            borderRadius: "25px",
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                </div>
                {type === "channel" ? "/" : "@"}
                {name}
            </div>
        </div>,
        {
            width: 600,
            height: 400,
            fonts: [
                {
                    name: "NunitoSans",
                    data: fontData,
                    weight: 600,
                    style: "normal",
                },
            ],
        }
    );

    // Convert SVG to PNG using Sharp
    const pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();

    // Set the content type to PNG and send the response
    return new NextResponse(pngBuffer, {
        status: 200,
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "max-age=10",
        },
    });
}
