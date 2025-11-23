import { dirname, fromFileUrl, join } from "@std/path";

const filePath = fromFileUrl(import.meta.url);
const dir = dirname(filePath);
const inputPath = join(dir, "input.txt");
const input = await Deno.readTextFile(inputPath);

const lines = input.trim().split("\n");

let numXmasOccurences = 0;
let numCrossMassOccurrences = 0;
for (const [i, line] of lines.entries()) {
  for (const [j, _] of line.split("").entries()) {
    const horizontal = line.slice(j, j + 4);
    const vertical =
      i + 3 < lines.length
        ? [lines[i][j], lines[i + 1][j], lines[i + 2][j], lines[i + 3][j]]
            .map((char) => char ?? "")
            .join("")
        : "";

    const leftDiagonal =
      i + 3 < lines.length && j - 3 > 0
        ? [
            lines[i][j],
            lines[i + 1][j - 1],
            lines[i + 2][j - 2],
            lines[i + 3][j - 3],
          ]
            .map((char) => char ?? "")
            .join("")
        : "";

    const rightDiagonal =
      i + 3 < lines.length && j + 3 < line.length
        ? [
            lines[i][j],
            lines[i + 1][j + 1],
            lines[i + 2][j + 2],
            lines[i + 3][j + 3],
          ]
            .map((char) => char ?? "")
            .join("")
        : "";

    const words = [horizontal, vertical, rightDiagonal, leftDiagonal];
    const occurences = words
      .map((word) => {
        const isXmas = word === "XMAS" ? 1 : 0;
        const isReverseXmas = word === "SAMX" ? 1 : 0;
        return isXmas + isReverseXmas;
      })
      .reduce((a, b) => a + b);

    numXmasOccurences += occurences;

    const leftCornerDiagonal =
      i + 2 < lines.length && j + 2 < line.length
        ? [lines[i][j], lines[i + 1][j + 1], lines[i + 2][j + 2]]
            .map((char) => char ?? "")
            .join("")
        : "";

    const rightCornerDiagonal =
      i + 2 < lines.length && j + 2 > 0
        ? [lines[i][j + 2], lines[i + 1][j + 1], lines[i + 2][j]]
            .map((char) => char ?? "")
            .join("")
        : "";

    const isCrossOccurrence =
      (leftCornerDiagonal == "MAS" || leftCornerDiagonal == "SAM") &&
      (rightCornerDiagonal == "MAS" || rightCornerDiagonal == "SAM")
        ? 1
        : 0;

    console.log({ leftCornerDiagonal, rightCornerDiagonal, isCrossOccurrence });

    numCrossMassOccurrences += isCrossOccurrence;
  }
  console.log("\n");
}

console.log({ numXmasOccurences, numCrossMassOccurrences });
