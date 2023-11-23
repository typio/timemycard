<script lang="ts" setup>
import { ref } from 'vue';

const isDarkMode = ref(document.documentElement.classList.contains('dark'))

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark'
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light'
    }
}
</script>

<template>
    <button class="w-16 h-16" @click="toggleDarkMode">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" :class="{ 'dark-mode': isDarkMode }">
            <mask id="moon-mask">
                <rect x="0" y="0" width="100" height="100" class="fill-white" />
                <circle :cx="isDarkMode ? 0 : 35" :cy="isDarkMode ? 0 : 32" r="30"
                    class="fill-black transition-all duration-500" />
            </mask>

            <circle cx="50" cy="50" r="30" class="fill-black dark:fill-white" mask="url(#moon-mask)" />
        </svg>
    </button>
</template>

<style>
.circle {
    transition: cx 0.5s ease, cy 0.5s ease;
}
</style>