/**
 * 根据iconfont.cn生成的链接生成字体图标组件
 */
const fs = require('fs')
const path = require('path')
const download = require('download')
const ejs = require('ejs')

if (process.argv.length < 3) {
  console.error('the script need iconfont url')
  process.exit(1)
}

const fontsUrl = `http:${process.argv[2]}`
const fontsFilename = path.basename(fontsUrl)
const projectDir = path.resolve(__dirname, '../../')
const fontsPath = path.join(projectDir, 'public/assets/fonts')
const fontsComponentPath = path.join(
  projectDir,
  'src/components/FontIcon/index.ts'
)
const ejsTemplate = ejs.compile(
  fs.readFileSync(path.join(__dirname, 'FontIcon.ejs'), 'utf8')
)

go()

async function go() {
  await download(fontsUrl, fontsPath)

  const fontsContent = fs.readFileSync(
    path.join(fontsPath, fontsFilename),
    'utf8'
  )

  const reg = /\sid="([\w-]+)"\s/gi

  const fontNames = fontsContent
    .match(reg)
    .map(s => s.replace(/\sid="([\w-]+)"\s/i, '$1'))

  const fontIconTypes = fontNames.map(s => `'${s}'`).join(' | ')

  const codes = ejsTemplate({ fontIconTypes, fontsFilename })
  fs.writeFileSync(fontsComponentPath, codes)

  // const tt =
  console.log('Successfully gen FontIcon Component')
}
