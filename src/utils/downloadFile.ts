import Axios from "axios";

async function downloadFile(
    value: Blob | string,
    filename: string
): Promise<void> {
    const isUrlParam = typeof value === "string";

    const result =
        isUrlParam && (await Axios.get(value, { responseType: "blob" })).data;

    const blob = isUrlParam ? result : value;
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = filename;

    downloadLink.click();

    URL.revokeObjectURL(url);
}

export default downloadFile;
export { downloadFile };
