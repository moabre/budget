import axios from 'axios'
import React, { Component } from 'react'

class Expense extends Component {
  state = {
    // Initially, no file is selected
    expense: [],
    date: '',
    total: '',
  }

  // getting the date from the user

  onDateChange = (event) => {
    //update the state
    this.setState({ date: event.target.value })
  }

  axiosPost = (event) => {
    event.preventDefault()
    axios.post('http://localhost:8080/dashboard', this.state)
  }

  getAxios = (event) => {
    event.preventDefault()
    axios
      .get(`http://localhost:8080/dashboard?${this.state.date}`)
      .then((res) => {
        this.setState({ expense: res.data })
      })
  }

  showSpending = () => {
    // if (this.state.expense.length === 0) {
    //   return null
    // } else {
    console.log(this.state.expense[0])

    this.state.expense.map((i) => <div key={1}>{i}</div>)
  }

  render() {
    console.log(this.state.expense)
    if (!this.props.isVisible) {
      return null
    } else {
      return (
        <>
          <form action=''>
            <label htmlFor='search'>search from date</label>
            <input
              type='text'
              name='date'
              id='date'
              placeholder='mm/dd/yy'
              onChange={this.onDateChange}
              value={this.state.date}
            />
            <button onClick={this.getAxios}>Submit</button>
          </form>
          <div>
            {this.state.expense.map((i) => (
              <p>{i}</p>
            ))}
          </div>
        </>
      )
    }
  }
}

export default Expense
