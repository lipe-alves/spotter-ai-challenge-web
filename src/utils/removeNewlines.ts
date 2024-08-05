function removeNewlines(text: string): string {
    return text.replace(/(\r\n|\n|\r)/gm, "");
}

export default removeNewlines;
export { removeNewlines };
