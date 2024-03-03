<script setup lang="ts">
import blogIndex from "../blog/blogIndex.json"
</script>

<template>
  <ul class="mt-8 flex flex-row flex-wrap gap-4 justify-around font-serif">
    <li v-for="post in blogIndex.posts" class="group flex max-w-xs h-96 border">
      <router-link
        v-if="!post.preview"
        :to="'articles/' + post.id"
        class="flex flex-col"
      >
        <img
          :src="post.img_path"
          alt="post.img_alt"
          class="object-cover h-56"
        />
        <div class="flex flex-col flex-grow px-4">
          <h1 class="mt-4 mb-2 text-lg group-hover:underline">
            {{ post.title }}
          </h1>
          <h2 class="text-sm">{{ post.description }}</h2>
          <h3 class="text-xs font-sans font-semibold text-right mt-auto p-2">
            {{ new Date(post?.date ?? 0).toLocaleDateString() }}
          </h3>
        </div>
      </router-link>
      <div v-else :to="'articles/' + post.id" class="flex flex-col">
        <img
          :src="post.img_path"
          alt="post.img_alt"
          class="object-cover h-56"
        />
        <div class="flex flex-col flex-grow px-4">
          <h1 class="mt-4 mb-2 text-lg">
            {{ post.title }}
          </h1>
          <h2 class="text-sm">{{ post.description }}</h2>
          <div class="flex flex-row justify-between mt-auto">
            <h3
              class="text-xs font-sans font-semibold text-right p-2 uppercase"
            >
              PREVIEW
            </h3>
            <h3 class="text-xs font-sans font-semibold text-right p-2">
              IN PROGRESS
            </h3>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
