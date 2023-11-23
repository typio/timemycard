<script setup lang="ts" >
import { computed, reactive } from 'vue';
import { calculatorStore, AMPM, TimeCardDay, TimeStamp } from '../stores/calculatorStore.ts'

import { interpretTimeInput, calculateTime, daysOfWeek, decimalToHM } from '../utils'

const props = defineProps(['cardI'])

// Mirror the store state to make changes easier
const times = reactive(calculatorStore?.timeCards[props.cardI].days)

const selectText = (e: any) => {
    e.target.select();
    e.target.focus();
};

const updateTime = (dayIndex: number, timeType: 'in' | 'out', value: string) => {
    const timeToUpdate = interpretTimeInput(value, times[dayIndex][timeType].amPm, calculatorStore.settings.h24) ?? { hours: undefined, minutes: undefined };
    times[dayIndex][timeType] = { ...times[dayIndex][timeType], ...timeToUpdate };
};

const cycleAMPM = (timeStamp: TimeStamp) => {
    timeStamp.amPm = timeStamp.amPm === AMPM.am ? AMPM.pm : AMPM.am;
};

const formatTime = (time: TimeStamp): string => {
    if (time.hours === undefined)
        return ''

    let formattedHours: number
    let formattedMinutes: string

    if (calculatorStore.settings.h24)
        formattedHours = time.amPm === AMPM.pm && time.hours < 12 ? time.hours + 12 : time.hours
    else
        // Convert 0 hours to 12 in 12-hour format
        formattedHours = time.hours === 0 ? 12 : time.hours;


    formattedMinutes = (time.minutes ?? 0).toString().padStart(2, '0')

    return `${formattedHours}:${formattedMinutes}`
};

const displayTimes = computed(() => times.map((time: TimeCardDay) => ({
    in: formatTime(time.in),
    out: formatTime(time.out)
})))

const computedHours = computed(() => times.map((time: TimeCardDay) => calculateTime(time.in, time.out, calculatorStore.settings.minHoursPerDay, calculatorStore.settings.hasOT ? calculatorStore.settings.OTHours : undefined)));
console.log(computedHours.value)

const computedTotalWithoutOTHours = computed(() => computedHours.value.reduce((a: any, c: any) => (a ?? 0) + (c?.withoutOT ?? 0), 0))
console.log(computedTotalWithoutOTHours.value)

const computedTotalOTHours = computed(() => computedHours.value.reduce((a: any, c: any) => (a ?? 0) + (c?.OT ?? 0), 0))
console.log(computedTotalOTHours.value)


</script>
 
<template>
    <div class=" w-full text-center">
        <div class="flex flex-row ">
            <h3 class="ml-[16.67%] w-2/6">In</h3>
            <h3 class="w-2/6">Out</h3>
            <h3 class="w-1/6">Hours</h3>
        </div>
        <div class="flex flex-row gap-2 place-items-center" v-for="(day, dayI) in times" :key="dayI">
            <h3 class="w-1/6">{{ daysOfWeek[calculatorStore.settings.dayNames][(dayI + calculatorStore.settings.firstDay) %
                7] }}</h3>
            <div class="w-2/6 flex flex-row relative">
                <input type="text" class="w-full py-1 my-1 h-9 dark:border-white dark:bg-black" 
                    :value="displayTimes[dayI].in" @focus="selectText"
                    @blur="updateTime(dayI, 'in', ($event?.target as HTMLInputElement)?.value)">
                <button tabindex="-1"
                    class="w-16 absolute right-0 h-9 border-2  border-black dark:border-white dark:bg-black my-1"
                    v-if="!calculatorStore.settings.h24" @click="cycleAMPM(day.in)">
                    {{ day.in.amPm }}
                </button>
            </div>
            <div class="w-2/6 flex flex-row relative">
                <input type="text" class="w-full py-1 my-1 h-9 dark:border-white dark:bg-black"
                    :value="displayTimes[dayI].out" @focus="selectText"
                    @blur="updateTime(dayI, 'out', ($event?.target as HTMLInputElement)?.value)">
                <button class="w-16 absolute right-0 h-9 border-2  border-black dark:border-white dark:bg-black my-1"
                    v-if="!calculatorStore.settings.h24" tabindex="-1" @click="cycleAMPM(day.out)">
                    {{ day.out.amPm }}
                </button>
            </div>
            <div class="w-1/6 flex flex-row justify-around">
                <p>{{ computedHours[dayI]?.withoutOT?.toFixed(2) }}</p>
                <p v-if="calculatorStore.settings.hasOT">{{ computedHours[dayI]?.OT ? computedHours[dayI]?.OT?.toFixed(2) +
                    ' OT' : ''
                }}</p>
            </div>
        </div>

        <div class="border-b-[1px]">
            <div class="my-4 max-w-lg mx-auto flex flex-row  place-content-evenly ">
                <div class="flex flex-row place-items-center">
                    <p class="mr-4">Total</p>
                    <div class="flex flex-col">
                        <p>{{ (computedTotalWithoutOTHours + computedTotalOTHours)?.toFixed(2) }}</p>
                        <p>{{ decimalToHM(computedTotalWithoutOTHours + computedTotalOTHours) }}</p>
                    </div>
                </div>
                <div class="flex flex-row place-items-center" v-if="calculatorStore.settings.hasOT">
                    <p class="mr-4">Regular</p>
                    <div class="flex flex-col">
                        <p>{{ computedTotalWithoutOTHours?.toFixed(2) }}</p>
                        <p>{{ decimalToHM(computedTotalWithoutOTHours) }}</p>
                    </div>
                </div>
                <div class="flex flex-row place-items-center" v-if="calculatorStore.settings.hasOT">
                    <p class="mr-4">OT</p>
                    <div class="flex flex-col">
                        <p>{{ computedTotalOTHours?.toFixed(2) }} </p>
                        <p>{{ decimalToHM(computedTotalOTHours) }} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>