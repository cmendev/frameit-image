import { NextResponse } from "next/server";
import sharp, { FormatEnum } from "sharp";

const allowedFormats = ["jpeg", "png", "webp", "avif", "gif", "tiff"] as const;
type AllowedFormat = (typeof allowedFormats)[number]; // Tipo seguro basado en los formatos permitidos

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("image") as File | null;
        const outputFormat = formData.get("format") as AllowedFormat;
        const width = formData.get("width") ? parseInt(formData.get("width") as string) : undefined;
        const height = formData.get("height") ? parseInt(formData.get("height") as string) : undefined;
        const quality = formData.get("quality") ? parseInt(formData.get("quality") as string) : 80;

        if (!file) {
            return NextResponse.json({ error: "No se envió una imagen" }, { status: 400 });
        }

        if (!allowedFormats.includes(outputFormat)) {
            return NextResponse.json({ error: "Formato no soportado" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Procesar la imagen con sharp
        let image = sharp(buffer);
        if (width !== undefined || height !== undefined) {
            image = image.resize({ width, height });
        }

        const convertedImage = await image
            .toFormat(outputFormat as keyof FormatEnum, { quality }) // Uso correcto del tipo
            .toBuffer();

        return new Response(convertedImage, {
            headers: {
                "Content-Type": `image/${outputFormat}`,
            },
        });
    } catch (error) {
        console.error("Error al procesar la imagen:", error);
        return NextResponse.json({ error: "Error al procesar la imagen" }, { status: 500 });
    }
}
