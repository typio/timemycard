import { reactive } from 'vue'

export enum AMPM {
    am = 'am',
    pm = 'pm'
}

export type TimeStamp = {
    hours?: number,
    minutes?: number,
    amPm: AMPM
}

export type TimeCardDay = {
    in: TimeStamp,
    out: TimeStamp,
}

export type TimeCard = {
    days: [TimeCardDay]
}

export type Settings = {
    firstDay: number,
    h12: boolean,
    hasOT: boolean,
    OTPeriod: 'day' | 'week' | 'both' | 'california',
    OTHours: number,
    minHoursPerDay: number,
}

export const calculatorStore = reactive<{
    timeCards: [TimeCard],
    settings: Settings
}>({
    timeCards: Array.from({ length: 1 }, () => {
        return {
            days: Array.from({ length: 5 }, () => {
                return {
                    in: { hours: undefined, minutes: undefined, amPm: AMPM.am },
                    out: { hours: undefined, minutes: undefined, amPm: AMPM.pm },
                }
            })
        }
    }),

    settings: {
        firstDay: 0,
        h12: false,
        hasOT: true,
        OTPeriod: 'day',
        OTHours: 8,
        minHoursPerDay: 0,
    },
})