<script setup lang="ts">
import Header from './components/Header.vue';
import TimeCardList from './components/TimeCardList.vue'
</script>

<template>
  <div class="px-[3%] text-center bg-white dark:bg-black text-black dark:text-white transition-colors">
    <div class="min-h-[100vh]">
      <Header />

      <TimeCardList />

    </div>
    <footer class="flex place-items-center place-content-center">
      <p class="py-6 text-sm">
        © {{ Math.max(new Date().getFullYear(), 2023) }} Thomas Huber
      </p>
    </footer>
  </div>
</template>

