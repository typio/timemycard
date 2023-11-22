<script setup lang="ts" >
import { calculatorStore, AMPM } from '../stores/calculatorStore.ts'

import { interpretTimeInput } from '../utils'

const props = defineProps(['cardI'])

const daysOfWeek = [
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

const selectText = (e) => {
    e.target.select();
    e.target.focus();
};

const updateTime = (dayIndex, timeType, value) => {
    const result = interpretTimeInput(value);
    if (result !== null) {
        calculatorStore.timeCards[props.cardI].days[dayIndex][timeType].hours = result.hours;
        calculatorStore.timeCards[props.cardI].days[dayIndex][timeType].minutes = result.minutes;
    }
};

const cycleAMPM = (day, timeType) => {
    if (day[timeType].amPm == AMPM.am) day[timeType].amPm = AMPM.pm; else day[timeType].amPm = AMPM.am
}

</script>
 
<template>
    <div class="bg-red-500 w-full text-center">
        <div class="flex flex-row ">
            <h3 class="ml-[25%] w-1/4">In</h3>
            <h3 class="w-1/4">Out</h3>
            <h3 class="w-1/4">Hours</h3>
        </div>
        <div class="flex flex-row" v-for="(day, dayI) in calculatorStore?.timeCards[props.cardI].days" :key="dayI">
            <h3 class="w-1/4">{{ daysOfWeek[0][dayI] }}</h3>
            <div class="w-1/4 flex flex-row ">
                <input type="text" class="w-full" :value="day.in.hours !== undefined ? day.in.hours + ':' + ((day.in.minutes ?? '00') + '').padStart(2, '0') : ''
                    " @focus="selectText" @blur="(e) => { updateTime(dayI, 'in', e?.target?.value) }">
                <button class="w-16" @click="cycleAMPM(day, 'in')">
                    {{ day.in.amPm }}
                </button>
            </div>
            <div class="w-1/4 flex flex-row ">
                <input type="text" class="w-full">
                <button class="w-16" @click="cycleAMPM(day, 'out')">
                    {{ day.out.amPm }}
                </button>
            </div>
            <p class="w-1/4"></p>
        </div>
        <p>Total: {{ }}</p>
    </div>
</template>