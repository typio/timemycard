import { AMPM, TimeStamp } from "./stores/calculatorStore";

export const daysOfWeek = [
    [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    ["1", "2", "3", "4", "5", "6", "7"],
];

export const interpretTimeInput = (input: string, _amPm: AMPM, h24 = false): TimeStamp | null => {
    let cleanInput = input.replace(/[^0-9]/g, '');

    if (cleanInput === '') return null;

    let hours: number;
    let minutes: number = 0;
    let amPm = _amPm

    // Interepret input as hour time only
    if (cleanInput.length <= 2) {
        hours = parseInt(cleanInput);
    } else { // Interepret input as hour and minutes
        hours = parseInt(cleanInput.substring(0, cleanInput.length - 2));
        minutes = parseInt(cleanInput.substring(cleanInput.length - 2));
    }

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return null;
    }


    if (h24)
        if (hours <= 12) amPm = AMPM.am
        else amPm = AMPM.pm

    if (hours > 12) {
        hours -= 12
        amPm = AMPM.pm
    }


    return { hours, minutes, amPm };
};

export type TimeDuration = {
    hours: number,
    minutes: number
}

export const calculateTime = (inTimeStamp: TimeStamp, outTimeStamp: TimeStamp, minHoursPerDay, OTHours?): { withoutOT: number, OT: number } | null => {
    if (inTimeStamp.hours == undefined || inTimeStamp.minutes == undefined ||
        outTimeStamp.hours == undefined || outTimeStamp.minutes == undefined)
        return null

    const convertTo24Hour = (hours: number, amPm: AMPM) => {
        if (hours === 12) {
            return amPm === AMPM.am ? 0 : 12;
        }
        return amPm === AMPM.am ? hours : hours + 12;
    };

    const inHours = convertTo24Hour(inTimeStamp.hours, inTimeStamp.amPm);
    const outHours = convertTo24Hour(outTimeStamp.hours, outTimeStamp.amPm);

    const inDecimal = inHours + inTimeStamp.minutes / 60;
    const outDecimal = outHours + outTimeStamp.minutes / 60;

    // Calculate total hours worked
    let totalHours = inDecimal <= outDecimal ? outDecimal - inDecimal : (24 - inDecimal) + outDecimal;

    // Ensure total hours is at least the minimum per day, if specified
    totalHours =  Math.max(minHoursPerDay, totalHours)

    // Calculate overtime hours
    let withoutOT = OTHours ? Math.min(OTHours, totalHours) : totalHours
    let OT = OTHours ? Math.max(0, totalHours - OTHours) : 0;

    return { withoutOT, OT };
}

export const decimalToHM = (hoursDecimal: number | null) => {
    if (hoursDecimal === null || hoursDecimal === undefined) return ''

    let hours = Math.floor(hoursDecimal)
    let minutes = Math.round((hoursDecimal % 1) * 60)

    if (minutes > 0) return `${Math.floor(hours)}h ${minutes}m`
    else return `${Math.floor(hours)}h`
}
