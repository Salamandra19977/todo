import React from 'react'
import PropTypes from 'prop-types'
import style from './Main.module.scss'
import AddForm from '../AddForm/AddForm'
import MCalendar from '../MCalendar/MCalendar'
import DCalendar from '../DCalendar/DCalendar'
import WCalendar from '../WCalendar/WCalendar'
import { FaRegCalendarPlus } from "react-icons/fa"
import { Routes, Route } from 'react-router'
import RegisterPage from "../Auth/RegisterPage"
import LoginPage from '../Auth/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../CalendarReducer'

function Main(props) {
	// const [modalOpen, setModalOpen] = React.useState(false)
	const modalState = useSelector((state) => state.calendars.modalState)
	let isAuthenticated = useSelector((state) => state.auth.token !== null)
	const dispatch = useDispatch()
	return (
		<div className={style.wrapper}>
			{modalState && <AddForm />}
			<button
				className={style.addButton}
				onClick={() => dispatch(openModal())}
			>
				<FaRegCalendarPlus />
			</button>
			<Routes>
				<Route path='/' element={<MCalendar />} />
				<Route path='/day' element={<DCalendar />} />
				<Route path='/week' element={<WCalendar />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		</div>
	)
}

Main.propTypes = {}

export default Main
