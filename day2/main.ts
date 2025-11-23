import { dirname, fromFileUrl, join } from "@std/path";

const filePath = fromFileUrl(import.meta.url);
const dir = dirname(filePath);
const inputPath = join(dir, "input.txt");
const input = await Deno.readTextFile(inputPath);

const lines = input.trim().split("\n");
const reports = lines.map((line) => line.split(" ").map((num) => Number(num)));

function isSafe(report: number[]) {
  let increasing = true;
  let decreasing = true;

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];

    if (diff > 3 || diff < -3 || diff === 0) {
      return false;
    }
    if (diff < 0) increasing = false;
    if (diff > 0) decreasing = false;
  }

  return increasing || decreasing;
}

function isSafeWithDampener(report: number[]) {
  if (isSafe(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
    if (isSafe(modifiedReport)) {
      return true;
    }
  }
}

const safeReports = reports.filter(isSafe);
const safeReportsWithTolerance = reports.filter(isSafeWithDampener);
console.log({
  numSafeReports: safeReports.length,
  numSafeReportsWithTolerance: safeReportsWithTolerance.length,
});
