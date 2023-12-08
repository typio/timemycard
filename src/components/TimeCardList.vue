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
    calculatorStore.timeCards.flatMap(card => card.days.map(day => calculateTime(day.in, day.out, calculatorStore.settings.minHoursPerDay, calculatorStore.settings.hasOT ? calculatorStore.settings.OTHours : undefined)))
)

const computedTotalWithoutOTHours = computed(() =>
    computedHours.value.reduce((a, c) => (a ?? 0) + (c?.withoutOT ?? 0), 0))
const computedTotalOTHours = computed(() =>
    computedHours.value.reduce((a, c) => (a ?? 0) + (c?.OT ?? 0), 0))
</script>

<template >
    <div class="mt-8 max-w-5xl mx-auto">
        <div class="no-print">
            <div class="flex flex-row justify-between ">
                <button
                    class="py-2 px-4 border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black "
                    @click="calculatorStore.clearFields()">
                    Clear Fields
                </button>
                <div class="flex flex-row gap-6">
                    <button
                        class="w-36 py-2 px-4 border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black "
                        @click="calculatorStore.addWeek()">
                        Add Week
                    </button>
                    <button
                        class="w-36 py-2 px-4 border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black "
                        @click="calculatorStore.removeWeek()">
                        Remove Week
                    </button>
                </div>
                <button
                    class="py-2 px-4 border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black "
                    @click="printPage">
                    Print
                </button>
            </div>

            <div class="flex flex-row justify-around mt-4">
                <div class="flex flex-row place-items-center justify-center w-1/3">
                    <label class="mr-4" for="daysPerWeek">Days per Week</label>
                    <input class="w-11 bg-white dark:bg-black dark:border-white dark:outline-white" type="number"
                        id="daysPerWeek" min="1" max="7" :value="calculatorStore.timeCards[0]?.days.length"
                        @input="calculatorStore.setDaysPerWeek(($event?.target as HTMLInputElement).value)">
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
                    <select class="w-28 bg-white dark:bg-black dark:border-white dark:outline-white" name="" id="firstDay"
                        v-model="calculatorStore.settings.firstDay">
                        <option v-for="(day, dayI) in daysOfWeek[calculatorStore.settings.dayNames]" :value="dayI">
                            {{ day }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="flex flex-row justify-around place-items-center mt-4 h-8">
                <div class="flex flex-row w-2/3 ">


                    <div class="flex flex-row w-1/2 justify-center place-items-center">
                        <label class="select-none mr-4" for="minHours">Minimum Daily Hours</label>
                        <input class="w-11 bg-white dark:bg-black dark:border-white dark:outline-white" type="number"
                            id="minHours" :value="calculatorStore.settings.minHoursPerDay" max="24"
                            @input="calculatorStore.settings.minHoursPerDay = Math.abs(parseFloat(($event?.target as HTMLInputElement)?.value) || 0)">
                    </div>

                    <div class="flex flex-row w-1/2 place-items-center place-content-center">
                        <label class="select-none mr-4" for="hasOT">OT</label>
                        <input
                            class="bg-white dark:bg-black dark:border-white dark:outline-white shadow-black dark:shadow-white"
                            type="checkbox" id="hasOT" v-model="calculatorStore.settings.hasOT">
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="flex flex-row place-items-center " v-if="calculatorStore.settings.hasOT">
                        <label class="select-none mr-4" for="hoursBeforeOT">Daily Hours before OT</label>
                        <input class="w-11  bg-white dark:bg-black dark:border-white dark:outline-white" id="hoursBeforeOT"
                            type="number" :value="calculatorStore.settings.OTHours" max="24" min="1"
                            @input="calculatorStore.settings.OTHours = Math.abs(parseFloat(($event?.target as HTMLInputElement)?.value) || 1)">
                    </div>
                </div>
            </div>
            <div class="flex flex-row  place-items-center mt-4 h-8">
                <div class="flex flex-row w-1/2 place-items-center place-content-center">
                    <label class="select-none mr-4" for="h24">24 Hour Time</label>
                    <input
                        class="bg-white dark:bg-black dark:border-white dark:outline-white shadow-black dark:shadow-white"
                        type="checkbox" id="h24" v-model="calculatorStore.settings.h24">
                </div>

                <div class="flex flex-row w-1/2 justify-center place-items-center">
                    <button
                        class="py-2 px-4 w-52 border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black "
                        @click="calculatorStore.settings.showHM = !calculatorStore.settings.showHM">
                        {{ calculatorStore.settings.showHM ? "Decimal Time Format" : "hh:mm Time Format" }}
                    </button>
                </div>

            </div>
        </div>

        <div class="no-print my-4 h-1 border-b-[1px] border-black dark:border-white"></div>

        <div class="no-print flex flex-col font-serif">
            <div class="flex flex-row">
                <label class="w-16 text-left" for="name">Name</label>
                <input class="w-56 pl-1 bg-white dark:bg-black dark:border-white dark:outline-white" type="text" id="name"
                    v-model="calculatorStore.name">
            </div>
            <div class="flex flex-row mt-2">
                <label class="w-16 text-left" for="name" id="date">Date</label>
                <input class="w-56 bg-white dark:bg-black dark:border-white dark:outline-white" type="date"
                    id="" v-model="calculatorStore.date">
            </div>
        </div>

        <div class="print-area">
            <div class="text-left hidden print-header flex-col border-b-[3px] border-double ">
                <div class="w-1/6 flex mx-auto object-contain">
                    <TextLogo />
                </div>
                <div class="font-serif">
                    <p v-if="calculatorStore.name">{{ calculatorStore.name }}</p>
                    <p v-if="calculatorStore.date">{{ new Date(calculatorStore.date).toLocaleDateString(undefined, {
                        timeZone:
                            'UTC'
                    }) }}</p>
                </div>
            </div>
            <div class="mt-4" v-for="(_, cardI) in calculatorStore?.timeCards">
                <TimeCard :card-i="cardI" />
            </div>

            <div class="mt-4 border-[1px]">
                <div class="my-4 max-w-lg mx-auto flex flex-row  place-content-evenly ">
                    <div class="flex flex-row place-items-center">
                        <p class="mr-4 font-serif ">Total</p>
                        <p>
                            {{ calculatorStore.settings.showHM ?
                                decimalToHM(computedTotalWithoutOTHours + computedTotalOTHours) :
                                (computedTotalWithoutOTHours + computedTotalOTHours)?.toFixed(2)
                            }}
                        </p>
                    </div>
                    <div class="flex flex-row place-items-center" v-if="calculatorStore.settings.hasOT">
                        <p class="mr-4 font-serif ">Regular</p>
                        <p>
                            {{ calculatorStore.settings.showHM ?
                                decimalToHM(computedTotalWithoutOTHours) :
                                (computedTotalWithoutOTHours)?.toFixed(2)
                            }}
                        </p>
                    </div>
                    <div class="flex flex-row place-items-center" v-if="calculatorStore.settings.hasOT">
                        <p class="mr-4 font-serif">OT</p>
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

    .no-print, .no-print * {
        display: none;
    }

    .print-header {
        display: flex;
    }

    .print-area,
    .print-area * {
        visibility: visible;

    }

    * {
        fill: black !important;
        border-color: black !important;
        outline-color: black !important;
        background-color: white !important;
    }

    .print-area {

    }
}
</style>