<script setup lang="ts">
import { ref } from "vue"
import { db } from "./../stores/firebaseStore"
import { collection, addDoc } from "firebase/firestore"

const message = ref("")
const contact = ref("")

const mode = ref("form")

const send = async (message, contact) => {
  mode.value = "sending"
  await addDoc(collection(db, "mail"), {
    to: "me@tohuber.com",
    message: {
      subject: `Time My Card message from ${contact}`,
      text: `${message}\n${contact}`,
      html: `${message}<br />${contact}`,
    },
  }).then(() => {
    mode.value = "thanks"
    setTimeout(() => {
      mode.value = "form"
    }, 3000)
  })
}
</script>

<template>
  <div class="text-left text-lg max-w-3xl mx-auto font-serif">
    <h1 class="text-left font-bold italic mt-8">Our Misson</h1>
    <p class="text-left indent-8 mt-2">
      We believe making the tools that small businesses need available at no
      cost. Our motto: "Unus pro omnibus" ("One for all") encapsulates our
      philosophy of casting out a proactive helping hand. Small businesses are
      the bedrock, foundation, and first floor of the economy. To us, helping
      them is the most important thing we can do. We work in defense of the
      American dream, for although most dreams occur in the dark; so does most
      stumbling, stubbing, and slipping, and we do not want your S Corp to sink.
    </p>
    <p class="text-left indent-8 mt-2">
      Our company is maximumly diverse, featuring no more than one individual
      from any race, gender identity, or sexual orientation.
    </p>
    <p class="text-left indent-8 mt-2">
      Our website may lack color but our blood runs green! We are proud to be
      low-carbon and near-zero-waste. To-date we are elated to have splilled
      fewer than several tons of unrefined crude oil into natural ecosystems.
    </p>

    <h1 id="meet-us" class="text-left font-bold italic mb-2 mt-8">Meet Us</h1>
    <div class="flex flex-row">
      <div class="inline-block mt-[70px]">
        <div style="shape-outside: circle(50%)" class="float-right">
          <img
            class="rounded-full w-56 h-56 object-cover mx-8"
            style=""
            src="/thomas-huber.webp"
            alt=""
          />
        </div>
        <p class="leading-7 text-left mt-[-70px] indent-8">
          <span class="font-semibold underline underline-offset-4"
            >Thomas Huber</span
          >
          earned a Bachelor's degree in Computer Science from Arizona State
          University and has worked as the payroll manager of a small business
          for the past 5 years. He is a remarkable individual, known for his
          accomplishments including, but not limited to: Time my Card. Although
          the public may know Thomas for his wild antics and Adonic features, it
          must be known that he posseses a deep and enigmatic pensivity beneath
          the mantle of his enrapturing charm. If you should happen to see him
          out-and-about ask not for a photo—wait, and his greatness will ask you
          for one, because no matter how lowly you are, he will unearth and love
          each rare morsel of the worthfullness you retain. And take immediate
          heed, for the words he pronounces would multiply you, should you have
          the faculties to understand them. He is not a man we could hope to be,
          but perhaps, we can lay a dream; that we may immitate a reflection, of
          his dog's shadow, as seen looking out through a splintered window
          across a foggy, night street.
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
      Would-be angel investors in this new Mali-esque kingdom of gold should
      fill out the contact form below and they shall be gifted a secured
      existance in the future world-order.
    </p>
    <p class="text-left indent-8 mt-4">Please send us a message!</p>
    <div class="mt-4 font-serif text-base">
      <div v-if="mode == 'form'" class="flex flex-col">
        <textarea
          tabindex="1001"
          type="text"
          placeholder="Message"
          rows="2"
          class="p-2 placeholder:text-zinc-400 resize-none h-48 text-base dark:placeholder:text-zinc-600 bg-white dark:bg-black dark:border-white dark:outline-white"
          v-model="message"
        >
        </textarea>

        <input
          tabindex="1002"
          type="text"
          placeholder="Contact Information"
          class="p-2 w-full text-base mt-2 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 bg-white dark:bg-black dark:border-white dark:outline-white"
          v-model="contact"
        />

        <button
          tabindex="1004"
          class="place-self-end btn-primary mt-2"
          @click="
            () => {
              send(message, contact)
            }
          "
        >
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
