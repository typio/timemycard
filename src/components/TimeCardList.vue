<script setup lang="ts" >
import TimeCard from "./TimeCard.vue"
import { calculatorStore } from '../stores/calculatorStore.ts'
</script>

<template >
    <div class="bg-pink-200 px-[3%]">
        <div class="flex flex-row" v-for="(_, cardI) in calculatorStore?.timeCards">
            <TimeCard :card-i="cardI" />
        </div>
    </div>
</template>