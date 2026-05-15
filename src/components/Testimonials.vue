<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue"

const testimonials = [
  {
    body: `I used to dread payroll days, but not anymore. I can't emphasize enough how much time this tool has saved me. The accuracy is spot on every time.`,
    author: `Taylor C., Small Business Owner`,
  },
  {
    body: `This software is so user friendly! And it saves us money on 3rd party payroll costs.`,
    author: `Carmen H.`,
  },
  {
    body: `THE BEST CALCULATOR APP`,
    author: `April W., Counselor`
  }
]

const testimonialI = ref(Math.floor(Math.random() * (testimonials.length - 1)))

let intervalId

onMounted(() => {
  intervalId = setInterval(() => {
    testimonialI.value = (testimonialI.value + 1) % testimonials.length
  }, 7000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const mode = ref("display")

const message = ref("")
const name = ref("")
const role = ref("")

const post = async (message: string, name: string, role: string) => {
  try {
    await fetch("https://mail.tomon.om/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: `Comment from ${name}`,
        text: `${message}\n${name} ${role}`,
        html: `${message}<br />${name}, ${role}`,
        contact: name,
      }),
    })
  } catch {}
  mode.value = "display"
}
</script>

<template>
  <div
    class="flex my-4 flex-col place-content-center border-[1px] p-4 relative"
  >
    <div v-if="mode == 'display'">
      <Transition name="slide" mode="out-in">
        <div
          class="h-36 flex flex-col justify-center overflow-hidden w-[100%] place-items-center"
          :key="testimonialI"
        >
            <p class="text-base text-ink-primary">
              {{ testimonials[testimonialI].body }}
            </p>
            <p
              class="text-ink-muted font-sans text-sm uppercase font-bold mt-2"
            >
              {{ testimonials[testimonialI].author }}
            </p>
        </div>
      </Transition>
      <button
        tabindex="-1"
        class="place-self-center btn-primary"
        @click="mode = 'post'"
      >
        Add Your Comment
      </button>
    </div>
    <div v-else class="flex flex-col pt-9 gap-2 font-sans text-sm">
      <button
        tabindex="1000"
        href=""
        class="h-10 w-10 p-0 place-self-center btn-primary absolute top-[-1px] left-[-1px]"
        @click="mode = 'display'"
      >
        ×
      </button>

      <textarea
        tabindex="1001"
        type="text"
        placeholder="Comment"
        rows="2"
        class="p-2 placeholder:text-ink-faint bg-paper-base border-ink-primary outline-ink-primary"
        v-model="message"
      >
      </textarea>
      <div class="flex flex-row gap-2">
        <input
          tabindex="1002"
          type="text"
          placeholder="Name"
          class="p-1 w-full pl-1 text-center placeholder:text-ink-faint bg-paper-base border-ink-primary outline-ink-primary"
          v-model="name"
        />
        <input
          tabindex="1003"
          type="text"
          placeholder="Role"
          class="p-1 w-full pl-1 text-center placeholder:text-ink-faint bg-paper-base border-ink-primary outline-ink-primary"
          v-model="role"
        />
      </div>

      <button
        tabindex="1004"
        class="place-self-center btn-primary mt-2"
        @click="
          () => {
            post(message, name, role)
          }
        "
      >
        Post
      </button>
    </div>
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}

.slide-enter-from {
  opacity: 0.3;
  transform: translateX(-25%) rotateY(90deg);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0px);
}

.slide-leave-to {
  opacity: 0.3;
  transform: translateX(25%) rotateY(90deg);
}
</style>
