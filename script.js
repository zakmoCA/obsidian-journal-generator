#!/usr/bin/env node
import fs from 'fs'
import { exec } from 'child_process'
import moment from 'moment'

const pathToDailyJournals = '/Users/zakeriyamohamed/Documents/Obsidian Vault/Daily Journals'

function getCurrentMonthName() {
  return moment().format('MMMM')
}

function checkAndCreateMonthDirectory() {
  try {
    const currentMonth = getCurrentMonthName()
    const pathToCurrentMonth = `${pathToDailyJournals}/${currentMonth}`
    
    if (!fs.existsSync(pathToCurrentMonth)) {
      fs.mkdirSync(pathToCurrentMonth, { recursive: true })
    }
    const pathToCurrentDay = createDayDirectory(pathToCurrentMonth)
    createFilesInDirectory(pathToCurrentDay)
  } catch (error) {
    console.error('Error in checkAndCreateMonthDirectory:', error)
  }
}

function createDayDirectory(pathToCurrentMonth) {
  try {
    const dayDirectoryName = moment().format('ddd-DD-MMM')
    const pathToCurrentDay = `${pathToCurrentMonth}/${dayDirectoryName}`
    if (!fs.existsSync(pathToCurrentDay)) {
      fs.mkdirSync(pathToCurrentDay)
    }
    return pathToCurrentDay
  } catch (error) {
    console.error('Error in createDayDirectory:', error)
  }
}

function createFilesInDirectory(pathToCurrentDay) {
  try {
    const fileNames = ['Daily Journal', 'Work Log', 'Brain Dump']
    fileNames.forEach(fileName => {
      const filePath = `${pathToCurrentDay}/${fileName}.md`
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `# ${fileName}`)
      }
    })
  } catch (error) {
    console.error('Error in createFilesInDirectory:', error)
  }
}

function openObsidian() {
  exec('open -a Obsidian', (error) => {
    if (error) {
      console.error('Failed to open Obsidian:', error)
    }
  })
}

checkAndCreateMonthDirectory()
openObsidian()
