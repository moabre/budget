import axios from 'axios'
import React, { Component } from 'react'
import moment from 'moment'
import './Goal.scss'

class Goal extends Component {
  state = {
    // Initially, no file is selected
    startDate: '',
    endDate: '',
    total: '',
    updateBudget: false,
    spent: '',
  }

  componentDidMount() {
    axios.get('http://localhost:8080/goal').then((res) => {
      this.setState({
        startDate: res.data.startDate,
        endDate: res.data.endDate,
        total: res.data.total,
      })
    })

    axios.get('http://localhost:8080/tesseract').then((res) => {
      this.setState({
        spent: res.data,
      })
    })
  }

  // getting the date from the user
  onDateChange = (event) => {
    //update the state
    this.setState({ startDate: event.target.value })
  }

  // getting the firstWord from the user
  onExpenseChange = (event) => {
    //update the state
    this.setState({ total: event.target.value })
  }
  // getting the lastWord from the user
  onEndDate = (event) => {
    //update the state
    this.setState({ endDate: event.target.value })
  }

  axiosPost = (event) => {
    event.preventDefault()
    this.setState({ updateBudget: false })
    axios.post('http://localhost:8080/goal', this.state)
  }
  showUpdate = () => {
    this.setState({ updateBudget: true })
  }

  render() {
    let CurrentDate = moment().unix()
    let start = moment(this.state.startDate, 'MM-DD-YYYY').unix()
    let end = moment(this.state.endDate, 'MM-DD-YYYY').unix()
    let days = (end - CurrentDate) / 86400

    if (!this.props.isVisible) {
      return null
    } else if (this.state.total === '' || this.state.total === undefined) {
      return (
        <div>
          <form action='' className='expense'>
            <h1>Lets set a budget!</h1>
            <label htmlFor='date' className='label'>
              Start Date
            </label>
            <input
              type='text'
              name='date'
              id='date'
              placeholder='mm/dd/yyyy'
              onChange={this.onDateChange}
              value={this.state.startDate}
              className='label__input'
            />
            <label htmlFor='date' className='label'>
              End Date
            </label>
            <input
              type='text'
              name='date'
              id='date'
              placeholder='mm/dd/yyyy'
              onChange={this.onEndDate}
              value={this.state.endDate}
              className='label__input'
            />
            <label htmlFor='expense' className='label'>
              Amount
            </label>
            <input
              type='text'
              name='expense'
              id='expense'
              placeholder='budget amount'
              onChange={this.onExpenseChange}
              value={this.state.total}
              className='label__input'
            />
            <button onClick={this.axiosPost} className='button__login'>
              Submit
            </button>
          </form>
        </div>
      )
    } else if (this.state.updateBudget) {
      return (
        <div className='expense'>
          <form action='' className='manual'>
            <h1>Lets set a budget!</h1>
            <label htmlFor='date' className='label'>
              Start Date
            </label>
            <input
              type='text'
              name='date'
              id='date'
              placeholder={this.state.startDate}
              onChange={this.onDateChange}
              value={this.state.startDate}
              className='label__input'
            />
            <label htmlFor='date' className='label'>
              End Date
            </label>
            <input
              type='text'
              name='date'
              id='date'
              placeholder={this.state.endDate}
              onChange={this.onEndDate}
              value={this.state.endDate}
              className='label__input'
            />
            <label htmlFor='expense' className='label'>
              Amount
            </label>
            <input
              type='text'
              name='expense'
              id='expense'
              placeholder={this.state.total}
              onChange={this.onExpenseChange}
              value={this.state.total}
              className='label__input'
            />
            <button onClick={this.axiosPost} className='button__login'>
              Submit
            </button>
          </form>
        </div>
      )
    } else {
      return (
        <div className='goal'>
          <p>
            You have budgeted {this.state.total} for your budget from{' '}
            {this.state.startDate} to {this.state.endDate}{' '}
          </p>
          <p>
            You have spent {this.state.spent} this much from{' '}
            {this.state.startDate} to {this.state.endDate}{' '}
          </p>

          <p>You have {days} days left until your budget is done</p>

          <button onClick={this.showUpdate} className='button__goal'>
            Update Budget?
          </button>
          <p></p>
        </div>
      )
    }
  }
}

export default Goal
