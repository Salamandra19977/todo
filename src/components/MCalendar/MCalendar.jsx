import React, {useState} from 'react'
import PropTypes from 'prop-types'
import style from "./MCalendar.module.scss"

function MCalendar(props) {
  const getCalendarDates = (year, month) => {
    const startOfMonth = new Date(year, month, 0)
    const endOfMonth = new Date(year, month + 1, 0)

    const startDay = startOfMonth.getDay() - 1 || 7

    const totalDays = endOfMonth.getDate() + 1

    const dates = []

    for (let i = 1 - startDay; i <= totalDays; i++) {
        const date = new Date(year, month, i)
        dates.push(date)
    }

    return dates
  }

  const [currentDate, setCurrentDate] = useState(new Date())
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const dates = getCalendarDates(year, month)

  console.log(dates)

  return (
    <div className={style.wrapper}>
        <div className={style.container}>
            <table>
                <thead>
                    <tr>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
  )
}

MCalendar.propTypes = {}

export default MCalendar

