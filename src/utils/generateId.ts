import generateRandomNumber from "./generateRandomNumber";

function generateId(length: number): string {
    const min = 0;
    const max = Number("9".repeat(length));
    const num = generateRandomNumber(min, max);
    const code = String(num).padStart(length, "0");
    return code;
}

export default generateId;
export { generateId };
