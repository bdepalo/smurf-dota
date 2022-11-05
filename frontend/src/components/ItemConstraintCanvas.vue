<template>
  <div class="py-3 flex flex-col">
    <div class="flex justify-center">
      322
<!--      <img src="./assets/322.PNG" class="max-w-md md:max-w-xl rounded-4xl"/>-->
    </div>
    <generate-build @build="getBuild"/>
    <div class="flex flex-row flex-wrap gap-3 justify-center">
      <item-constraint-selector v-for="item in itemStore.items" :item="item"
                                :constraint="itemStore?.constraints?.find(x => item.name === x.name) ?? {min: 0, max: 6, name: item.name}"
                                @max-="minusMax" @max+="plusMax" @min-="minusMin" @min+="plusMin"/>
    </div>
  </div>
</template>

<script lang="ts">
import {useItemStore} from "../stores/items";
import {mapActions} from "pinia";
import ItemConstraintSelector from "./ItemConstraintSelector.vue";
import GenerateBuild from "./GenerateBuild.vue";

export default {
  components: {ItemConstraintSelector, GenerateBuild},
  setup() {
    const itemStore = useItemStore();
    itemStore.fetchItems();
    return {itemStore}
  },
  name: "ItemConstraintCanvas",
  methods: {
    ...mapActions(useItemStore, ["fetchItems", "plusMax", "plusMin", "minusMax", "minusMin", "getBuild"]),
  }
}
</script>

<style scoped>

</style>