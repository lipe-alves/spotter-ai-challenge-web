function toNumber(value: any): number {
    return Number(String(value).replace(/\D/g, "").replace(/,/g, "."));
}

export default toNumber;
export { toNumber };
