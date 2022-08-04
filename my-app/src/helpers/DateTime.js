export const getDayOfWeek = (date) => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[date.getDay()];
};

export const getTwelveHourTime = (date) => {
    let timeHours = date.getHours();
    const amOrPm = timeHours >= 12 ? 'pm' : 'am';
    timeHours = timeHours % 12;
    timeHours = timeHours ? timeHours : 12;

    return timeHours + amOrPm;
};