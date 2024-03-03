<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<template>
  <div class="px-[3%] text-center bg-white dark:bg-black text-black dark:text-white transition-colors">
    <div class="min-h-[100vh]">
      <Header />
      <router-view></router-view>
    </div>
  </div>

  <footer class="text-sm mt-12 py-6 px-4  font-serif border-t-[1px] w-full">
    <p class="text-center">
      © {{ Math.max(new Date().getFullYear(), 2023) }} <a tabindex="-1" href="https://tohuber.com"
        class="hover:underline underline-offset-2">Thomas Huber</a>
    </p>
  </footer>
</template>
