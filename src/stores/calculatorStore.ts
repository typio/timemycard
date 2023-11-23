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
}

export type TimeCard = {
    days: [TimeCardDay]
}

export type Settings = {
    firstDay: number,
    dayNames: number,
    h24: boolean,
    hasOT: boolean,
    OTPeriod: 'day' | 'week' | 'both' | 'california',
    OTHours: number,
    minHoursPerDay: number,
}

const STORAGE_KEY = 'calculatorAppState';

function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : null;
}

const initialState = loadState() ?? {
    name: '',
    date: '',
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
        dayNames: 0,
        h24: false,
        hasOT: true,
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
    }));
    store.name = ''
}

const setDaysPerWeek = (store, dayAmount: number) => {
    if (dayAmount < 1 || dayAmount > 7) return; // Prevent setting days to less than 1

    store.timeCards.forEach(card => {
        const currentLength = card.days.length;

        if (dayAmount > currentLength) {
            for (let i = currentLength; i < dayAmount; i++) {
                card.days.push({
                    in: { hours: undefined, minutes: undefined, amPm: AMPM.am },
                    out: { hours: undefined, minutes: undefined, amPm: AMPM.pm },
                });
            }
        } else if (dayAmount < currentLength) {
            card.days.length = dayAmount;
        }
    });
}


calculatorStore.addWeek = () => addWeek(calculatorStore);
calculatorStore.removeWeek = () => removeWeek(calculatorStore);
calculatorStore.clearFields = () => clearFields(calculatorStore);
calculatorStore.setDaysPerWeek = (dayAmount) => setDaysPerWeek(calculatorStore, dayAmount);



watch(calculatorStore, (newState) => {
    saveState(newState);
}, { deep: true });
