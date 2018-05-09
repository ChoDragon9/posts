const {
  existsSync,
  readFileSync,
  writeFileSync
} = require('fs')

const JSON_FILE_NAME = 'tiara.json'
const CSV_FILE_NAME = 'tiara.csv'
const excludeLinePrefix = ['페이지명', 'booking_tool', 'URL']
const range = [1, 5]

if (!existsSync(`${__dirname}/${CSV_FILE_NAME}`)) {
  const docPath = 'https://docs.google.com/spreadsheets/d/1QrK6E2GEx6rnWb_jQvEGuikJARGazRjfXPYOv_OzXeI/edit?userstoinvite=dolen.sirupe@kakaocorp.com&ts=5a44ecce&actionButton=1#gid=1890741026'
  console.log(`${CSV_FILE_NAME} is not exists!!
Export CSV file from ${docPath}`)
  return
}

// Read File
// Split
// Filter exclude line
// Filter empty line
// Filter only used data

const parseCSVFile = () => {
  // 1. Read File
  return readFileSync(`${__dirname}/${CSV_FILE_NAME}`, { encoding: 'utf8' })
    // 2. Split
    .split('\r\n')
    // 3. Filter exclude line
    .filter(line => {
      for (let prefix of excludeLinePrefix) {
        if (line.startsWith(prefix)) {
          return false
        }
      }
      return true
    })
    // 4. Filter empty line
    .filter(line => /[^,]{1}/.test(line))
    // 5. Filter only used data
    .map(line => line.split(',').slice(range[0], range[1]))
}

const createJSON = (csvData) => {
  const jsonData = {
    sections: {},
    layers: {}
  }
  let cachedLayer1 = null

  csvData.forEach(([section, layer1, layer2, param]) => {
    const isSection = section !== ''
    const hasLayer1 = layer1 !== ''
    const hasLayer2 = layer2 !== ''

    if (isSection) {
      jsonData.sections[section] = false
      return
    }

    if (hasLayer1) {
      cachedLayer1 = layer1
    }

    if (hasLayer2) {
      jsonData.layers[`${cachedLayer1} ${layer2}`] = false
      return
    }

    jsonData.layers[`${layer1}`] = false
  })

  // Create JSON File
  writeFileSync(`${__dirname}/${JSON_FILE_NAME}`, JSON.stringify(jsonData, null, 2))

  console.log(`Created ${JSON_FILE_NAME} by ${CSV_FILE_NAME}`)
}

createJSON(parseCSVFile())
