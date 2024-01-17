import fs from 'fs'
import { exec } from 'child_process'
import moment from 'moment'

const pathToDailyJournals = '/Users/zakeriyamohamed/Documents/Obsidian Vault/Daily Journals'

function getCurrentMonthName() {
  return moment().format('MMMM')
}

function checkAndCreateMonthDirectory() {
  const currentMonth = getCurrentMonthName()
  const pathToCurrentMonth = `${pathToDailyJournals}/${currentMonth}`

  if (!fs.existsSync(pathToCurrentMonth)) {
    fs.mkdirSync(pathToCurrentMonth, { recursive: true })
  }

  const pathToCurrentDay = createDayDirectory(pathToCurrentMonth)
  createFilesInDirectory(pathToCurrentDay)
}

function createDayDirectory(pathToCurrentMonth) {
  const dayDirectoryName = moment().format('ddd-DD-MMM')
  const pathToCurrentDay = `${pathToCurrentMonth}/${dayDirectoryName}`

  if (!fs.existsSync(pathToCurrentDay)) {
    fs.mkdirSync(pathToCurrentDay)
  }

  return pathToCurrentDay
}

function createFilesInDirectory(pathToCurrentDay) {
  const fileNames = ['Daily Journal', 'Work Log', 'Brain Dump']
  fileNames.forEach(fileName => {
    const filePath = `${pathToCurrentDay}/${fileName}.md`
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `# ${fileName}`)
    }
  })
}


function openObsidian() {
  exec('open -a Obsidian')
}

checkAndCreateMonthDirectory()
openObsidian()
