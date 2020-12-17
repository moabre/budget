const { json } = require('express')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const moment = require('moment')

router.use(express.json())

function readReceipt() {
  const fileContent = fs.readFileSync('./data/receipt.json')
  return JSON.parse(fileContent)
}
function readExpense() {
  const fileContent = fs.readFileSync('./data/expenses.json')
  return JSON.parse(fileContent)
}
function readParsed() {
  const fileContent = fs.readFileSync('./data/parsedreceipts.json')
  return JSON.parse(fileContent)
}

function readAllExpenses() {
  const fileContent = fs.readFileSync('./data/allexpenses.json')
  return JSON.parse(fileContent)
}

function readUrl() {
  const fileContent = fs.readFileSync('./data/url.json')
  return JSON.parse(fileContent)
}

function manualExpenses() {
  const fileContent = fs.readFileSync('./data/manualexpenses.json')
  return JSON.parse(fileContent)
}

function matchExpenses() {
  const fileContent = fs.readFileSync('./data/expensesintimeframe.json')
  return JSON.parse(fileContent)
}

function readGoal() {
  const fileContent = fs.readFileSync('./data/goal.json')
  return JSON.parse(fileContent)
}
function readSearch() {
  const fileContent = fs.readFileSync('./data/searchedexpenses.json')
  return JSON.parse(fileContent)
}

//Getting all the expenses of the day
router.get('/', (req, res) => {
  console.log(req.query)
  console.log(req._parsedUrl.query)
  console.log(moment(req._parsedUrl.query, 'MM-DD-YYYY').unix())
  let dayAsked = moment(req._parsedUrl.query, 'MM-DD-YYYY').unix()
  let allExpenses = readAllExpenses()
  // let newOne = []
  // reset the json file
  fs.writeFileSync('./data/searchedexpenses.json', JSON.stringify([]))
  for (let i = 0; i < allExpenses.length; i++) {
    if (
      moment(allExpenses[i][allExpenses[i].length - 1], 'MM-DD-YYYY').unix() ===
      dayAsked
    ) {
      let whatYouSpent = readSearch()
      whatYouSpent.push(allExpenses[i])
      fs.writeFileSync(
        './data/searchedexpenses.json',
        JSON.stringify(whatYouSpent)
      )
    }
  }
  let searchSpent = readSearch()
  let newSpent = []
  for (let i = 0; i < searchSpent.length; i++) {
    newSpent = newSpent.concat(searchSpent[i])
  }
  console.log(newSpent)
  res.status(201).send(newSpent)
})

//Posting to 'localhost:8080/dashboard'
router.post('/', (req, res) => {
  //from Front-end
  //creating the new Inventory item as an object to push to our main data
  const newItem = req.body
  // Making a copy of the data and then pushing new item into it
  let newData = readUrl()
  newData.push(newItem)
  //will overwrite data and create the new persisting data
  fs.writeFileSync('./data/url.json', JSON.stringify(newData))
  res.status(201).send('url has been added to the Inventory')
  //adding manual entries to the total
  let manual = readUrl()
  let entry = []
  // reset the json file
  fs.writeFileSync('./data/manualexpenses.json', JSON.stringify(entry))

  for (let i = 0; i < manual.length; i++) {
    let entryDate = manual[i].date
    let totalAmount = manual[i].total
    let expenseName = manual[i].expense
    const manualentry = [totalAmount, expenseName, entryDate]
    let entry = manualExpenses()
    entry.push(manualentry)
    fs.writeFileSync('./data/manualexpenses.json', JSON.stringify(entry))
  }

  let enter = manualExpenses()
  let empty = []
  fs.writeFileSync('./data/allexpenses.json', JSON.stringify(empty))

  for (let i = 0; i < enter.length; i++) {
    let allExpenses = readAllExpenses()
    allExpenses.push(enter[i])
    fs.writeFileSync('./data/allexpenses.json', JSON.stringify(allExpenses))
  }
  let parsedData = readParsed()
  let allnonExpenses = readAllExpenses()
  allnonExpenses.push(parsedData)
  fs.writeFileSync('./data/allexpenses.json', JSON.stringify(allnonExpenses))

  // adding data into time frame
  let goalData = readGoal()
  let startDate = goalData.startDate
  let endDate = goalData.endDate
  let timeEnd = moment(endDate, 'MM-DD-YYYY').unix()
  let timeStart = moment(startDate, 'MM-DD-YYYY').unix()

  let allExpenses = readAllExpenses()

  let nothing = []
  fs.writeFileSync('./data/expensesintimeframe.json', JSON.stringify(nothing))

  for (let i = 0; i < allExpenses.length; i++) {
    if (
      moment(allExpenses[i][allExpenses[i].length - 1], 'MM-DD-YYYY').unix() >=
        timeStart &&
      moment(allExpenses[i][allExpenses[i].length - 1], 'MM-DD-YYYY').unix() <=
        timeEnd
    ) {
      let whatYouSpent = matchExpenses()
      whatYouSpent.push(allExpenses[i])
      fs.writeFileSync(
        './data/expensesintimeframe.json',
        JSON.stringify(whatYouSpent)
      )
    }
  }
})

module.exports = router
