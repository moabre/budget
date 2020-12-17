import app from '../firebase'
import Header from './Header/Header'
import './Home.scss'
import React, { Component } from 'react'
import ManualInput from './ManualInput/ManualInput'
import Receipt from './Receipt/Receipt'
import Tesseract from './Tesseract/Tesseract'

class Home extends Component {
  state = {
    isManualVisible: false,
    isReceiptVisible: false,
    url: null,
    isTesseractVisible: false,
    receiptData: null,
    date: '',
    firstItem: '',
    lastItem: '',
    runTesseract: false,
  }

  showManual = () => {
    this.setState({
      isManualVisible: true,
      isReceiptVisible: false,
      isTesseractVisible: false,
    })
  }
  showReceipt = () => {
    this.setState({
      isManualVisible: false,
      isReceiptVisible: true,
      isTesseractVisible: true,
    })
  }
  setURL = (childURL) => {
    this.setState({
      url: childURL,
    })
  }
  setDate = (childURL) => {
    this.setState({
      date: childURL,
    })
  }
  setItem = (childURL) => {
    this.setState({
      firstItem: childURL,
    })
  }
  setLast = (childURL) => {
    this.setState({
      lastItem: childURL,
    })
  }

  render() {
    console.log(this.state.date)
    return (
      <>
        <Header />
        <div className='button__tray'>
          <button onClick={this.showManual}>Manual</button>
          <button onClick={this.showReceipt}>Receipt</button>
        </div>
        <button onClick={() => app.auth().signOut()} className='signout'>
          Sign out
        </button>
        <ManualInput isVisible={this.state.isManualVisible} />
        <Receipt
          isVisible={this.state.isReceiptVisible}
          setURL={this.setURL}
          setDate={this.setDate}
          setItem={this.setItem}
          setLast={this.setLast}
        />
        <Tesseract
          isVisible={this.state.isTesseractVisible}
          run={this.state.runTesseract}
          URL={this.state.url}
          date={this.state.date}
          firstItem={this.state.firstItem}
          lastItem={this.state.lastItem}
        />
      </>
    )
  }
}

export default Home
