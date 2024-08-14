function getWeekdayName(weekdayNumber: number): string {
    const baseDate = new Date(Date.UTC(2024, 0, 1));
    const date = new Date(baseDate);
    date.setUTCDate(baseDate.getUTCDate() + weekdayNumber - 1);
    return date.toLocaleString("en-US", { weekday: "long" });
}

export default getWeekdayName;
export { getWeekdayName };
