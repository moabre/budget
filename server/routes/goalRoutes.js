const { json } = require('express')
const express = require('express')
const router = express.Router()
const fs = require('fs')

router.use(express.json())

function readGoal() {
  const fileContent = fs.readFileSync('./data/goal.json')
  return JSON.parse(fileContent)
}
router.get('/', (req, res) => {
  let goalData = readGoal()
  res.status(200).json(goalData)
})

router.post('/', (req, res) => {
  //from Front-end
  //creating the new Inventory item as an object to push to our main data
  const newItem = req.body
  console.log(req.body)
  //will overwrite data and create the new persisting data
  fs.writeFileSync('./data/goal.json', JSON.stringify(newItem))
  res.status(201).send('goal has been added')
})

module.exports = router
