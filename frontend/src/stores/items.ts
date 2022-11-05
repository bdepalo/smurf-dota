import {defineStore} from "pinia";
import DotaItem from "../models/DotaItem";
import ItemConstraint from "../models/ItemConstraint";

export interface ItemsState {
  items: DotaItem[]
  constraints?: ItemConstraint[]
  build?: string
}

export const useItemStore = defineStore("items", {
  state: (): ItemsState => {
    return {
      constraints: [],
      items: [],
      build: "No build calculated yet!"
    };
  },
  getters: {
    getItems(): DotaItem[] {
      return this.items;
    }
  },
  actions: {
    async fetchItems() {
      let result = await fetch("https://rollterps.duckdns.org/smurf/api/items", {
        referrerPolicy: "origin-when-cross-origin",
        mode: "cors",
        method: 'GET'
      });

      let items = await result.json();

      for (let x of items) {
        this.addItem(x);
      }
    },
    addItem(item: DotaItem) {
      if (!item) return;

      this.items.push(item);

      if (this.constraints?.find(x => x.name == item.name)) {
      } else {
        this.constraints?.push({
          name: item.name,
          min: 0,
          max: 6
        })
      }
    },
    plusMin(itemName: string) {
      const constraint = this.constraints?.find(item => item.name === itemName);

      if (constraint) {
        constraint.min++;
        constraint.max = Math.max(constraint.max, constraint.min)
      }
    },
    plusMax(itemName: string) {
      const constraint = this.constraints?.find(item => item.name === itemName);

      if (constraint) {
        constraint.max++;
      }
    },
    minusMin(itemName: string) {
      const constraint = this.constraints?.find(item => item.name === itemName);

      if (constraint) {
        constraint.min = Math.max(constraint.min - 1, 0);
      }
    },
    minusMax(itemName: string) {
      const constraint = this.constraints?.find(item => item.name === itemName);

      if (constraint) {
        constraint.min = Math.max(Math.min(constraint.max - 1, constraint.min), 0)
        constraint.max = Math.max(constraint.max - 1, 0);
      }
    },
    async getBuild() {

      // convert to correct (dumb?) format for REST api
      let shipIt: Map<string, number[]> = new Map();
      this.constraints?.forEach((constraint) => shipIt.set(constraint.name, [constraint.min, constraint.max]))

      this.build = await fetch("https://rollterps.duckdns.org/smurf/api/random/with-cap", {
        referrerPolicy: "origin-when-cross-origin",
        mode: "cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shipIt)
      })
        .then(res => res.text())
    },

  },
  persist: {
    paths: ["constraints"]
  }
});