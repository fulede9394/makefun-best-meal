// Three dollars, one plastic stool, rain on the awning: the best meal
// I ever had cost less than the taxi there, and the cook's nod was the tip.
import { access, mkdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";

const MEAL =
  "The best meal I ever had was a $3 bowl of noodles on a plastic stool in Hanoi at 1 a.m., rain drumming on the awning, the cook nodding like she'd been waiting for me all night.";

async function outputDir(): Promise<string> {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  try {
    await access(dir, constants.W_OK);
  } catch {
    await mkdir(dir, { recursive: true });
  }
  return dir;
}

async function serve(): Promise<void> {
  if (MEAL.length > 200) throw new Error("meal story is too long");
  const words = MEAL.split(/\s+/);
  if (words.length < 10) throw new Error("story is too thin");
  if (!MEAL.includes("Hanoi")) throw new Error("meal story must name the place");
  if (MEAL.includes("\n")) throw new Error("entry must be a single sentence");
  const dir = await outputDir();
  await writeFile(join(dir, "entry.txt"), MEAL, "utf8");
}

void serve();
