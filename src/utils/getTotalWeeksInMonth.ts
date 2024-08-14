function getTotalWeeksInMonth(month: number, year: number): number {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const weeks = Math.ceil((firstDay + totalDays) / 7);

    return weeks;
}

export default getTotalWeeksInMonth;
export { getTotalWeeksInMonth };
