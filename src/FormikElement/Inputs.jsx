import { ErrorMessage, FastField } from "formik"
import React, { useEffect } from "react"
import { useState } from "react";
const Inputs = (props)=>{
    const {type , icon , name, placeholder , InputClassName , IconClassName , disabled} = props;
    const [icons , seticons] = useState("")
    useEffect(()=>{
        seticons(icon)
    } , [])

    const HandleShowAndHidePassword = ()=>{
        const Input3 = document.querySelector(".InputPassword3");
        const Icon3 = document.querySelector(".IconPassword3")
        const Input2 = document.querySelector(".InputPassword2");
        const Icon2 = document.querySelector(".IconPassword2")
        const Input1 = document.querySelector(".InputPassword1");
        const Icon1 = document.querySelector(".IconPassword1")
        
        Icon3.addEventListener("click" , ()=>{
            if(Input3.type==="password"){
                Input3.type="text"
                Icon3.className="fas fa-eye-slash IconPassword3"
            }else if(Input3.type==="text"){
                Input3.type="password"
                Icon3.className="fas fa-eye IconPassword3"
            }
        })
        Icon2.addEventListener("click" , ()=>{
            if(Input2.type==="password"){
                Input2.type="text"
                Icon2.className="fas fa-eye-slash IconPassword2"
            }else if(Input2.type==="text"){
                Input2.type="password"
                Icon2.className="fas fa-eye IconPassword2"
            }
        })
        Icon1.addEventListener("click" , ()=>{
            if(Input1.type==="password"){
                Input1.type="text"
                Icon1.className="fas fa-eye-slash IconPassword1"
            }else if(Input1.type==="text"){
                Input1.type="password"
                Icon1.className="fas fa-eye IconPassword1"
            }
        })

    }
    return(
        <div className="text-center Inputs-item">
            <div>
                <FastField className={`Input ${InputClassName}`} type={type} placeholder={placeholder} name={name} disabled={disabled} />
                {InputClassName ? (
                    <i className={`fas fa-eye ${IconClassName}`} onClick={HandleShowAndHidePassword}></i>
                ) : null}
                <span className={icon} ></span>
            </div>
            <ErrorMessage name={name}>
                {error=><small className="text-danger">{error}</small>}
            </ErrorMessage>
        </div>
    )
}

export default Inputs