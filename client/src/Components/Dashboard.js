import app from '../firebase'
import Header from './Header/Header'
import React, { Component } from 'react'
import Goal from './Goal/Goal'
import Expense from './Expense/Expense'
import './Dashboard.scss'

class Dashboard extends Component {
  state = {
    isGoalVisible: true,
    isExpenseVisible: false,
    url: null,
  }

  showGoals = () => {
    this.setState({
      isGoalVisible: true,
      isExpenseVisible: false,
    })
  }
  showExpense = () => {
    this.setState({
      isGoalVisible: false,
      isExpenseVisible: true,
    })
  }
  setURL = (childURL) => {
    this.setState({
      url: childURL,
    })
  }
  render() {
    return (
      <>
        <Header />
        <div className='mainpage'>
          <div className='buttonhome'>
            <button onClick={this.showGoals} className='buttonhome__item'>
              Goals
            </button>
            <button onClick={this.showExpense} className='buttonhome__item'>
              Expenses
            </button>
          </div>
          <button onClick={() => app.auth().signOut()} className='signout'>
            Sign out
          </button>
          <Goal isVisible={this.state.isGoalVisible} />
          <Expense
            isVisible={this.state.isExpenseVisible}
            setURL={this.setURL}
          />
        </div>
      </>
    )
  }
}

export default Dashboard
