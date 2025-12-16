import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { OpenAI } from "openai";

type ImageSpec = {
  filename: string;
  prompt: string;
};

const SIZE = "1536x1024";
const QUALITY = "hd";

const images: ImageSpec[] = [
  {
    filename: "hero.png",
    prompt:
      "High-end editorial architectural render of a contemporary residence at dawn, soft natural light, realistic materials, minimal landscaping, cinematic composition, no text or logos."
  },
  {
    filename: "victorian.png",
    prompt:
      "Victorian brick house with precast stone trim, restored facade, calm residential street, soft morning light, elegant and minimal composition, no people, no watermarks."
  },
  {
    filename: "bauhaus.png",
    prompt:
      "Bauhaus-inspired house with one monolithic natural stone pillar, geometric white volumes, expansive glass, gentle sunlight, premium architectural visualization, no text."
  },
  {
    filename: "cyclopean-chalet.png",
    prompt:
      "Large chalet made of cyclopean cobblestone, long eaves, recessed lighting, alpine setting, soft dusk light, clean editorial render, no logos."
  },
  {
    filename: "wave-wall.png",
    prompt:
      "Commercial building facade with undulating prefabricated brick modules, rhythmic shadows, golden hour light, sophisticated architectural render, no signage, no watermarks."
  },
  {
    filename: "french-townhouses.png",
    prompt:
      "Row of French-inspired townhouses with precast panels and Art Nouveau Parisian details, quiet street, warm golden light, high-end architectural render, no text."
  }
];

async function ensureDir(dir: string) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function writeManifest(entries: any[]) {
  const manifestPath = path.resolve(process.cwd(), "scripts/image-manifest.json");
  await fs.promises.writeFile(manifestPath, JSON.stringify(entries, null, 2), "utf8");
}

async function generate() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing. Add it to your environment or .env file.");
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const outputDir = path.resolve(process.cwd(), "public/ai");
  await ensureDir(outputDir);

  const manifestEntries = [];

  for (const image of images) {
    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt: image.prompt,
      size: SIZE,
      quality: QUALITY,
      response_format: "b64_json"
    });

    const base64 = response.data[0]?.b64_json;
    if (!base64) {
      throw new Error(`Image generation failed for ${image.filename}`);
    }

    const buffer = Buffer.from(base64, "base64");
    const filepath = path.join(outputDir, image.filename);
    await fs.promises.writeFile(filepath, buffer);
    console.log(`✔ Saved ${image.filename}`);

    manifestEntries.push({
      filename: `public/ai/${image.filename}`,
      prompt: image.prompt,
      size: SIZE,
      quality: QUALITY,
      timestamp: new Date().toISOString()
    });
  }

  await writeManifest(manifestEntries);
  console.log("Manifest updated at scripts/image-manifest.json");
}

generate().catch((error) => {
  console.error("Image generation failed:");
  console.error(error);
  process.exit(1);
});
