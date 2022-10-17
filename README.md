# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript
in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the
[script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)
to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) +
  [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are
shimmed to be a generic Vue component type by default. In most cases this is
fine if you don't really care about component prop types outside of templates.
However, if you wish to get actual prop types in `.vue` imports (for example to
get props validation when using manual `h(...)` calls), you can enable Volar's
Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette,
   look for `TypeScript and JavaScript Language Features`, then right click and
   select `Disable (Workspace)`. By default, Take Over mode will enable itself
   if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the
   command palette.

You can learn more about Take Over mode
[here](https://github.com/johnsoncodehk/volar/discussions/471).

## 配置 tailwindcss

```shell
# 安装tailwindcss、postcss、autoprefixer
npm install -D tailwindcss postcss autoprefixer
# 创建tailwind.config.js和postcss.config.js配置文件
npx tailwindcss init -p
```

### 配置您的模板路径

```JavaScript
// tailwindcss.config.cjs
module.exports = {
  content: [ // 添加所有模版文件的路径
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {},
  plugins: []
}
```

```JavaScript
// postcss.config.cjs
module.exports = {
  plugins: {
    'tailwindcss/nesting': {}, // 使用css嵌套语法
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

### 添加 tailwind 指令到 css

```code
// style.cas
@tailwind base;
@tailwind component;
@tailwind utilities;
```

## 自动引入 vue api

```shell
npm install -D unplugin-auto-import
```

```JavaScript
// vite.config.js
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'

module.exports = {
  plugins: [
    vue(),
    autoImort({
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.d.json',
        globalsPropValue: true
      }
    })
  ]
}
```

```JavaScript
// tsconfig.json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": [
    "env.d.ts",
    "src/**/*",
    "src/**/*.vue",
    "./auto-imports.d.ts" // 添加后会在根目录中生成auto-imports.d.ts文件，没有这个文件使用 ref提示undefine
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

## 支持 jsx、tsx

```shell
npm install -D @vitejs/plugin-vue-jsx
```

```JavaScript
import vueJsx from '@vitejs/plugin-vue-jsx'
···

module.exports = {
  ···
  plugins: [
    ···
    vueJsx()
    ···
  ]
  ···
}

```
