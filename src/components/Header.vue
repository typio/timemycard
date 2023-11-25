<script lang="ts" setup>
import TextLogo from "./TextLogo.vue";
import DarkModeToggle from "./DarkModeToggle.vue"
</script>

<template>
    <div
        class="no-print w-full h-32 flex flex-row border-b-[3px]  border-black dark:border-white border-double place-content-center place-items-center">
        <div class="flex flex-row place-items-end w-full justify-around text-sm">
            <DarkModeToggle />
            <a class="w-56 mt-6" href="https://timemycard.com">
                <TextLogo />
            </a>
            <a class="w-16 mb-4 hover:underline underline-offset-2" href="https://github.com/typio/time-my-card">Source</a>
        </div>
    </div>
</template>
