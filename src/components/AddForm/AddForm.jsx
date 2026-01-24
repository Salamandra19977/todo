import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import style from "./AddForm.module.scss"

function AddForm(props) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [correct, setCorrect] = useState(false)

  useEffect(() => {
    if (title.length < 1) {
        console.log("Title is empty")
    } else if (date.length < 1) {
        console.log("Date is empty")
    } else {
        setCorrect(true)
    }
  }, [title, date])
  return (
    <div className={style.wrapper}>
        <div className={style.inner}>
            <h1 className={style.title}>Add new event</h1>
            <div className={style.item}>
                <label 
                    htmlFor="title" 
                    className={style.label}
                >
                    Title
                </label>
                <input 
                    type="text" 
                    name='title' 
                    className={style.input} 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={style.item}>
                <label 
                    htmlFor="date" 
                    className={style.label}
                >
                    Date
                </label>
                <input
                    type="date"
                    name='date' 
                    className={style.input}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <button className={style.button}>Add</button>
        </div>
    </div>
  )
}

AddForm.propTypes = {}

export default AddForm
