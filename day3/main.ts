import { dirname, fromFileUrl, join } from "@std/path";

const filePath = fromFileUrl(import.meta.url);
const dir = dirname(filePath);
const inputPath = join(dir, "input.txt");
const input = await Deno.readTextFile(inputPath);

const program = input.trim() ?? "";
const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/gm;

function findProductSum(program: string) {
  const matches = [...program.matchAll(regex)];

  const sum = matches
    .map((match) => {
      const [_, num1, num2] = match;
      return Number(num1) * Number(num2);
    })
    .reduce((a, b) => a + b);
  return sum;
}

const sum = findProductSum(program);
console.log({ sum });

const disabledProgramRegex = /don\'t\(\).*?do\(\)/g;
const matches = [...program.matchAll(disabledProgramRegex)];

const disabledSum = matches
  .map((match) => findProductSum(match[0]))
  .reduce((a, b) => a + b);

const actualSum = sum - disabledSum;

console.log({ actualSum, disabledSum });
