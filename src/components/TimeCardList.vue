<script setup lang="ts" >
import TimeCard from "./TimeCard.vue"
import { calculatorStore } from '../stores/calculatorStore.ts'
import { calculateTime, daysOfWeek, decimalToHM } from '../utils'
import { computed } from "vue";

const printPage = () => {
    window.print();
};

const computedHours = computed(() =>
    calculatorStore.timeCards.flatMap(card => card.days.map(day => calculateTime(day.in, day.out, calculatorStore.settings.minHoursPerDay, calculatorStore.settings.hasOT ? calculatorStore.settings.OTHours : undefined)))
)

const computedTotalWithoutOTHours = computed(() =>
    computedHours.value.reduce((a, c) => (a ?? 0) + (c?.withoutOT ?? 0), 0))
const computedTotalOTHours = computed(() =>
    computedHours.value.reduce((a, c) => (a ?? 0) + (c?.OT ?? 0), 0))
</script>

<template >
    <div class="mt-8 max-w-5xl mx-auto">
        <div class="border-b-[1px] border-black dark:border-white ">
            <div class="flex flex-row justify-between ">
                <button
                    class="py-2 px-4 border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    @click="calculatorStore.clearFields()">
                    Clear Fields
                </button>
                <div class="flex flex-row gap-6">
                    <button
                        class="w-36 py-2 px-4 border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                        @click="calculatorStore.addWeek()">
                        Add Week
                    </button>
                    <button
                        class="w-36 py-2 px-4 border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                        @click="calculatorStore.removeWeek()">
                        Remove Week
                    </button>
                </div>
                <button
                    class="py-2 px-4 border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    @click="printPage">
                    Print
                </button>
            </div>

            <div class="flex flex-row justify-around mt-4">
                <div class="flex flex-row place-items-center justify-center w-1/3">
                    <label class="mr-4" for="daysPerWeek">Days per Week</label>
                    <input class="bg-white dark:bg-black dark:border-white dark:outline-white" type="number"
                        id="daysPerWeek" min="1" max="7" :value="calculatorStore.timeCards.at(0).days.length" @input="calculatorStore.setDaysPerWeek($event.target.value)">
                </div>
                <div class="flex flex-row place-items-center justify-center w-1/3">
                    <label class="mr-4" for="dayNames">Day Naming</label>
                    <select class="bg-white dark:bg-black dark:border-white dark:outline-white" name="" id="dayNames"
                        v-model="calculatorStore.settings.dayNames">
                        <option v-for="(days, daysI) in daysOfWeek" :value="daysI">
                            {{ days.slice(0, 1).join(', ') }}
                        </option>
                    </select>
                </div>
                <div class="flex flex-row place-items-center justify-center w-1/3">
                    <label class="mr-4" for="firstDay">First Day of Week</label>
                    <select class="bg-white dark:bg-black dark:border-white dark:outline-white" name="" id="firstDay"
                        v-model="calculatorStore.settings.firstDay">
                        <option v-for="(day, dayI) in daysOfWeek[calculatorStore.settings.dayNames]" :value="dayI">
                            {{ day }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="flex flex-row justify-around place-items-center mt-4 h-8">
                <div class="flex flex-row w-1/2 justify-around">
                    <div class="flex flex-row place-items-center">
                        <label class="select-none mr-4" for="h24">24 Hour Time</label>
                        <input
                            class="bg-white dark:bg-black dark:border-white dark:outline-white shadow-black dark:shadow-white"
                            type="checkbox" id="h24" v-model="calculatorStore.settings.h24">
                    </div>

                    <div class="flex flex-row place-items-center">
                        <label class="select-none mr-4" for="hasOT">OT</label>
                        <input
                            class="bg-white dark:bg-black dark:border-white dark:outline-white shadow-black dark:shadow-white"
                            type="checkbox" id="hasOT" v-model="calculatorStore.settings.hasOT">
                    </div>
                </div>
                <div class="w-1/2">
                    <div class="flex flex-row place-items-center " v-if="calculatorStore.settings.hasOT">
                        <label class="select-none mr-4" for="hoursBeforeOT">Hours per Day before OT</label>
                        <input class="bg-white dark:bg-black dark:border-white dark:outline-white" id="hoursBeforeOT"
                            type="text" :value="calculatorStore.settings.OTHours"
                            @input="calculatorStore.settings.OTHours = parseFloat($event?.target?.value) || 8">
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-center place-items-center mt-4 mb-8">
                <label class="select-none mr-4 " for="minHours">Minimum Hours per Day</label>
                <input class="bg-white dark:bg-black dark:border-white dark:outline-white" type="number" id="minHours"
                    :value="calculatorStore.settings.minHoursPerDay"
                    @input="calculatorStore.settings.minHoursPerDay = parseFloat($event?.target?.value) || 0">
            </div>
        </div>

        <div class="flex flex-col mt-8 ">
            <div class="flex flex-row">
                <label class="w-16 text-left" for="name">Name</label>
                <input class="w-56 bg-white dark:bg-black dark:border-white dark:outline-white" type="text" id="name"
                    v-model="calculatorStore.name">
            </div>
            <div class="flex flex-row mt-2">
                <label class="w-16 text-left" for="name" id="date">Date</label>
                <input class="w-56 bg-white dark:bg-black dark:text-white dark:border-white dark:outline-white" type="date"
                    id="" v-model="calculatorStore.date">
            </div>
        </div>

        <div class="print-area">
            <div class="print-header hidden flex-col border-b-[1px] ">
                <img class="mx-auto mt-8 mb-4" src="text_logo.svg" width="140" alt="">
                <p v-if="calculatorStore.name">{{ calculatorStore.name }}</p>
                <p v-if="calculatorStore.date">{{ new Date(calculatorStore.date).toLocaleDateString(undefined, {
                    timeZone:
                        'UTC'
                }) }}</p>
            </div>
            <div class="mt-4" v-for="(_, cardI) in calculatorStore?.timeCards">
                <TimeCard :card-i="cardI" />
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

    </div>
</template>

<style>
@media print {

    html,
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    * {
        visibility: hidden;
        color: black;
    }

    .print-header {
        display: flex;
    }

    .print-area,
    .print-area * {
        position: relative;
        overflow: hidden;
        visibility: visible;
    }

    .print-area {
        position: absolute;
        left: 0;
        top: 0;
    }
}
</style>