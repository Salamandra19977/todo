import { useState } from 'react'
import './styles/generalStyle.scss'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import StoreProvider from './store/ContextStore'


function App() {
  return (
    <>
      <StoreProvider>
        <Header/>
        <Main/>
        <Footer/>
      </StoreProvider>

    </>
  )
}

export default App
