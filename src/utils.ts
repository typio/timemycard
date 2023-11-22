import { AMPM, TimeStamp } from "./stores/calculatorStore";


export const interpretTimeInput = (input: string, is12h = false): TimeStamp | null => {
    let cleanInput = input.replace(/[^0-9]/g, '');

    if (cleanInput === '') return null;

    let hours: number;
    let minutes: number = 0;
    let amPm: AMPM

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

    if (hours > 12) {
        hours -= 12
        amPm = AMPM.am
    } else {
        amPm = AMPM.pm
    }

    return { hours, minutes, amPm };
};

export const calculateTime = (timeStamp: TimeStamp) => {

}