<script setup lang="ts">
import ArticleList from "../components/ArticleList.vue"
import { ref, defineAsyncComponent, markRaw } from "vue"

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
})

const dynamicComponent = ref(null)

dynamicComponent.value = markRaw(
  defineAsyncComponent(() => import(`../blog/${props.id}.vue`)),
)
</script>

<template>
  <ArticleList v-if="!props.id" />
  <component v-else :is="dynamicComponent" />
</template>
