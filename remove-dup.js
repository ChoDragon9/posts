const set = new Set()
const {
  readFileSync,
  writeFileSync
} = require('fs')
const TXT_PATH = 'test.txt'
const JSON_PATH = 'test.json'

readFileSync(`${__dirname}/${TXT_PATH}`, { encoding: 'utf8' })
  .split('\n')
  .map(item => {
    set.add(item)
  })

const arr = []
for (const elem of set) {
  arr.push(elem)
}

writeFileSync(`${__dirname}/${JSON_PATH}`, JSON.stringify(arr, null, 2))
