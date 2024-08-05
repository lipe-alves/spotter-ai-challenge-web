import * as XLSX from "xlsx";
import removeNewlines from "./removeNewlines";

interface CsvConversionOptions {
    delimiter?: string;
    keyReplacer?: (key: string) => string;
    valueReplacer?: (key: string, value: any) => any;
}

const csv = {
    parseCsv<T = {}>(csvText: string, options: CsvConversionOptions = {}): T[] {
        const {
            keyReplacer = (key) => key,
            valueReplacer = (key, value) => value,
            delimiter = ",",
        } = options;

        const lines = csvText.split("\n");
        const [header] = lines;
        const keys = removeNewlines(header).split(delimiter).map(keyReplacer);
        const body = lines.slice(1);

        const records = body.map((line) => {
            line = removeNewlines(line);
            line = line.replace(/"[^"]*"/g, (match) =>
                match.replace(/,/g, "$delimiter$")
            );

            const values = line.split(delimiter);

            const record = values.reduce((acc, curr, i) => {
                curr = curr.replace(/\$delimiter\$/g, delimiter);
                curr = curr.replace(/"/g, "");
                const key = keys[i];
                const value = valueReplacer(key, curr);
                return { ...acc, [key]: value };
            }, {});

            return record;
        });

        return records as T[];
    },

    convertToCsv(json: any[], options: CsvConversionOptions = {}): string {
        const {
            delimiter = ",",
            keyReplacer = (key) => key,
            valueReplacer = (key, value) => value,
        } = options;

        let csv = "";

        const keys = json.reduce((keys, item) => {
            keys = new Set([...keys, ...Object.keys(item)]);
            keys = Array.from(keys);
            return keys;
        }, []) as string[];
        const data = Object.values(json);

        const header = keys.map((key) => keyReplacer(key)).join(delimiter);

        const lines = data.reduce((lines, data) => {
            const values: any[] = [];

            for (const key of keys) {
                const value = valueReplacer(key, data[key]) ?? "";
                values.push(value);
            }

            const line = values.join(delimiter);

            lines += line;
            lines += "\n";

            return lines;
        }, "");

        csv = `${header}\n${lines}`.trim();

        return csv;
    },

    convertToXlsx(json: any[], sheetName = "Sheet1"): Buffer {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(json);

        XLSX.utils.book_append_sheet(wb, ws, sheetName);

        const excelBuffer = XLSX.write(wb, {
            type: "buffer",
            bookType: "xlsx",
        });

        return excelBuffer;
    },
};

export { csv };
export default csv;
