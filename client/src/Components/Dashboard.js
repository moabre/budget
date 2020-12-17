import app from '../firebase'
import Header from './Header/Header'
import React, { Component } from 'react'
import Goal from './Goal/Goal'
import Expense from './Expense/Expense'

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
        <div className='button__tray'>
          <button onClick={this.showGoals}>Goals</button>
          <button onClick={this.showExpense}>Expenses</button>
        </div>
        <button onClick={() => app.auth().signOut()} className='signout'>
          Sign out
        </button>
        <Goal isVisible={this.state.isGoalVisible} />
        <Expense isVisible={this.state.isExpenseVisible} setURL={this.setURL} />
      </>
    )
  }
}

export default Dashboard
