const { json } = require('express')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const { months } = require('moment')
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
//Posting to 'localhost:8080/dashboard'
router.post('/', (req, res) => {
  //from Front-end
  //creating the new Inventory item as an object to push to our main data
  const newItem = req.body
  // Making a copy of the data and then pushing new item into it

  //will overwrite data and create the new persisting data
  fs.writeFileSync('./data/receipt.json', JSON.stringify(newItem))
  res.status(201).send('Expenses have been added ')

  //will overwrite data and create the new persisting data
  fs.writeFileSync('./data/expenses.json', JSON.stringify(newItem))

  let receipt = readExpense()
  let firstItem = readExpense().item
  let lastItem = readExpense().last
  let date = readExpense().date
  let purchase = receipt.text.split(firstItem)
  let newReceipt = purchase[1].split(lastItem)
  let totalReceipt = newReceipt[0].split('SUBTOTAL')
  let combinedReceipt = totalReceipt[0] + totalReceipt[1]
  let finalReceipt = combinedReceipt.split('\n')
  // removed subtotal as it was overlapping with the total
  finalReceipt.push(date)
  fs.writeFileSync('./data/parsedreceipts.json', JSON.stringify(finalReceipt))

  //adding manual entries to the total
  let manual = readUrl()
  let entry = []
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
  let allExpenses = readAllExpenses()
  allExpenses.push(parsedData)
  fs.writeFileSync('./data/allexpenses.json', JSON.stringify(allExpenses))
})

function readGoal() {
  const fileContent = fs.readFileSync('./data/goal.json')
  return JSON.parse(fileContent)
}

router.get('/', (req, res) => {
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
  let returnData = matchExpenses()

  let x = []

  for (let i = 0; i < returnData.length; i++) {
    let num = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g

    for (let w = 0; w < returnData[i].length; w++) {
      if (returnData[i][w].includes('TOTAL')) {
        let number = returnData[i][w].match(num)
        number = number.join('')
        x.push(parseFloat(number))
      }
    }
  }
  let sum = x.reduce(function (a, b) {
    return a + b
  }, 0)
  res.status(200).json(sum)
})

module.exports = router
