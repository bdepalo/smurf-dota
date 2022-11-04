<template>
  <div class="grid grid-cols-4 p-2 bg-gray rounded-4xl">
    <div class="col-span-full text-gray-dark font-bold text-xl">
      {{ item.name }}
    </div>
    <div class="flex flex-col m-2">
      <div class="text-gray-dark font-bold uppercase">min</div>
      <button @click="$emit('min+',item.name)" class="bg-blue">
        +
      </button>
      <div class="text-gray-dark font-extrabold text-xl">{{ constraint.min }}</div>
      <button @click="$emit('min-',item.name)" class="bg-blue">
        -
      </button>

    </div>
    <div class="flex flex-grow col-span-2 p-2.5">
      <img :src="item.image" referrerPolicy="no-referrer" :alt="item.name"/>
    </div>
    <div class="flex flex-col m-2">
      <div class="text-gray-dark font-bold uppercase">max</div>
      <button @click="$emit('max+',item.name)" class="bg-blue">
        +
      </button>
      <div class="text-gray-dark font-extrabold text-xl">{{ constraint.max }}</div>
      <button @click="$emit('max-',item.name)" class="bg-blue">
        -
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import DotaItem from "../models/DotaItem";
import ItemConstraint from "../models/ItemConstraint";
import {defineComponent, PropType} from "vue";
import {useItemStore} from "../stores/items";

export default defineComponent({
  props: {
    item: {type: Object as PropType<DotaItem>, required: true},
    constraint: {type: Object as PropType<ItemConstraint>, required: true}
  },
  setup() {
    const itemStore = useItemStore();
    return {itemStore}
  },
  emits: ["max+", "max-", "min+", "min-"],
  name: "ItemConstraintSelector",
})
</script>

<style scoped>

</style>