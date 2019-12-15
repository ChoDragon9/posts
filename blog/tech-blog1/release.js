const fs = require('fs')

const FILE_NAME = './article.md'
const subjects = [
  '1.md',
  '2.md',
  '3.md',
  '4.md',
  '5.md',
  '6.md',
]

// Book
const contents = subjects
  .map(fileName => fs.readFileSync(`./${fileName}`))
  .join(`\n`)

fs.writeFileSync(FILE_NAME, contents)