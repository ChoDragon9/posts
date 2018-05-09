const chalk = require('chalk')
const tiaraJSON = require('./tiara')
const { extractCollectionItem } = require('./vueFileLoader')

const LOG_ATTRIBUTE = {
  LAYER: 'data-layer',
  PARAM: 'data-param'
}

const SECION_METHOD = 'sendPageViewBySection'

const extractValueOfAttr = (str, attr) => {
  const regExp = new RegExp(`(?<=${attr}=('|"){1})([a-z0-9_\\s]{1,})(?=('|"){1})`, 'gm')
  return str.match(regExp)
}

const extractSection = (str) => {
  const regExp = new RegExp(`(?<=${SECION_METHOD}\\(')([a-z0-9]{1,})(?='\\))`, 'gm')
  return str.match(regExp)
}

const extractionInteratees = [
  (vueComponent) => extractSection(vueComponent),
  (vueComponent) => extractValueOfAttr(vueComponent, LOG_ATTRIBUTE.LAYER),
  (vueComponent) => extractValueOfAttr(vueComponent, LOG_ATTRIBUTE.PARAM)
]

const audit = () => {
  extractCollectionItem(extractionInteratees)
    .then(([sectionList, attrList]) => {
      let countSuccess = 0
      let countFail = 0

      sectionList.forEach(attr => {
        tiaraJSON.sections[attr] = true
      })

      console.log('Sections')
      for (const [item, isUsed] of Object.entries(tiaraJSON.sections)) {
        if (isUsed) {
          countSuccess++
          console.log(chalk.gray(`[O] ${item}`))
        } else {
          countFail++
          console.log(chalk.yellow(`[X] ${item}`))
        }
      }

      attrList.forEach(attr => {
        tiaraJSON.layers[attr] = true
      })

      console.log('')
      console.log('Layers')
      for (const [item, isUsed] of Object.entries(tiaraJSON.layers)) {
        if (isUsed) {
          countSuccess++
          console.log(chalk.gray(`[O] ${item}`))
        } else {
          countFail++
          console.log(chalk.yellow(`[X] ${item}`))
        }
      }

      console.log(`
      ${chalk.green(`${countSuccess} passing`)}
      ${chalk.yellow(`${countFail} failing`)}
      `)
    })
}

module.exports = {
  extractValueOfAttr,
  audit
}
