import React, { useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'
import axios from 'axios'
import './Tesseract.scss'

function Tesseract({ isVisible, URL, date, firstItem, lastItem }) {
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
    axios.post('http://localhost:8080/tesseract', {
      date: date,
      item: firstItem,
      last: lastItem,
      text: ocr,
    })
  }

  const showStatus = () => {
    if (ocr !== 'Recognizing...') {
      return (
        <div>
          <p>Image Data Uploaded</p>
          <button onClick={getApi}>Click me</button>
        </div>
      )
    }
  }

  if (!isVisible) {
    return null
  } else {
    return <div className='tesseract'>{showStatus()}</div>
  }
}

export default Tesseract
