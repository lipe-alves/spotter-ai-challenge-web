import darkenColor from "./darkenColor";

function lightenColor(color: string, percent: number): string {
    return darkenColor(color, -percent);
}

export default lightenColor;
export { lightenColor };
