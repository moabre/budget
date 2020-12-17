import React, { useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'
import axios from 'axios'
import './Tesseract.scss'

function Tesseract({
  isVisible,
  URL,
  date,
  firstItem,
  lastItem,
  input,
  changeInput,
}) {
  const worker = createWorker({
    logger: (m) => console.log(m),
  })
  const doOCR = async () => {
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    const {
      data: { text },
    } = await worker.recognize(URL)
    setOcr(text)
  }
  const [ocr, setOcr] = useState('Recognizing...')
  useEffect(() => {
    doOCR()
  })
  const getApi = () => {
    axios
      .post('http://localhost:8080/tesseract', {
        date: date,
        item: firstItem,
        last: lastItem,
        text: ocr,
      })
      .then((res) => {
        let url = window.location.href.split('home', 1)
        setOcr('Recognizing...')
        changeInput()
        window.location.href = url
      })
  }

  const showStatus = () => {
    console.log(ocr)
    if (ocr !== 'Recognizing...' && input) {
      return (
        <div className='uploaded'>
          <p>Image Data Uploaded</p>
          <button onClick={getApi}>Submit!</button>
        </div>
      )
    }
  }

  const itsLoading = () => {
    console.log(ocr)
    if (ocr === 'Recognizing...' && input) {
      return (
        <div>
          <p>Image is still processing...</p>
        </div>
      )
    }
  }

  if (!isVisible) {
    return null
  } else {
    return (
      <div>
        <div>{itsLoading()}</div>
        <div className='tesseract'>{showStatus()}</div>
      </div>
    )
  }
}

export default Tesseract
