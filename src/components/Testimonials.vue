<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const testimonials = [
    {
        body: `I used to dread payroll days, but not anymore, I can't emphasize enough how much time this tool has saved me. The accuracy is spot on every time!`,
        author: `Taylor C., Small Business Owner`
    },
];

const testimonialI = ref(Math.floor(Math.random() * (testimonials.length - 1)))

onMounted(() => {
    console.log(`the component is now mounted.`)

    setInterval(() => {
        testimonialI.value = (testimonialI.value + 1) % testimonials.length
        console.log(testimonials[testimonialI.value].author)
    }, 5000)
})

</script>

<template>
    <div class="flex my-16 flex-col place-content-center">
        <Transition name="slide" mode="out-in">
            <div class="h-28 overflow-hidden h- w-[100%]" :key=testimonialI>
                <div>
                    <p class="text-base text-zinc-900">{{ testimonials[testimonialI].body }}</p>
                    <h6 class="text-zinc-600 font-sans text-sm uppercase font-bold mt-2">{{ testimonials[testimonialI].author }}</h6>
                </div>
            </div>
        </Transition>
        <button href="" class="py-2 px-4 place-self-center border-[1px] border-black ">Add Your Comment</button>
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
    opacity: .3;
    transform: translateX(25%) rotateY(90deg);
}
</style>