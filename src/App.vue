<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <div class="px-[3%] font-serif text-center bg-paper-base text-ink-primary">
    <div class="min-h-[100vh]">
      <Header />
      <router-view :key="$route.path"></router-view>
    </div>
  </div>

  <footer class="px-[3%] text-sm mt-3 font-serif italic w-full">
    <p class="text-center border-t-[3px] py-3 border-double">
      © {{ Math.max(new Date().getFullYear(), 2023) }}
      <a
        tabindex="-1"
        href="https://tomon.om"
        class="hover:underline underline-offset-2"
        >Thomas Huber</a
      >
    </p>
  </footer>
</template>
