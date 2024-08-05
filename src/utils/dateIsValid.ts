function dateIsValid(date: any): boolean {
    return date instanceof Date && !Number.isNaN(date.getTime());
}

export default dateIsValid;
export { dateIsValid };
