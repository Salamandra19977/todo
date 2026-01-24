import { useState } from 'react'
import './styles/generalStyle.scss'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import AddForm from './components/AddForm/AddForm'


function App() {
  return (
    <>
      <Header/>
      <Main/>
      <Footer/>
      <AddForm/>
    </>
  )
}

export default App
