<script setup lang="ts">
import EvergreenSnippets from './components/EvergreenSnippets.vue';
import Header from './components/Header.vue';
import Testimonials from './components/Testimonials.vue';
import TimeCardList from './components/TimeCardList.vue'
</script>

<template>
  <div class="px-[3%] text-center bg-white dark:bg-black text-black dark:text-white transition-colors">
    <div class="min-h-[100vh]">
      <Header />

      <h2 class="hidden">Calculator Form</h2>
      <TimeCardList />

      <div class="my-4 h-1 border-b-[1px] border-black dark:border-white"></div>

      <div
        class="flex flex-col-reverse md:flex-row font-serif place-content-around place-items-center md:place-items-start">
        <div class="md:w-1/2">
          <h2 class="hidden">About</h2>
          <EvergreenSnippets />
        </div>


        <div class="md:w-1/2 max-w-lg">
          <h2 class="hidden">Testimonials</h2>
          <div class="md:my-8 px-4">
            <Testimonials />
          </div>

          <!-- TimeCard Right -->
          <!-- <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9012705634493266"
            data-ad-slot="2538534477" data-ad-format="auto" data-full-width-responsive="true"></ins> -->
        </div>
      </div>
    </div>
  </div>

  <footer class="text-sm mt-12 py-6 px-4  font-serif border-t-[1px] w-full">
        <p class="text-center">
          © {{ Math.max(new Date().getFullYear(), 2023) }} <a tabindex="-1" href="https://tohuber.com"
            class="hover:underline underline-offset-2">Thomas Huber</a>
        </p>

  </footer>
</template>

