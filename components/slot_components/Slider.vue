<template>
  <section>
    <h1 class="text-2xl text-white font-semibold pb-2">
      <slot name="title"></slot>
    </h1>
    <div
      class="flex py-1 px-2 mb-10 scrollbar-thin overflow-x-scroll space-x-2 scrollbar-thumb-gray-400 scrollbar-track-netflixBg dark:scrollbar-thumb-blue-100 dark:scrollbar-track-gray-700"
    >
      <slot></slot>
    </div>
  </section>
</template>
