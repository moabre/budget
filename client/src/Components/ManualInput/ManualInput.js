import axios from 'axios'
import React, { Component } from 'react'
import './ManualInput.scss'

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
    axios
      .post('http://localhost:8080/dashboard', {
        expense: this.state.expense,
        date: this.state.date,
        total: `TOTAL ${this.state.total}`,
      })
      .then((res) => {
        // let url = window.location.href.split('home', 1)
        // window.location.href = url
        // console.log(url)
        window.location.reload()
      })
  }

  render() {
    console.log(this.state)
    if (!this.props.isVisible) {
      return null
    } else {
      return (
        <div className='expense'>
          <form action='' className='manual'>
            <h1>Input Expenses</h1>
            <label htmlFor='date' className='label'>
              Date
            </label>
            <input
              type='text'
              name='date'
              id='date'
              placeholder='mm/dd/yy'
              onChange={this.onDateChange}
              value={this.state.date}
              className='label__input'
            />
            <label htmlFor='expense' className='label'>
              Expense Name
            </label>
            <input
              type='text'
              name='expense'
              id='expense'
              placeholder='Rent'
              onChange={this.onExpenseChange}
              value={this.state.expense}
              className='label__input'
            />
            <label htmlFor='amount' className='label'>
              Total
            </label>
            <input
              type='text'
              name='amount'
              id='amount'
              placeholder='1000.00'
              onChange={this.onTotalChange}
              value={this.state.total}
              className='label__input'
            />
            <button onClick={this.axiosPost} className='button__login'>
              Submit
            </button>
          </form>
        </div>
      )
    }
  }
}

export default ManualInput
