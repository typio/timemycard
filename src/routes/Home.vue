<script setup lang="ts">
import { useHead } from '@unhead/vue'
import EvergreenSnippets from '../components/EvergreenSnippets.vue';
import Testimonials from '../components/Testimonials.vue';
import TimeCardList from '../components/TimeCardList.vue'

useHead({
  title: 'Free Time Card Calculator – Calculate Work Hours & Overtime',
  meta: [
    { name: 'description', content: 'Free online time card calculator with overtime, breaks, and printing. Calculate weekly, biweekly, or monthly work hours instantly. No signup — your data never leaves your computer.' },
    { name: 'robots', content: 'index,follow,max-image-preview:large' },
    { property: 'og:title', content: 'Free Time Card Calculator – Calculate Work Hours' },
    { property: 'og:description', content: 'Free online time card calculator with overtime, breaks, and printing. No signup required.' },
    { property: 'og:url', content: 'https://timemycard.com/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://timemycard.com/text_logo.webp' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Free Time Card Calculator – Calculate Work Hours' },
    { name: 'twitter:description', content: 'Free online time card calculator with overtime, breaks, and printing.' },
    { name: 'twitter:image', content: 'https://timemycard.com/text_logo.webp' },
  ],
  link: [{ rel: 'canonical', href: 'https://timemycard.com/' }],
  script: [{
    type: 'application/ld+json',
    textContent: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Time My Card - Free Time Card Calculator",
      "url": "https://timemycard.com",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any (Web)",
      // "aggregateRating": {
      //   "@type": "AggregateRating",
      //   "ratingValue": 5,
      //   "ratingCount": 3
      // },
      "offers": {
        "@type": "Offer",
        "price": 0,
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Time My Card",
        "url": "https://timemycard.com",
        "logo": "https://timemycard.com/text_logo.webp"
      }
    }
  }]
})
</script>

<template>
  <h2 class="hidden">Calculator Form</h2>
  <TimeCardList />

  <div class="my-4 h-1 border-b-[1px] border-ink-primary"></div>

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
</template>
