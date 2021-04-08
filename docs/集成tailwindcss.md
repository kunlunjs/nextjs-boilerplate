# 集成Tailwind

## 安装Tailwind依赖
```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# or

yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

## 初始化Tailwind配置
- 生成tailwind配置文件
```
npx tailwindcss init -p
```
将会在项目目录下生成`tailwind.config.js`文件
```js
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

- 修改postcss配置文件`postcss.config.js`(如果没有则手动创建一个)
```
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 加入Tailwind样式
可以在`pages/_app.tsx`中直接导入`import 'tailwindcss/tailwind.css'`
```ts
import 'tailwindcss/tailwind.css'
```
或在`styles/globals.css`中加入Tailwind指令
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```


