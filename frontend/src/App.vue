<script setup lang="ts">
</script>

<template>
  <div class="flex flex-grow flex-col max-w-md md:max-w-7xl">
    <div class="font-bold uppercase bg-gray-light text-gray-dark">header</div>
    <router-view/>
    <div class="font-bold uppercase bg-gray-light text-gray-dark">footer</div>
  </div>
</template>

<style scoped>
</style>
