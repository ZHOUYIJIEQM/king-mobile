import { defineStore } from "pinia";

export const strategyStore = defineStore(
  'strategy', 
  {
    state: () => {
      return {
        // 被选中的英雄
        heroName: ''
      }
    },
    getters: { },
    actions: {
      changeHeroName(name: string) {
        this.heroName = name
      }
    }
  }
)