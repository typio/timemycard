<script setup lang="ts">
import ArticleList from "../components/ArticleList.vue"
import { ref, defineAsyncComponent, markRaw } from "vue"
import { useHead } from "@unhead/vue"

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
})

if (!props.id) {
  useHead({
    title: 'Articles – Time My Card',
    meta: [
      { name: 'description', content: 'Articles on payroll, employee compensation, overtime, and small business management from the Time My Card team.' },
      { property: 'og:title', content: 'Articles – Time My Card' },
      { property: 'og:description', content: 'Articles on payroll, compensation, and small business management.' },
      { property: 'og:url', content: 'https://timemycard.com/articles' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://timemycard.com/text_logo.webp' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [{ rel: 'canonical', href: 'https://timemycard.com/articles' }],
  })
}

const dynamicComponent = ref(null)

if (props.id) {
  dynamicComponent.value = markRaw(
    defineAsyncComponent(() => import(`../blog/${props.id}.vue`)),
  )
}
</script>

<template>
  <ArticleList v-if="!props.id" />
  <component v-else :is="dynamicComponent" />
</template>
