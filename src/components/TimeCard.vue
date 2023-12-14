<script setup lang="ts" >
import { computed, reactive } from 'vue';
import { calculatorStore, AMPM, TimeCardDay, TimeStamp } from '../stores/calculatorStore.ts'

import { interpretTimeInput, calculateTime, daysOfWeek, decimalToHM } from '../utils'

const props = defineProps(['cardI', 'print'])

// Mirror the store state to make changes easier
const times = reactive(calculatorStore?.timeCards[props.cardI].days)

const selectText = (e: any) => {
    e.target.select();
    e.target.focus();
};

const updateTime = (dayIndex: number, timeType: 'in' | 'out' | 'break', value: string) => {
    if (timeType == 'break') {
        times[dayIndex]['break'] = Number(value)
    } else {
        const timeToUpdate = interpretTimeInput(value, times[dayIndex][timeType].amPm, calculatorStore.settings.h24) ?? { hours: undefined, minutes: undefined, break: undefined };
        times[dayIndex][timeType] = { ...times[dayIndex][timeType], ...timeToUpdate };
    }
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
    out: formatTime(time.out),
    break: time.break ? time.break + 'min' : '',
})))

const computedHours = computed(() => times.map((time: TimeCardDay) => calculateTime(time.in, time.out, calculatorStore.settings.hasBreak ? (time.break ?? 0) : 0, calculatorStore.settings.minHoursPerDay, calculatorStore.settings.hasOT ? calculatorStore.settings.OTHours : undefined)));

const computedTotalWithoutOTHours = computed(() => computedHours.value.reduce((a: any, c: any) => (a ?? 0) + (c?.withoutOT ?? 0), 0))

const computedTotalOTHours = computed(() => computedHours.value.reduce((a: any, c: any) => (a ?? 0) + (c?.OT ?? 0), 0))

const clearCard = (cardI: number) => {
    calculatorStore.timeCards[cardI].days.map(day => {
        day.in = { hours: undefined, minutes: undefined, amPm: AMPM.am };
        day.out = { hours: undefined, minutes: undefined, amPm: AMPM.pm };
        day.break = undefined;
    });
}
</script>
 
