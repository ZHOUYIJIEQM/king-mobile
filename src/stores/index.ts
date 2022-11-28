import { defineStore } from 'pinia'

// 攻略
export const strategyStore = defineStore('strategy', () => {
  // 英雄名称
  const heroName = ref<string>('')
  
  /**
   * 修改英雄名称
   * @param {string} name 英雄名称
   */
  function changeHeroName(name: string) {
    heroName.value = name
  }

  return {
    heroName,
    changeHeroName
  }
})
