<script setup>
defineProps({ src: { type: String, required: true }, title: String })
const base = import.meta.env.BASE_URL
</script>

<template>
  <img class="adapt-er-artwork" :src="`${base}slides/${src}`" :alt="title" draggable="false" />
</template>

<style scoped>
.adapt-er-artwork { display: block; width: 100%; height: 100%; object-fit: contain; background: white; user-select: none; }
</style>