<template>
    <div v-if="!props.print">
        <div class=" w-full text-center text-sm border-[1px] whitespace-nowrap relative">
            <button tabindex="-1" class="absolute left-[-1px] top-[-1px] py-1 btn-primary"
                @click="clearCard(props.cardI)">Clear</button>
            <div class="flex flex-row font-sans text-sm mt-2 py-2 font-semibold">
                <div class="ml-[16.67%] w-full md:w-3/6 flex flex-row">
                    <h3 :class="calculatorStore.settings.hasBreak ? 'w-2/5' : 'w-1/2'">In</h3>
                    <h3 :class="calculatorStore.settings.hasBreak ? 'w-2/5' : 'w-1/2'">Out</h3>
                    <h3 class="w-1/5" v-if="calculatorStore.settings.hasBreak">Break</h3>
                </div>
                <div class="hidden md:flex w-1/3 flex-row">
                    <h3 :class="calculatorStore.settings.hasOT ? 'w-1/2' : 'w-full'">
                        {{ calculatorStore.settings.hasOT ? 'Regular Hours' : 'Hours' }}
                    </h3>
                    <h3 :class="calculatorStore.settings.hasOT ? 'w-1/2' : 'w-full'" v-if="calculatorStore.settings.hasOT">
                        OT Hours
                    </h3>
                </div>
            </div>
            <div class="flex flex-row place-items-center" v-for="(day, dayI) in times" :key="dayI">
                <h3 class="w-1/6">
                    {{ daysOfWeek[calculatorStore.settings.dayNames][(dayI + calculatorStore.settings.firstDay) % 7] }}
                </h3>
                <div class="w-5/6 md:w-3/6 flex flex-row">
                    <div class="flex flex-row relative" :class="calculatorStore.settings.hasBreak ? 'w-2/5' : 'w-1/2'">
                        <input type="text" :class="!calculatorStore.settings.h24 ? 'pr-16' : '0'"
                            class="w-full py-1 outline-1 outline-black outline border-0 h-9  text-center dark:outline-white bg-white dark:bg-black"
                            :value="displayTimes[dayI].in" @focus="selectText"
                            @blur="updateTime(dayI, 'in', ($event?.target as HTMLInputElement)?.value)">

                        <button tabindex="-1"
                            class="w-16 absolute right-0 h-9 border-l-[1px] z-[999] border-black dark:border-white bg-transparent"
                            v-if="!calculatorStore.settings.h24" @click="cycleAMPM(day.in)">
                            {{ day.in.amPm }}
                        </button>
                    </div>
                    <div class=" flex flex-row relative" :class="calculatorStore.settings.hasBreak ? 'w-2/5' : 'w-1/2'">
                        <input type="text" :class="!calculatorStore.settings.h24 ? 'pr-16' : '0'"
                            class="w-full py-1 outline-1 outline-black outline border-0 h-9  text-center dark:outline-white bg-white dark:bg-black"
                            :value="displayTimes[dayI].out" @focus="selectText"
                            @blur="updateTime(dayI, 'out', ($event?.target as HTMLInputElement)?.value)">

                        <button
                            class="w-16 absolute right-0 h-9 border-l-[1px] z-[999] border-black dark:border-white bg-transparent"
                            v-if="!calculatorStore.settings.h24" tabindex="-1" @click="cycleAMPM(day.out)">
                            {{ day.out.amPm }}
                        </button>
                    </div>
                    <div class="flex w-1/5 flex-row relative" v-if="calculatorStore.settings.hasBreak">
                        <input type="text" maxlength="3"
                            class="w-full py-1 outline-1 outline-black outline border-0 h-9 text-center dark:outline-white bg-white dark:bg-black"
                            :value="displayTimes[dayI].break" @focus="selectText"
                            @blur="updateTime(dayI, 'break', ($event?.target as HTMLInputElement)?.value)">
                    </div>
                </div>
                <div class="w-1/3 hidden md:flex flex-row ">
                    <p :class="calculatorStore.settings.hasOT ? 'w-1/2 border-r-[1px]' : 'w-full'">
                        {{ calculatorStore.settings.showHM ?
                            decimalToHM(computedHours[dayI]?.withoutOT) :
                            (computedHours[dayI]?.withoutOT)?.toFixed(2)
                        }}
                    </p>
                    <p class="w-1/2" v-if="calculatorStore.settings.hasOT">
                        {{ computedHours[dayI]?.OT ? (calculatorStore.settings.showHM ?
                            decimalToHM(computedHours[dayI]?.OT) :
                            (computedHours[dayI]?.OT)?.toFixed(2)) : '' }}
                    </p>
                </div>
            </div>

            <div class="my-4 max-w-lg mx-auto flex flex-row  place-content-evenly text-base">
                <div class="flex flex-row place-items-center">
                    <p class="mr-4 font-sans ">Total</p>

                    <p>
                        {{ calculatorStore.settings.showHM ?
                            decimalToHM(computedTotalWithoutOTHours + computedTotalOTHours) :
                            (computedTotalWithoutOTHours + computedTotalOTHours)?.toFixed(2)
                        }}
                    </p>

                </div>
                <div class="flex flex-row place-items-center" v-if="calculatorStore.settings.hasOT">
                    <p class="mr-4 font-sans ">Regular</p>

                    <p>
                        {{ calculatorStore.settings.showHM ?
                            decimalToHM(computedTotalWithoutOTHours) :
                            (computedTotalWithoutOTHours)?.toFixed(2)
                        }}
                    </p>
                </div>
                <div class="flex flex-row place-items-center" v-if="calculatorStore.settings.hasOT">
                    <p class="mr-4 font-sans">OT</p>
                    <p>
                        {{ calculatorStore.settings.showHM ?
                            decimalToHM(computedTotalOTHours) :
                            (computedTotalOTHours)?.toFixed(2)
                        }}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Print Time Card (Without the inputs and fancy CSS) -->
    <div v-else>
        <div class=" w-full text-center text-base border-[1px]  whitespace-nowrap">
            <div class="flex flex-row font-sans mt-2 py-2 font-semibold">
                <div class="ml-[16.67%] w-3/6 flex flex-row">
                    <h3 :class="calculatorStore.settings.hasBreak ? 'w-2/5' : 'w-1/2'">In</h3>
                    <h3 :class="calculatorStore.settings.hasBreak ? 'w-2/5' : 'w-1/2'">Out</h3>
                    <h3 class="w-1/5" v-if="calculatorStore.settings.hasBreak">Break</h3>
                </div>
                <div class="w-1/3 flex flex-row">
                    <h3 :class="calculatorStore.settings.hasOT ? 'w-1/2' : 'w-full'">
                        {{ calculatorStore.settings.hasOT ? 'Regular Hours' : 'Hours' }}
                    </h3>
                    <h3 :class="calculatorStore.settings.hasOT ? 'w-1/2' : 'w-full'" v-if="calculatorStore.settings.hasOT">
                        OT Hours
                    </h3>
                </div>
            </div>
            <div class="flex flex-row place-items-center" v-for="(day, dayI) in times.filter((_, i) => {
                return (computedHours[i]?.withoutOT ?? 0) + (computedHours[i]?.OT ?? 0) > 0
            })" :key="dayI">
                <h3 class="w-1/6">
                    {{ daysOfWeek[calculatorStore.settings.dayNames][(dayI + calculatorStore.settings.firstDay) % 7] }}
                </h3>
                <div class="w-3/6 flex flex-row py-1">
                    <div :class="calculatorStore.settings.hasBreak ? 'w-2/5' : 'w-1/2'">
                        <p class="text-center ">
                            {{ displayTimes[dayI].in }} {{ !calculatorStore.settings.h24 ? day.in.amPm : '' }}
                        </p>
                    </div>
                    <div :class="calculatorStore.settings.hasBreak ? 'w-2/5' : 'w-1/2'">
                        <p class="text-center">
                            {{ displayTimes[dayI].out }} {{ !calculatorStore.settings.h24 ? day.in.amPm : '' }}
                        </p>
                    </div>
                    <div class="w-1/5" v-if="calculatorStore.settings.hasBreak">
                        <p class="text-center">{{ displayTimes[dayI].break }}</p>
                    </div>
                </div>

                <div class="w-1/3 flex flex-row ">
                    <p :class="calculatorStore.settings.hasOT ? 'w-1/2 border-r-[1px]' : 'w-full'">
                        {{ calculatorStore.settings.showHM ?
                            decimalToHM(computedHours[dayI]?.withoutOT) :
                            (computedHours[dayI]?.withoutOT)?.toFixed(2)
                        }}
                    </p>
                    <p class="w-1/2" v-if="calculatorStore.settings.hasOT">
                        {{ computedHours[dayI]?.OT ? (calculatorStore.settings.showHM ?
                            decimalToHM(computedHours[dayI]?.OT) :
                            (computedHours[dayI]?.OT)?.toFixed(2)) : '' }}
                    </p>
                </div>
            </div>

            <div class="my-4 max-w-lg mx-auto flex flex-row  place-content-evenly text-base">
                <div class="flex flex-row place-items-center">
                    <p class="mr-4 font-sans ">Total</p>

                    <p>
                        {{ calculatorStore.settings.showHM ?
                            decimalToHM(computedTotalWithoutOTHours + computedTotalOTHours) :
                            (computedTotalWithoutOTHours + computedTotalOTHours)?.toFixed(2)
                        }}
                    </p>

                </div>
                <div class="flex flex-row place-items-center" v-if="calculatorStore.settings.hasOT">
                    <p class="mr-4 font-sans ">Regular</p>

                    <p>
                        {{ calculatorStore.settings.showHM ?
                            decimalToHM(computedTotalWithoutOTHours) :
                            (computedTotalWithoutOTHours)?.toFixed(2)
                        }}
                    </p>
                </div>
                <div class="flex flex-row place-items-center" v-if="calculatorStore.settings.hasOT">
                    <p class="mr-4 font-sans">OT</p>
                    <p>
                        {{ calculatorStore.settings.showHM ?
                            decimalToHM(computedTotalOTHours) :
                            (computedTotalOTHours)?.toFixed(2)
                        }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>