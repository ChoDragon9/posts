const { spawn } = require('child_process')
const { readFile } = require('fs')
const ROOT_PATH = `${__dirname}/../../`

const getVueFileList = () => {
  return new Promise(resolve => {
    const ls = spawn('find', ['src', '-name', '*.vue'])

    ls.stdout.on('data', (data) => {
      resolve(data.toString().trim().split('\n'))
    })
  })
}

const readFiles = (fileList, iteratee) => {
  fileList.forEach(vueFile => {
    readFile(`${ROOT_PATH}${vueFile}`, 'utf8', iteratee)
  })
}

const extractCollectionItem = (iteratees) => {
  return getVueFileList()
    .then(fileList => {
      return new Promise((resolve, reject) => {
        const totalVueFile = fileList.length
        const resultArr = iteratees.map(() => [])
        let countVueFile = 0

        readFiles(fileList, (err, vueComponent) => {
          err && reject(err)

          iteratees.forEach((iteratee, index) => {
            const result = iteratee(vueComponent)
            result && resultArr[index].push(...result)
          })

          countVueFile++
          if (countVueFile >= totalVueFile) {
            resolve(resultArr)
          }
        })
      })
    })
}

module.exports = {
  extractCollectionItem
}
