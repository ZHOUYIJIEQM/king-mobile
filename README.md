# ```Vue3```模仿王者荣耀移动端官网
基于```Vue3+TypeScript+Vite+Vue-Router+Axios+Pinia```开发, 项目还包含了[后台管理系统](https://github.com/ZHOUYIJIEQM/king-admin), [node+express后端](https://github.com/ZHOUYIJIEQM/king-server)

## [点击查看效果, f12后切换到移动端浏览](https://app.yjsjyb.top/kingm)

## <a href="#图片预览">点击预览图片</a>


## 配置自动导入
```bash
yarn add -D unplugin-auto-import unplugin-vue-components
```
```ts
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite'
// https://github.com/antfu/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(),
    Components({ /* options */ }),
    AutoImport({
      imports: ['vue', 'vue-router']
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {			
    // 局域网访问
    host: '0.0.0.0',
    // 端口号
    port: 3001,
  }
})
```
```json
// tsconfig.json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": [
    "env.d.ts", 
    "src/**/*", 
    "src/**/*.vue",
    // 以下没添加, 在 vscode 会看到报错
    "src/**/*.ts", 
    "src/**/*.d.ts", 
    "src/**/*.tsx", 
    "src/**/*.vue",
    "./auto-imports.d.ts",
    "./components.d.ts",
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "references": [
    {
      "path": "./tsconfig.config.json"
    }
  ]
}
```

## [环境变量](https://cn.vitejs.dev/guide/env-and-mode.html)
```
# 新建 .env.development
# 定义的变量名必须以 VITE_ 为前缀
# base api
VITE_BASE_API = 'http://localhost:3080/web/api'

# 新建 .env.production
# base api
VITE_BASE_API = 'https://app.yjsjyb.top/web/api'
```
```ts
// 读取时
console.log(import.meta.env.VITE_BASE_API) 
// 如果运行 yarn dev, 则会读取 .env.development 里定义的变量
// 如果运行 yarn build, 则会读取 .env.production 里定义的变量
```
```ts
// 修改 tsconfig.json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  },
  // 添加这个, 没有会报错 类型“ImportMeta”上不存在属性“env”
  "types": [ "vite/client" ]
},
```

## 使用[lib-flexible](https://github.com/amfe/lib-flexible)等比例缩放布局, 适配移动端
```ts
// @/utils/amfeFlexible.ts
export default function flexible (window: any, document: any) {
  // 根元素
  var docEl = document.documentElement
  // 获取设备的dpr, 设备物理像素分辨率与CSS像素分辨率之比
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  // 设置默认字体大小(继承自body)
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
      // 文档完全加载和解析完成后
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  // 设置根元素字体大小(设置1个rem的大小)
  function setRemUnit () {
    // 把屏幕宽度分成10份
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }
  setRemUnit()

  // reset rem unit on page resize
  // 视图大小调整
  window.addEventListener('resize', setRemUnit)
  // 往返缓存
  window.addEventListener('pageshow', function (e: any) {
    // 往返缓存存储了页面e.persisted: true
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  // 检测是否支持 0.5px, 如果支持就在根元素类名添加 hairlines 作为标记
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}
```
使用时
```ts
// @/main.ts
import amfeFlexible from '@/utils/amfeFlexible'
amfeFlexible(window, document)
```
```vscode```安装插件```px to rem```, 打开设置, 搜索 ```cssrem```, 找到 ```Cssrem: Root Font Size``` -> 在下方输入框输入**设计稿的宽度 / 10**(比如设计稿750, 就输入75)。 \
在写```css```时输入```12px```, 会弹出提示转换为```rem```的对应值, 就不用去计算```px```对应的```rem```值。

## 使用```axios```, 封装请求接口
```ts
// 简单封装一下axios
// @/api/index.ts
import axios, { type AxiosRequestConfig } from 'axios'
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8 * 1000,
})
instance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error);
  }
)
instance.interceptors.response.use(
  (response: any) => {
    return Promise.resolve(response.data)
  },
  (error: any) => {
    return Promise.reject(error);
  }
)

export default instance

// @/api/home.ts
import request from "./index";
export const getAds = () => {
  return request({
    url: "/home/ads",
  });
};
```

## 使用 [```swiper```](https://swiperjs.com/demos) [```swiper``` API文档](https://www.swiper.com.cn/api/index.html)
```bash
yarn add swiper
```

## ```Vue3```新写法
### 自定义组件传入参数并设置默认值的写法
```ts
<script lang="ts" setup>
interface NavBar {
  title: string;
}
const props = withDefaults(
defineProps<{
  navTitle?: NavBar[],
  backgroundColor: string
}>(), 
{
  navTitle: function() {
    return [
      { title: '首页' },
      { title: '攻略中心' },
    ]
  },
  backgroundColor: '#db9e3f'
})
</script>
```

### ```emit```
```ts
const emit = defineEmits<{
  (e: 'heroChange', name: string): void
}>()
const selectHero = (hero: string) => {
  emit('heroChange', hero)
}
```

### ```keep-alive```新写法
```html
<router-view v-slot="{ Component }">
  <keep-alive :exclude="/.*Exclude$/">
    <component :is="Component" />
  </keep-alive>
</router-view>
```

### ```pinia```读取属性时, 响应式问题
```ts
// @/stores/index.ts
export const strategyStore = defineStore('strategy', () => {
  // 英雄名称
  const heroName = ref<string>('')
  return { heroName }
})

// 在组件读取 heroName 时
// heroName 非响应式
const heroName = strategyStore().heroName
setTimeout(() => {
  console.log(heroName); // ''
  strategyStore().heroName = '鲁班七号'
  console.log(heroName); // ''
}, 1000);

// heroName1 响应式
const heroName = computed<string>(() => {
  return strategyStore().heroName
})
setTimeout(() => {
  console.log(heroName.value); // ''
  strategyStore().heroName = '鲁班七号'
  console.log(heroName.value); // '鲁班七号'
}, 1000);

// heroName 响应式
const { heroName } = storeToRefs(strategyStore())
setTimeout(() => {
  console.log(heroName.value); // ''
  strategyStore().heroName = '鲁班七号'
  console.log(heroName.value); // '鲁班七号'
}, 1000);
```

### 全局属性的对象
```ts
// vue2 写法
Vue.prototype.msg = 'hello'
console.log(this.msg) // 'hello'
// vue3
app.config.globalProperties.msg = 'hello'
const { proxy } = getCurrentInstance()
console.log(proxy.msg) // 'hello'
```

## <a id="图片预览">图片预览</a>
<!-- ![首页](./prevImg/%E9%A6%96%E9%A1%B5.jpg)
![攻略中心](./prevImg/%E6%94%BB%E7%95%A5%E4%B8%AD%E5%BF%83.jpg)
![赛事中心](./prevImg/%E8%B5%9B%E4%BA%8B%E4%B8%AD%E5%BF%83.jpg)
![英雄详情页](./prevImg/%E8%8B%B1%E9%9B%84%E8%AF%A6%E6%83%85%E9%A1%B5.jpg)
![皮肤](./prevImg/%E7%9A%AE%E8%82%A4%E8%BD%AE%E6%92%AD.jpg)
![一图识英雄](./prevImg/%E4%B8%80%E5%9B%BE%E8%AF%86%E8%8B%B1%E9%9B%84.jpg)
![更多英雄](./prevImg/%E6%9B%B4%E5%A4%9A%E8%8B%B1%E9%9B%84.jpg)
![视频页](./prevImg/%E8%A7%86%E9%A2%91%E9%A1%B5.jpg)
![文章页](./prevImg/%E6%96%87%E7%AB%A0%E9%A1%B5.jpg) -->

1 首页
<br />
<img style="display: block; width: 300px; margin: 10px 0 30px; box-shadow: 0px 0px 20px -6px #868686" src="./prevImg/首页.jpg" alt="首页.jpg">
<br />
2 攻略中心
<br />
<img style="display: block; width: 300px; margin: 10px 0 30px; box-shadow: 0px 0px 20px -6px #868686" src="./prevImg/攻略中心.jpg" alt="攻略中心.jpg">
<br />
3 赛事中心
<br />
<img style="display: block; width: 300px; margin: 10px 0 30px; box-shadow: 0px 0px 20px -6px #868686" src="./prevImg/赛事中心.jpg" alt="赛事中心.jpg">
<br />
4 英雄详情页
<br />
<img style="display: block; width: 300px; margin: 10px 0 30px; box-shadow: 0px 0px 20px -6px #868686" src="./prevImg/英雄详情页.jpg" alt="英雄详情页.jpg">
<br />
5 皮肤轮播
<br />
<img style="display: block; width: 300px; margin: 10px 0 30px; box-shadow: 0px 0px 20px -6px #868686" src="./prevImg/皮肤轮播.jpg" alt="皮肤轮播.jpg">
<br />
6 一图识英雄
<br />
<img style="display: block; width: 300px; margin: 10px 0 30px; box-shadow: 0px 0px 20px -6px #868686" src="./prevImg/一图识英雄.jpg" alt="一图识英雄.jpg">
<br />
7 更多英雄
<br />
<img style="display: block; width: 300px; margin: 10px 0 30px; box-shadow: 0px 0px 20px -6px #868686" src="./prevImg/更多英雄.jpg" alt="更多英雄.jpg">
<br />
8 视频页
<br />
<img style="display: block; width: 300px; margin: 10px 0 30px; box-shadow: 0px 0px 20px -6px #868686" src="./prevImg/视频页.jpg" alt="视频页.jpg">
<br />
9 文章页
<br />
<img style="display: block; width: 300px; margin: 10px 0 30px; box-shadow: 0px 0px 20px -6px #868686" src="./prevImg/文章页.jpg" alt="文章页.jpg">
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```
