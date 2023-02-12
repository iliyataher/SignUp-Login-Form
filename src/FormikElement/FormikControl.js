import Inputs from "./Inputs";
import React from "react";
import Textarea from "./Textarea";
import Select from "./Select";
import Radio from "./Radio"
import CheckBox from "./Checkbox";
import Date from "./Date";
import File from "./File";

const FormikControls = (props)=>{
    switch (props.control) {
        case "input":
               return <Inputs {...props} />
        case "textarea":
            return <Textarea {...props} />
        case "select":
            return <Select {...props} />
        case "radio" :
            return <Radio {...props} />
        case "checkbox":
            return <CheckBox {...props} />    
        case "date":
            return <Date {...props}/>    
        case "file":
            return <File {...props}/>    
        default:
            break;
    }
}   

export default FormikControls