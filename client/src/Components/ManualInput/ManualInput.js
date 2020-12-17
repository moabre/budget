import axios from 'axios'
import React, { Component } from 'react'

class ManualInput extends Component {
  state = {
    // Initially, no file is selected
    expense: '',
    date: '',
    total: '',
  }

  // getting the date from the user

  onDateChange = (event) => {
    //update the state
    this.setState({ date: event.target.value })
  }

  // getting the firstWord from the user

  onExpenseChange = (event) => {
    //update the state
    this.setState({ expense: event.target.value })
  }
  // getting the lastWord from the user

  onTotalChange = (event) => {
    //update the state
    this.setState({ total: event.target.value })
  }

  axiosPost = (event) => {
    event.preventDefault()
    axios.post('http://localhost:8080/dashboard', {
      expense: this.state.expense,
      date: this.state.date,
      total: `TOTAL ${this.state.total}`,
    })
  }

  render() {
    console.log(this.state)
    if (!this.props.isVisible) {
      return null
    } else {
      return (
        <form action=''>
          <label htmlFor='date'>Date</label>
          <input
            type='text'
            name='date'
            id='date'
            placeholder='mm/dd/yy'
            onChange={this.onDateChange}
            value={this.state.date}
          />
          <label htmlFor='expense'>Expense Name</label>
          <input
            type='text'
            name='expense'
            id='expense'
            placeholder='Rent'
            onChange={this.onExpenseChange}
            value={this.state.expense}
          />
          <label htmlFor='amount'>Total</label>
          <input
            type='text'
            name='amount'
            id='amount'
            placeholder='1000.00'
            onChange={this.onTotalChange}
            value={this.state.total}
          />
          <button onClick={this.axiosPost}>Submit</button>
        </form>
      )
    }
  }
}

export default ManualInput
