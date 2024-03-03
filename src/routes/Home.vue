<script setup lang="ts">
import EvergreenSnippets from '../components/EvergreenSnippets.vue';
import Testimonials from '../components/Testimonials.vue';
import TimeCardList from '../components/TimeCardList.vue'
</script>
<template>
  <h2 class="hidden">Calculator Form</h2>
  <TimeCardList />

  <div class="my-4 h-1 border-b-[1px] border-black dark:border-white"></div>

  <div class="flex flex-col-reverse md:flex-row font-serif place-content-around place-items-center md:place-items-start">
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
</template>
