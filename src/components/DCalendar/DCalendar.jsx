import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import style from "./DCalendar.module.scss";
import { ContextStore } from "../../store/ContextStore";

function DCalendar(props) {
    let { events } = useContext(ContextStore);
    const [currentDate, setCurrentDate] = useState(new Date());

    const getMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                {events
                    .filter(
                        (event) =>
                            new Date(event.date).toDateString() ===
                            new Date(currentDate).toDateString()
                    )
                    .sort((a, b) => getMinutes(a.time) - getMinutes(b.time))
                    .map((event) => (
                        <button className={style.event} key={event.id} style={{borderColor: event.color}}>
                            <div className={style.title}>{event.title}</div>
                            <div className={style.date}>{event.date}</div>
                            <div className={style.time}>{event.time}</div>
                        </button>
                    ))}
            </div>
        </div>
    );
}

DCalendar.propTypes = {};

export default DCalendar;
