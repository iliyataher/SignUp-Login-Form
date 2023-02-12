import { ErrorMessage, FastField, Field } from "formik"
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import jMoment from "jalali-moment"
const Date = (props)=>{
    const {icon, formik , name, placeholder} = props;
    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    const months = [
        {id : 1 , value : "فروردین"},
        {id : 2 , value : "اردیبهشت"},
        {id : 3 , value : "خرداد"},
        {id : 4 , value : "تیر"},
        {id : 5 , value : "مرداد"},
        {id : 6 , value : "شهریور"},
        {id : 7 , value : "مهر"},
        {id : 8 , value : "آبان"},
        {id : 9 , value : "آذر"},
        {id : 10 , value : "دی"},
        {id : 11 , value : "بهمن"},
        {id : 12 , value : "اسفند"},
    ]
    const [day , setday] = useState();
    const [month , setmonth] = useState();
    const [year , setyear] = useState();
    const [years , setyears] = useState([])
    const [showconfig , setshowconfig] = useState(false);
    
    useEffect(()=>{
        let now = jMoment();
        setday(now.jDate());
        setmonth(now.jMonth());
        setyear(now.jYear())
    } , [])
    
        const HandleShowconfig = ()=>{
            for (let newyear = parseInt(year)-50; newyear < parseInt(year)+1; newyear++) {
                setyears((oldyear)=>{
                    return [...oldyear , newyear]
                })
            }
            setshowconfig(true)
        }

    const HandleHideconfig = (e)=>{
        e.stopPropagation()
        setshowconfig(false);
        formik.setValues({
            ...formik.values,
            [name] : `${year}/${month}/${day}`
        })
    }
    return(
        <div className="text-center" >
            <div>
                <div onClick={HandleShowconfig} className="DivForDateInput">
                    <FastField  type="text" className="Input DateInput" placeholder={placeholder} name={name} disabled />
                    <span className={icon}>icon</span>
                </div>
            </div>
            {
                showconfig ? (
                    <div className="Box-Date">
                <div className="Box-Day-InDate">
                    <select value={day} onChange={(e)=>{setday(e.target.value)}}>
                        {days.map(d=>(
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
                <div className="Box-Month-InDate">
                    <select value={month} onChange={(e)=>{setmonth(e.target.value)}}>
                        {months.map(m=>(
                            <option key={m.id} value={m.id}>{m.value}</option>
                        ))}
                    </select>
                </div>
                <div className="Box-Year-InDate">
                    <select value={year} onChange={(e)=>{setyear(e.target.value)}}>
                        {years.map((y)=>(
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>


                <span className="fas fa-check IconDatepicher" onClick={HandleHideconfig}></span>
            </div>
                ) : null

            }
            <ErrorMessage>
                {error=>{<small className="text-danger">{error}</small>}}
            </ErrorMessage>
        </div>
    )
}

export default Date