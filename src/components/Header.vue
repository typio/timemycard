<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TextLogo from './TextLogo.vue'
import DarkModeToggle from './DarkModeToggle.vue'
import { calculatorStore } from '../stores/calculatorStore'

const route = useRoute()

const navRoutes = ['/', '/articles']

const linkClassObject = (path: string) => {
  const routePrimaryPath = `/${route.path.split('/')[1]}`

  const isActive = computed(
    () =>
      routePrimaryPath === path ||
      (!navRoutes.includes(routePrimaryPath) && path === '/')
  )
  return {
    'flex tracking-wide': true,
    'font-serif text-base italic': isActive.value,
    'font-sans font-semibold text-ink-primary text-xs': !isActive.value
  }
}
</script>

<template>
  <div class="no-print border-ink-primary">
    <div
      class="flex flex-row justify-between text-sm font-serif border-b-[3px] border-double"
    >
      <div class="w-16"></div>

      <router-link
        tabindex="-1"
        to="/"
        class="mt-4 mb-2 lg:my-0"
        aria-label="time my card logo"
      >
        <h1
          class="flex flex-wrap lg:flex-nowrap flex-col lg:flex-row items-center lg:items-baseline justify-between lg:gap-8 text-sm font-serif italic"
        >
          <TextLogo
            alt="Time My Card"
            class="order-1 lg:order-2 mt-4 relative mb-4 lg:mb-0 lg:top-[22px] w-44 md:w-48 lg:w-64"
          />
          <span class="basis-full md:basis-auto order-2 lg:order-1"
            >Free time card calculator</span
          >
          <span class="basis-full md:basis-auto order-3"
            >with overtime, breaks, & printing</span
          >
        </h1>

        <!-- <h1 class="flex flex-wrap items-baseline justify-center lg:flex-nowrap"> -->
        <!--    <span class="">Free time card calculator</span> -->
        <!--    <TextLogo class="basis-full md:basis-full lg:basis-auto order-1 lg:order-2" /> -->
        <!--    <span class="">with overtime, breaks, & printing</span> -->
        <!--  </h1> -->
      </router-link>
      <DarkModeToggle />
    </div>

    <div
      class="flex flex-row justify-center lg:justify-between items-baseline border-b-[3px] uppercase border-double py-1 text-sm underline-offset-2 leading-4"
    >
      <span class="hidden lg:inline font-serif uppercase items-baseline">
        {{
          (calculatorStore.date !== ''
            ? new Date(calculatorStore.date)
            : new Date()
          ).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
          })
        }}
      </span>

      <div class="flex flex-row gap-2 items-baseline">
        <router-link to="/" :class="linkClassObject('/')">
          <p><span class="hidden sm:inline">Time Card</span> Calculator</p>
        </router-link>
        ·
        <router-link to="/articles" :class="linkClassObject('/articles')">
          Articles
        </router-link>
      </div>
    </div>
  </div>
</template>
