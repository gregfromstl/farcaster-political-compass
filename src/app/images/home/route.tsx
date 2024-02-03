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
                    gap: "32px",
                }}
            >
                <img
                    src="https://i.ibb.co/kq9T23J/farcompass.png"
                    style={{
                        width: "512px",
                        height: "53px",
                    }}
                    alt="Farcompass"
                />
                What&apos;s your political compass?
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
