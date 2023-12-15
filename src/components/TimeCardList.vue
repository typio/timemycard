<script setup lang="ts" >
import TimeCard from "./TimeCard.vue"
import TextLogo from "./TextLogo.vue";
import { calculatorStore } from '../stores/calculatorStore.ts'
import { calculateTime, daysOfWeek, decimalToHM } from '../utils'
import { computed } from "vue";

const printPage = () => {
    window.print();
};

const computedHours = computed(() =>
    calculatorStore.timeCards.flatMap(card => card.days.map(day => calculateTime(day.in, day.out, calculatorStore.settings.hasBreak ? day.break ?? 0 : 0, calculatorStore.settings.minHoursPerDay, calculatorStore.settings.hasOT ? calculatorStore.settings.OTHours : undefined)))
)

const computedTotalWithoutOTHours = computed(() =>
    computedHours.value.reduce((a, c) => (a ?? 0) + (c?.withoutOT ?? 0), 0))
const computedTotalOTHours = computed(() =>
    computedHours.value.reduce((a, c) => (a ?? 0) + (c?.OT ?? 0), 0))
</script>

<template >
    <div class="mt-8 max-w-5xl mx-auto">
        <div class="no-print ">
            <div class="">
                <div class="flex flex-col md:flex-row gap-2 justify-between ">
                    <button
                        class="btn-primary place-self-center"
                        @click="calculatorStore.clearFields()">
                        Clear Fields
                    </button>
                    <div class="flex flex-row place-self-center gap-6">
                        <button
                            class="w-36 btn-primary"
                            @click="calculatorStore.addWeek()">
                            Add Week
                        </button>
                        <button
                            class="w-36 btn-primary"
                            @click="calculatorStore.removeWeek()">
                            Remove Week
                        </button>
                    </div>
                    <button
                        class="btn-primary place-self-center"
                        @click="printPage">
                        Print
                    </button>
                </div>

                <div class="flex flex-row justify-around mt-4">
                    <div class="flex flex-col md:flex-row place-items-center justify-center w-1/3">
                        <label class="mr-4" for="daysPerWeek">Days per Week</label>
                        <input class="w-11 text-center bg-white dark:bg-black dark:border-white dark:outline-white" type="number"
                            id="daysPerWeek" min="1" max="7" :value="calculatorStore.timeCards[0]?.days.length"
                            @input="calculatorStore.setDaysPerWeek(($event?.target as HTMLInputElement).value)">
                    </div>
                    <div class="flex flex-col md:flex-row place-items-center justify-center w-1/3">
                        <label class="mr-4" for="dayNames">Day Naming</label>
                        <select class="w-24 text-center bg-white dark:bg-black dark:border-white dark:outline-white" name="" id="dayNames"
                            v-model="calculatorStore.settings.dayNames">
                            <option v-for="(days, daysI) in daysOfWeek" :value="daysI">
                                {{ days.slice(0, 1).join(', ') }}
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-col md:flex-row place-items-center justify-center w-1/3">
                        <label class="mr-4" for="firstDay">First Day of Week</label>
                        <select class="w-24 text-center bg-white dark:bg-black dark:border-white dark:outline-white" name=""
                            id="firstDay" v-model="calculatorStore.settings.firstDay">
                            <option v-for="(day, dayI) in daysOfWeek[calculatorStore.settings.dayNames]" :value="dayI">
                                {{ day }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="flex flex-row justify-around place-items-center mt-4">
                    <div class="flex flex-row w-2/3 ">
                        <div class="flex flex-col md:flex-row w-1/3 justify-center place-items-center">
                            <label class="select-none mr-4" for="minHours">Minimum Daily Hours</label>
                            <input class="w-11 text-center bg-white dark:bg-black dark:border-white dark:outline-white" type="number"
                                id="minHours" :value="calculatorStore.settings.minHoursPerDay" max="24"
                                @input="calculatorStore.settings.minHoursPerDay = Math.abs(parseFloat(($event?.target as HTMLInputElement)?.value) || 0)">
                        </div>
                        <div class="flex flex-col md:flex-row w-1/3 place-items-center place-content-center">
                            <label class="select-none mr-4" for="hasBreak">Breaks</label>
                            <input
                                class="bg-white dark:bg-black dark:border-white dark:outline-white shadow-black dark:shadow-white"
                                type="checkbox" id="hasBreak" v-model="calculatorStore.settings.hasBreak">
                        </div>
                        <div class="flex flex-col md:flex-row w-1/3 place-items-center place-content-center">
                            <label class="select-none mr-4" for="hasOT">OT</label>
                            <input
                                class="bg-white dark:bg-black dark:border-white dark:outline-white shadow-black dark:shadow-white"
                                type="checkbox" id="hasOT" v-model="calculatorStore.settings.hasOT">
                        </div>
                    </div>
                    <div class="w-1/3">
                        <div class="flex flex-col md:flex-row place-items-center " v-if="calculatorStore.settings.hasOT">
                            <label class="select-none mr-4" for="hoursBeforeOT">Daily Hours before OT</label>
                            <input class="text-center w-11 bg-white dark:bg-black dark:border-white dark:outline-white"
                                id="hoursBeforeOT" type="number" :value="calculatorStore.settings.OTHours" max="24" min="1"
                                @input="calculatorStore.settings.OTHours = Math.abs(parseFloat(($event?.target as HTMLInputElement)?.value) || 1)">
                        </div>
                    </div>
                </div>
                <div class="flex flex-row  place-items-center mt-4 ">
                    <div class="flex flex-col md:flex-row w-1/2 place-items-center place-content-center">
                        <label class="select-none mr-4" for="h24">24 Hour Time</label>
                        <input
                            class="bg-white dark:bg-black dark:border-white dark:outline-white shadow-black dark:shadow-white"
                            type="checkbox" id="h24" v-model="calculatorStore.settings.h24">
                    </div>

                    <div class="flex flex-col md:flex-row w-1/2 justify-center place-items-center">
                        <button
                            class="btn-primary"
                            @click="calculatorStore.settings.showHM = !calculatorStore.settings.showHM">
                            {{ calculatorStore.settings.showHM ? "Decimal Time Format" : "hh:mm Time Format" }}
                        </button>
                    </div>

                </div>
            </div>

            <div class=" my-4 h-1 border-b-[1px] border-black dark:border-white"></div>

            <div class=" flex flex-col font-sans text-sm">
                <div class="flex flex-row items-center">
                    <label class="w-16 text-left" for="name">Name</label>
                    <input class="w-56 pl-1 bg-white dark:bg-black dark:border-white dark:outline-white" type="text"
                        id="name" v-model="calculatorStore.name">
                </div>
                <div class="flex flex-row items-center mt-2">
                    <label class="w-16 text-left" for="name" id="date">Date</label>
                    <input class="w-56 bg-white dark:bg-black dark:border-white dark:outline-white" type="date" id=""
                        v-model="calculatorStore.date">
                </div>
            </div>

            <div class="mt-4" v-for="(_, cardI) in calculatorStore?.timeCards">
                <TimeCard :card-i="cardI" :print="false" />
            </div>
        </div>

        <div class="print-area hidden">
            <div class="text-left hidden print-header  flex-col border-b-[3px] border-double ">
                <div class="w-1/6 flex mx-auto object-contain">
                    <TextLogo />
                </div>
                <div class="font-sans">
                    <p v-if="calculatorStore.name">{{ calculatorStore.name }}</p>
                    <p v-if="calculatorStore.date">{{ new Date(calculatorStore.date).toLocaleDateString(undefined, {
                        timeZone:
                            'UTC'
                    }) }}</p>
                </div>
            </div>

            <div class="mt-4" v-for="(_, cardI) in calculatorStore?.timeCards">
                <TimeCard :card-i="cardI" :print="true" />
            </div>
        </div>

        <div class="mt-4 border-[1px] totals-sum text-sm">
            <div class="my-4 max-w-lg mx-auto flex flex-row  place-content-evenly ">
                <div class="flex flex-row place-items-center">
                    <p class="mr-4 ">Total</p>
                    <p>
                        {{ calculatorStore.settings.showHM ?
                            decimalToHM(computedTotalWithoutOTHours + computedTotalOTHours) :
                            (computedTotalWithoutOTHours + computedTotalOTHours)?.toFixed(2)
                        }}
                    </p>
                </div>
                <div class="flex flex-row place-items-center" v-if="calculatorStore.settings.hasOT">
                    <p class="mr-4 ">Regular</p>
                    <p>
                        {{ calculatorStore.settings.showHM ?
                            decimalToHM(computedTotalWithoutOTHours) :
                            (computedTotalWithoutOTHours)?.toFixed(2)
                        }}
                    </p>
                </div>
                <div class="flex flex-row place-items-center" v-if="calculatorStore.settings.hasOT">
                    <p class="mr-4">OT</p>
                    <p class="">
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

    .no-print,
    .no-print * {
        display: none;
    }

    .print-header {
        display: flex;
    }

    .print-area,
    .print-area * {
        visibility: visible;
    }

    .print-area {
        display: flex;
        flex-direction: column;
    }

    * {
        fill: black !important;
        border-color: black !important;
        outline-color: black !important;
        background-color: white !important;
    }

    .totals-sum {
        visibility: visible;
    }

    .totals-sum * {
        visibility: visible;
        display: flex;
    }
}
</style>