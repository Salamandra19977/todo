import React from 'react'
import PropTypes from 'prop-types'
import style from './Main.module.scss'
import AddForm from '../AddForm/AddForm'
import MCalendar from '../MCalendar/MCalendar'
import {FaRegCalendarPlus} from "react-icons/fa"
import {Routes, Route} from 'react-router'
import RegisterPage from "../Auth/RegisterPage"

function Main(props) {
  const [modalOpen, setModalOpen] = React.useState(false)
  return (
    <div className={style.wrapper}>
      {modalOpen && <AddForm open={setModalOpen} />}
      <button 
        className={style.addButton}
        onClick={() => setModalOpen(true)}
      >
        <FaRegCalendarPlus/>
      </button>
      <Routes>
        <Route path='/' element={ <MCalendar/>} />
        <Route path='/week' element={ <div>week</div> } />
        <Route path='/day' element={ <div>day</div>} />
        <Route path='/register' element={ <RegisterPage/> } />
      </Routes>
    </div>
  )
}

Main.propTypes = {}

export default Main
