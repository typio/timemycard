<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import TextLogo from "./TextLogo.vue"
import DarkModeToggle from "./DarkModeToggle.vue"

const route = useRoute()

const linkClassObject = (path) => {
  const isActive = computed(() => route.path === path)
  return {
    "flex font-medium	items-center justify-center w-1/3 hover:underline": true,
    "text-zinc-500": isActive.value,
    "text-black": !isActive.value,
    "dark:text-zinc-500": isActive.value,
    "dark:text-white": !isActive.value,
  }
}
</script>

<template>
  <div
    class="no-print w-full border-black dark:border-white border-b-[1px] pb-[2px]"
  >
    <div
      class="font-serif h-32 flex flex-row border-b-[1px] place-content-center place-items-center"
    >
      <div
        class="flex flex-row place-items-start w-full justify-between text-sm"
      >
        <DarkModeToggle />
        <router-link
          tabindex="-1"
          to="/"
          class="w-32 md:w-56 mb-2 md:mt-6 place-self-end"
          aria-label="time my card logo"
        >
          <TextLogo />
          <h1 class="hidden">Time My Card</h1>
        </router-link>
        <div class="w-16"></div>
      </div>
    </div>

    <div
      class="flex flex-row justify-around border-b-[1px] border-double h-12 text-sm underline-offset-2"
    >
      <router-link to="/articles" :class="linkClassObject('/articles')">
        Articles
      </router-link>
      <router-link to="/" :class="linkClassObject('/')">
        <p><span class="hidden sm:inline">Time Card</span> Calculator</p>
      </router-link>
      <router-link to="/meet-us" :class="linkClassObject('/meet-us')">
        Meet Us
      </router-link>
    </div>
  </div>
</template>
