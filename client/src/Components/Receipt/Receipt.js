import React, { Component } from 'react'
import app from '../../firebase.js'

class App extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    ulink: null,
    date: '',
    firstWord: '',
    lastWord: '',
    input: false,
  }

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] })
  }

  // getting the date from the user

  onDateChange = (event) => {
    //update the state
    this.setState({ date: event.target.value })
  }

  // getting the firstWord from the user

  onWordChange = (event) => {
    //update the state
    this.setState({ firstWord: event.target.value })
  }
  // getting the lastWord from the user

  onLastChange = (event) => {
    //update the state
    this.setState({ lastWord: event.target.value })
  }

  // On file upload (click the upload button)
  onFileUpload = () => {
    this.setState({ input: true })
    // Create an object of formData
    const formData = new FormData()

    // Update the formData object
    formData.append(
      'myFile',
      this.state.selectedFile,
      this.state.selectedFile.name
    )

    // Details of the uploaded file
    console.log(this.state.selectedFile)

    // Get File
    let file = document.getElementById('image').files[0]

    // Create a storage ref

    let storageRef = app.storage().ref('images/' + file.name)

    //Upload file

    let task = storageRef.put(file)

    // get the URL
    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) =>
        this.setState(
          { ulink: url },
          // passing back the url to the parent
          this.props.setURL(url)
        )
      )
  }

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{' '}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      )
    }
  }
  // upload image if url is existent
  fileImage = () => {
    // rendering picture if it exists
    if (this.state.ulink) {
      return <img src={this.state.ulink} alt='upload' />
    }
  }
  enterInfo = (event) => {
    event.preventDefault()
    this.props.setItem(this.state.firstWord)
    this.props.setLast(this.state.lastWord)
    this.props.setDate(this.state.date)
  }

  input = () => {
    if (this.state.input) {
      return (
        <>
          <label htmlFor='date'>Enter Date of Receipt</label>
          <input
            type='text'
            id='date'
            placeholder='mm/dd/yy'
            name='text'
            onChange={this.onDateChange}
            value={this.state.date}
          />
          <label htmlFor='word'>Enter Characters Before Your Item</label>
          <input
            type='text'
            id='word'
            placeholder='Before Item'
            name='text'
            onChange={this.onWordChange}
            value={this.state.firstWord}
          />
          <label htmlFor='word'>Enter Characters After Your Total</label>
          <input
            type='text'
            id='lastword'
            placeholder='After Total'
            name='text'
            onChange={this.onLastChange}
            value={this.state.lastWord}
          />
          <button onClick={this.enterInfo}>Enter Information </button>
        </>
      )
    }
  }

  render() {
    if (!this.props.isVisible) {
      return null
    } else {
      return (
        <div>
          <div>
            <input type='file' id='image' onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>Upload!</button>
          </div>
          {this.input()}
          {this.fileImage()}
        </div>
      )
    }
  }
}

export default App
