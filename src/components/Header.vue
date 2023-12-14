<script lang="ts" setup>
import TextLogo from "./TextLogo.vue";
import DarkModeToggle from "./DarkModeToggle.vue"
</script>

<template>
    <div
        class="no-print font-serif w-full h-32 flex flex-row border-b-[3px]  border-black dark:border-white border-double place-content-center place-items-center">
        <div class="flex flex-row place-items-end w-full justify-around text-sm">
            <DarkModeToggle />
            <a tabindex="-1"  class="w-56 mt-6" href="https://timemycard.com" aria-label="time my card logo">
                <TextLogo />
            </a>
            <div class="w-16"></div>
        </div>
    </div>
</template>
