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

            <TimeCardList />

            <div class="my-4 h-1 border-b-[1px] border-black dark:border-white"></div>

            <div class="flex flex-col-reverse md:flex-row font-serif place-content-around">
                <div class="md:w-1/2">
                    <EvergreenSnippets />
                </div>


                <div class="md:w-1/2 max-w-lg">
                    <div class="md:my-8 px-4">
                        <Testimonials />
                    </div>

                    <!-- TimeCard Right -->
                    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9012705634493266"
                        data-ad-slot="2538534477" data-ad-format="auto" data-full-width-responsive="true"></ins>
                </div>
            </div>
        </div>
    </div>

    <footer class=" text-sm mt-12 py-6 px-4  font-serif border-t-[1px] w-[100vw]">
        <div class="max-w-5xl mx-auto flex flex-col md:flex-row place-items-center md:place-items-end place-content-between">
            <p>Contact <a tabindex="-1"  href="mailto:me@tohuber.com" class="hover:underline underline-offset-2">me@tohuber.com</a> for
                questions.</p>

            <div class="flex flex-col place-items-center md:place-items-end">
                <a tabindex="-1"  class="my-4 md:mb-1 hover:underline underline-offset-2 " href="https://github.com/typio/time-my-card">Source
                    code</a>
                <p>
                    © {{ Math.max(new Date().getFullYear(), 2023) }} by <a tabindex="-1"  href="https://tohuber.com"
                        class="hover:underline underline-offset-2">Thomas Huber</a>
                </p>
            </div>
        </div>

    </footer>
</template>

