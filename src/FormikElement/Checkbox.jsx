import React, { useContext } from "react";
import { createRef } from "react";
import { MyContext } from "../component/context";
const CheckBox = (props)=>{
    const {name, label} = props;
    const {CheckBox , setCheckBox} = useContext(MyContext);

    return(
        <div className="Checkbox">
            <input onChange={()=>{setCheckBox(!CheckBox)}}  type="checkbox" name={name}/>
            <label style={{fontSize:"18px"}}>{label}</label>
        </div>
    )
}

export default CheckBox