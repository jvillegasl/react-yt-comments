export function getTimeDiff(date: string | Date) {
    let prevDate: Date;

    if (typeof date === "string") {
        prevDate = new Date(date);
    } else {
        prevDate = date;
    }

    const currentDate = new Date();
    const diffDate = currentDate.getTime() - prevDate.getTime();

    let units = "seconds";
    let amount = Math.round(diffDate / 1000);

    if (amount >= 60) {
        amount = Math.round(amount / 60);
        units = amount > 1 ? "minutes" : "minute";
    }

    if (amount >= 60) {
        amount = Math.round(amount / 60);
        units = amount > 1 ? "hours" : "hour";
    }

    if (amount >= 24) {
        amount = Math.round(amount / 24);
        units = amount > 1 ? "days" : "day";
    }

    if (amount >= 30) {
        amount = Math.round(amount / 30);
        units = amount > 1 ? "months" : "month";
    }

    if (amount >= 12) {
        amount = Math.round(amount / 12);
        units = amount > 1 ? "years" : "year";
    }

    return `${amount} ${units}`;
}
