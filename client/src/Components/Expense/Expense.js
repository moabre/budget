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

  // showSpending = () => {
  //   console.log(this.state.expense.length)
  //   if (this.state.expense.length === '0') {
  //     return <p>there are no expenses for that date</p>
  //   }
  // }

  render() {
    if (!this.props.isVisible) {
      return null
    } else {
      return (
        <>
          <div>
            <form action='' className='expense'>
              <label htmlFor='search' lassName='label'>
                Search according to the date
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
              <button onClick={this.getAxios} className='button__login'>
                Search
              </button>
            </form>
          </div>
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
