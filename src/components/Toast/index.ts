import { h, render } from 'vue'
import type { RendererNode } from "vue"
import type { ToastType } from '@/models/toast'
import ToastComp from './index.vue'

// 外层容器
const container: HTMLDivElement = document.createElement("div")
const body: HTMLBodyElement | null = document.querySelector("body")
// toast 定时器
let toastTimer: null | number = null
// 清除节点定时器
let removeTimer: null | number = null

/**
 * toast 提示
 * @class Toast
 */
class Toast {
  private animationTime: number
  private duration: number
  private toastEl: RendererNode | null
  private msg: string
  private className: string | string []
  
  /**
   * @param {ToastType} toastObject toast参数
   * msg: 提示信息, className: 自定义类名, duration: 提示时长
   */
  constructor(toastObject: ToastType) {
    // 动画持续时间 500ms
    this.animationTime = 500
    // 提示内容
    this.msg = toastObject.msg
    // 自定义样式类名
    this.className = toastObject.className || ''
    // 默认提示时长
    this.duration = toastObject.duration || 2000
    this.toastEl = null
  }

  /**
   * toast 提示
   */
  showToast() {
    const toastVNode = h(ToastComp, { msg: this.msg, className: this.className })
    // 把 toast 虚拟节点挂载到容器
    render(toastVNode, container)
    body?.appendChild(container)
    this.toastEl = toastVNode.el
    this.toastEl?.classList.remove("hide")
    this.toastEl?.classList.add("show")
    // 清除节点定时器
    removeTimer && clearTimeout(removeTimer)
    toastTimer && clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      this.closeToast()
    }, this.duration)
  }
  
  /**
   * 关闭 toast
   */
  closeToast() {
    this.toastEl?.classList.remove("show")
    this.toastEl?.classList.add("hide")
    removeTimer = setTimeout(() => {
      body?.removeChild(container)
    }, this.animationTime)
  }
}

export default {
  install(app: any) {
    app.config.globalProperties.$toast = function (toastObject: ToastType) {
      const toast = new Toast(toastObject)
      toast.showToast()
    }
  }
}