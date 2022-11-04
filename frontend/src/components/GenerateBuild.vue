<template>
  <div id="xcar" class="flex flex-row-reverse my-5 p-4 bg-purple rounded-full">
    <div class="ml-auto mr-4">
      <button @click="$emit('build')" class="bg-blue font-bold text-lg">
        Generate Build
      </button>
    </div>
    <div>
      <p class="text-lg mr-auto ml-4">{{ itemStore.build }}</p>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useItemStore} from "../stores/items";

export default defineComponent({
  setup() {
    const itemStore = useItemStore();
    return {itemStore}
  },
  emits: ["build"],
  name: "ItemConstraintSelector",
})
</script>

<style scoped>

</style>