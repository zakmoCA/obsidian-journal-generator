import fs from 'fs'
import { exec } from 'child_process'
import moment from 'moment'


const months = [
  "January", 
  "February", 
  "March", 
  "April", 
  "May", 
  "June", 
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December"
]


const pathToDailyJournals = '/Users/zakeriyamohamed/Documents/Obsidian Vault/Daily Journal'


function getCurrentMonthName() {
  return moment().format('MMMM')
}

function checkAndCreateMonthDirectory() {
  const currentMonth = getCurrentMonthName()

  const pathToCurrentMonth = `/Users/zakeriyamohamed/Documents/Obsidian Vault/Daily Journal/${currentMonth}`

  if (pathToCurrentMonth) {
    createDayDirectory()
    createFilesInDirectory()
  }
}

function createDayDirectory() {
  // 
}

function createFilesInDirectory() {
  // 
}

function openObsidian() {
  exec('open -a Obsidian')
}
