<script setup lang="ts">
import { ref } from "vue"
import { useHead } from "@unhead/vue"

useHead({
  title: 'Meet Us – Time My Card',
  meta: [
    { name: 'description', content: 'Meet the team behind Time My Card. We build free payroll and timekeeping tools so small businesses can focus on what matters.' },
    { property: 'og:title', content: 'Meet Us – Time My Card' },
    { property: 'og:description', content: 'The team behind Time My Card and our mission to help small businesses.' },
    { property: 'og:url', content: 'https://timemycard.com/meet-us' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://timemycard.com/text_logo.webp' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [{ rel: 'canonical', href: 'https://timemycard.com/meet-us' }],
})

const message = ref("")
const contact = ref("")

const mode = ref("form")

const send = async (message: string, contact: string) => {
  mode.value = "sending"
  try {
    await fetch("https://mail.tomon.om/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: `Message from ${contact}`,
        text: `${message}\n${contact}`,
        html: `${message}<br />${contact}`,
        contact,
      }),
    })
    mode.value = "thanks"
    setTimeout(() => { mode.value = "form" }, 3000)
  } catch {
    mode.value = "form"
  }
}
</script>

<template>
  <div class="text-left text-lg max-w-3xl mx-auto font-serif">
    <h1 class="text-left font-bold italic mt-8">Our Misson</h1>
    <p class="text-left indent-8 mt-2">
      We believe in making the tools that small businesses need available at no
      cost, you're already getting squeezed from every which way and we want to
      help out in however we can. Our motto: "Unus pro omnibus" ("One for all") encapsulates our philosophy of casting
      out a proactive helping hand. Small
      businesses are
      the bedrock, foundation, and first floor of the economy. To us, helping
      them is the most important thing we can do. We work in defense of the
      American dream, for although most dreams occur in the dark; so does most
      stumbling, stubbing, and slipping, and we do not want your S Corp to sink.
    </p>

    <h1 id="meet-us" class="text-left font-bold italic mb-2 mt-8">Meet Us</h1>
    <div class="flex flex-row">
      <div class="inline-block mt-[70px]">
        <div style="shape-outside: circle(50%)" class="float-right">
          <img class="rounded-full w-56 h-56 object-cover mx-8" style="" src="/thomas-huber.webp" alt="" />
        </div>
        <p class="leading-7 text-left mt-[-70px] indent-8">
          <a class="font-semibold underline hover:text-link underline-offset-4" href='https://tomon.om'>Thomas
            Huber</a>
          holds a Bachelor's degree in Computer Science from Arizona State
          University and has had a deep, loving respect for the small business
          for the last 3 months. He is a remarkable individual, known for
          his accomplishments including,
          but not limited to: Time my Card. Although
          the public may know Thomas for his mavericity and Adonic features, it
          must be known that he posseses a deep and enigmatic pensivity beneath
          the superfluous mantle of his enrapturing charm. If you should happen to see him
          out-and-about ask not for a photo—<i>wait</i>—and his greatness is like to ask you
          for one, because no matter how utterly unremarkable you are, he will prospectively unearth
          some rare iota of worthfullness from far within. And take urgent
          heed, for the words he pronounces would multiply you, should you have
          the faculties to understand and the wisom to internalize them.
        </p>
      </div>
    </div>

    <h1 class="text-left font-bold italic mt-8">Reach Out</h1>
    <p class="text-left indent-8 mt-4 font-bold">Jobs</p>
    <p class="text-left indent-8">
      If you have experience in business or in payroll / HR, as well as writing;
      we would love to contract you for articles. Let's build something great
      together!
    </p>
    <p class="text-left indent-8 mt-4 font-bold">Invest</p>
    <p class="text-left indent-8">
      Time my Card is an aspiring multinational media conglomerate set on
      revolutionizing the global economy through an unseen coup of wealth.
      Would-be angel investors in this new Mali-esque Empire of gold should
      fill out the contact form below.
    </p>
    <div class="mt-8 font-serif text-base">
      <div v-if="mode == 'form'" class="flex flex-col">
        <textarea tabindex="1001" type="text" placeholder="Message" rows="2"
          class="p-2 placeholder:text-ink-faint resize-none h-48 text-base bg-paper-base border-ink-primary outline-ink-primary"
          v-model="message">
        </textarea>

        <input tabindex="1002" type="text" placeholder="Contact Information"
          class="p-2 w-full text-base mt-2 placeholder:text-ink-faint bg-paper-base border-ink-primary outline-ink-primary"
          v-model="contact" />

        <button tabindex="1004" class="place-self-end btn-primary mt-2" @click="() => {
          send(message, contact)
        }
        ">
          Send Message
        </button>
      </div>
      <div v-else-if="mode == 'sending'">
        <p class="text-center">Sending...</p>
      </div>
      <div v-else>
        <p class="text-center">Thanks!</p>
      </div>
    </div>
  </div>
</template>
