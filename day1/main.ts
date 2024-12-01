import { dirname, fromFileUrl, join } from "@std/path";

const filePath = fromFileUrl(import.meta.url);
const dir = dirname(filePath);
const inputPath = join(dir, "input.txt");
const input = await Deno.readTextFile(inputPath);

const pairs = input
  .trim()
  .split("\n")
  .map((line) => line.split(/\s+/).map((num) => Number(num)));

const leftNums = pairs.map((pair) => pair[0]).toSorted();
const rightNums = pairs.map((pair) => pair[1]).toSorted();

const distances = leftNums.map((leftNum, i) => {
  const rightNum = rightNums[i];
  return Math.abs(leftNum - rightNum);
});

const totalDistance = distances.reduce((total, distance) => total + distance);
console.log({ totalDistance });

const rightNumFrequency = new Map<number, number>();
for (const rightNum of rightNums) {
  rightNumFrequency.set(rightNum, (rightNumFrequency.get(rightNum) ?? 0) + 1);
}

const similarityScore = leftNums.reduce((score, leftNum) => {
  return score + leftNum * (rightNumFrequency.get(leftNum) ?? 0);
}, 0);

console.log({ similarityScore });
