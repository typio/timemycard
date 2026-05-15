import { reactive, watch } from 'vue'

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
    break?: number
}

export type TimeCard = {
    days: [TimeCardDay]
}

export type Settings = {
    firstDay: number,
    dayNames: number,
    showHM: boolean,
    h24: boolean,
    hasOT: boolean,
    hasBreak: boolean,
    OTPeriod: 'day' | 'week' | 'both' | 'california',
    OTHours: number,
    minHoursPerDay: number,
}

const STORAGE_KEY = 'timeMyCardAppState';
const isBrowser = typeof window !== 'undefined';

function saveState(state) {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
    if (!isBrowser) return null;
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : null;
}

const initialState: {
    name: string,
    date: string | Date,
    timeCards: [TimeCard],
    settings: Settings,
    addWeek?(): void,
    removeWeek?(): void,
    clearFields?(): void,
    setDaysPerWeek?(number): void,

} = loadState() ?? {
    name: '',
    date: '',
    timeCards: Array.from({ length: 1 }, () => {
        return {
            days: Array.from({ length: 5 }, () => {
                return {
                    in: { hours: undefined, minutes: undefined, amPm: AMPM.am },
                    out: { hours: undefined, minutes: undefined, amPm: AMPM.pm },
                    break: undefined
                }
            })
        }
    }),

    settings: {
        firstDay: 0,
        dayNames: 0,
        showHM: false,
        h24: false,
        hasOT: true,
        hasBreak: true,
        OTPeriod: 'day',
        OTHours: 8,
        minHoursPerDay: 0,
    },
}

export const calculatorStore = reactive(initialState);

const addWeek = (store) => {
    store.timeCards.push({
        days: Array.from({ length: store.timeCards?.at(-1)?.days?.length ?? 5 }, () => ({
            in: { hours: undefined, minutes: undefined, amPm: AMPM.am },
            out: { hours: undefined, minutes: undefined, amPm: AMPM.pm },
            break: undefined
        })),
    });
}

const removeWeek = (store) => {
    if (store.timeCards.length > 1)
        store.timeCards.pop();
}

const clearFields = (store) => {
    store.timeCards.forEach(card => card.days.forEach(day => {
        day.in = { hours: undefined, minutes: undefined, amPm: AMPM.am };
        day.out = { hours: undefined, minutes: undefined, amPm: AMPM.pm };
        day.break = undefined;
    }));
    store.name = ''
}

const setDaysPerWeek = (store, dayAmount: number) => {
    if (dayAmount < 1 || dayAmount > 7) return

    store.timeCards.forEach(card => {
        // Make BIG
        while (card.days.length < dayAmount)
            card.days.push({
                in: { hours: undefined, minutes: undefined, amPm: AMPM.am },
                out: { hours: undefined, minutes: undefined, amPm: AMPM.pm },
                break: undefined
            });

        // Make small
        card.days.length = dayAmount
    });
}

calculatorStore.addWeek = () => addWeek(calculatorStore);
calculatorStore.removeWeek = () => removeWeek(calculatorStore);
calculatorStore.clearFields = () => clearFields(calculatorStore);
calculatorStore.setDaysPerWeek = (dayAmount) => setDaysPerWeek(calculatorStore, dayAmount);

watch(calculatorStore, (newState) => {
    saveState(newState);
}, { deep: true });
